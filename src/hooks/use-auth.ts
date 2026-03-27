/**
 * Hook de autenticación optimizado según mejores prácticas de InsForge
 * Proporciona gestión de estado, auto-refresh y manejo de errores
 */

'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@insforge/sdk'
import { useToast } from '@/hooks/use-toast'

interface User {
  id: string
  email: string
  emailVerified: boolean
  providers: string[]
  createdAt: string
  updatedAt: string
  profile?: {
    name?: string
    avatar_url?: string
    [key: string]: any
  }
  metadata?: {
    [key: string]: any
  }
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

interface AuthActions {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string; requireEmailVerification?: boolean }>
  signInWithOAuth: (provider: 'google' | 'github') => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
  updateProfile: (profile: Record<string, any>) => Promise<{ success: boolean; error?: string }>
  resendVerificationEmail: (email: string) => Promise<{ success: boolean; error?: string }>
  verifyEmail: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>
  sendResetPasswordEmail: (email: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (newPassword: string, otp: string) => Promise<{ success: boolean; error?: string }>
}

export function useAuth(): AuthState & AuthActions {
  const router = useRouter()
  const { toast } = useToast()

  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
    isAuthenticated: false
  })

  const insforge = useMemo(() => createClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.monetizao.com',
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
  }), [])

  // Flag para evitar múltiples inicializaciones
  const isInitialized = useRef(false)

  // Verificar si estamos en un callback de OAuth
  useEffect(() => {
    // Evitar múltiples inicializaciones
    if (isInitialized.current) return
    isInitialized.current = true

    const urlParams = new URLSearchParams(window.location.search)
    const hasOauthCode = urlParams.has('insforge_code') ||
                        urlParams.has('code') ||
                        window.location.href.includes('insforge_code')

    // Si hay código OAuth, el SDK lo procesará automáticamente
    // Solo inicializamos si NO es un callback
    if (!hasOauthCode) {
      const initializeAuth = async () => {
        try {
          // Pequeño delay para evitar race conditions con OAuth
          await new Promise(resolve => setTimeout(resolve, 100))

          const { data, error } = await insforge.auth.getCurrentUser()

          if (error) {
            // Silenciosamente marcar como no autenticado sin errores en consola
            setState({
              user: null,
              isLoading: false,
              error: null,
              isAuthenticated: false
            })
          } else if (data?.user) {
            setState({
              user: data.user,
              isLoading: false,
              error: null,
              isAuthenticated: true
            })
          } else {
            setState({
              user: null,
              isLoading: false,
              error: null,
              isAuthenticated: false
            })
          }
        } catch (err) {
          // Silenciosamente marcar como no autenticado
          setState({
            user: null,
            isLoading: false,
            error: null,
            isAuthenticated: false
          })
        }
      }

      initializeAuth()
    } else {
      // Si es callback OAuth, esperar a que el SDK lo procese
      // El SDK detectará automáticamente insforge_code y guardará la sesión
      const waitForOauthProcessing = async () => {
        try {
          // Esperar a que el SDK procese el código OAuth
          await new Promise(resolve => setTimeout(resolve, 500))

          // Después del OAuth, intentar obtener el usuario
          const { data, error } = await insforge.auth.getCurrentUser()

          if (data?.user) {
            setState({
              user: data.user,
              isLoading: false,
              error: null,
              isAuthenticated: true
            })

            // Limpiar la URL para quitar los parámetros de OAuth
            window.history.replaceState({}, '', window.location.pathname)
          } else {
            setState({
              user: null,
              isLoading: false,
              error: error?.message || 'Error en OAuth',
              isAuthenticated: false
            })
          }
        } catch (err) {
          setState({
            user: null,
            isLoading: false,
            error: 'Error procesando OAuth',
            isAuthenticated: false
          })
        }
      }

      waitForOauthProcessing()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Sin dependencias para que solo se ejecute una vez

  // Iniciar sesión con email y contraseña
  const signIn = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const { data, error } = await insforge.auth.signInWithPassword({
        email,
        password,
      })

      if (error || !data?.user) {
        const errorMessage = error?.message || 'Error al iniciar sesión'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage
        }))
        return { success: false, error: errorMessage }
      }

      setState({
        user: data.user,
        isLoading: false,
        error: null,
        isAuthenticated: true
      })

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      })

      return { success: true }
    } catch (err) {
      const errorMessage = 'Error de conexión. Inténtalo de nuevo.'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }, [insforge, toast])

  // Registrarse con email y contraseña
  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const { data, error } = await insforge.auth.signUp({
        email,
        password,
        name,
        redirectTo: `${window.location.origin}/auth`,
      })

      if (error) {
        const errorMessage = error.message || 'Error al registrarse'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage
        }))
        return { success: false, error: errorMessage }
      }

      // Manejar verificación de email
      if (data?.requireEmailVerification) {
        setState(prev => ({ ...prev, isLoading: false }))
        toast({
          title: "Cuenta creada",
          description: "Por favor verifica tu email para continuar",
        })
        return {
          success: true,
          requireEmailVerification: true
        }
      }

      // Si no requiere verificación, el usuario ya está autenticado
      if (data?.user && data?.accessToken) {
        setState({
          user: data.user,
          isLoading: false,
          error: null,
          isAuthenticated: true
        })

        toast({
          title: "¡Cuenta creada!",
          description: "Tu cuenta ha sido creada correctamente",
        })

        return { success: true }
      }

      return { success: false, error: 'Error desconocido' }
    } catch (err) {
      const errorMessage = 'Error de conexión. Inténtalo de nuevo.'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }, [insforge, toast])

  // Iniciar sesión con OAuth (Google/GitHub)
  const signInWithOAuth = useCallback(async (provider: 'google' | 'github') => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const { data, error } = await insforge.auth.signInWithOAuth({
        provider,
        redirectTo: `${window.location.origin}/dashboard`,
      })

      if (error || !data?.url) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Error al iniciar OAuth'
        }))
        return
      }

      // Redirigir al proveedor OAuth
      window.location.href = data.url
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Error de conexión'
      }))
    }
  }, [insforge])

  // Cerrar sesión
  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const { error } = await insforge.auth.signOut()

      if (error) {
        console.error('Sign out error:', error)
      }

      setState({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false
      })

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      })

      router.push('/auth')
    } catch (err) {
      console.error('Sign out error:', err)
      // Even if there's an error, clear local state
      setState({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false
      })
      router.push('/auth')
    }
  }, [insforge, router, toast])

  // Refrescar datos del usuario
  const refreshUser = useCallback(async () => {
    try {
      const { data, error } = await insforge.auth.getCurrentUser()

      if (!error && data?.user) {
        setState({
          user: data.user,
          isLoading: false,
          error: null,
          isAuthenticated: true
        })
      }
    } catch (err) {
      console.error('Error refreshing user:', err)
    }
  }, [insforge])

  // Actualizar perfil de usuario
  const updateProfile = useCallback(async (profile: Record<string, any>) => {
    try {
      const { data, error } = await insforge.auth.setProfile(profile)

      if (error) {
        return { success: false, error: error.message }
      }

      // Refrescar datos del usuario
      await refreshUser()

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente",
      })

      return { success: true }
    } catch (err) {
      return { success: false, error: 'Error al actualizar perfil' }
    }
  }, [insforge, refreshUser, toast])

  // Reenviar email de verificación
  const resendVerificationEmail = useCallback(async (email: string) => {
    try {
      const { data, error } = await insforge.auth.resendVerificationEmail({
        email,
        redirectTo: `${window.location.origin}/auth`,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      toast({
        title: "Email enviado",
        description: "Revisa tu bandeja de entrada para el código de verificación",
      })

      return { success: true }
    } catch (err) {
      return { success: false, error: 'Error al enviar email de verificación' }
    }
  }, [insforge, toast])

  // Verificar email con código
  const verifyEmail = useCallback(async (email: string, otp: string) => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const { data, error } = await insforge.auth.verifyEmail({
        email,
        otp,
      })

      if (error || !data?.accessToken) {
        const errorMessage = error?.message || 'Código inválido'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage
        }))
        return { success: false, error: errorMessage }
      }

      setState({
        user: data.user,
        isLoading: false,
        error: null,
        isAuthenticated: true
      })

      toast({
        title: "¡Email verificado!",
        description: "Tu email ha sido verificado correctamente",
      })

      return { success: true }
    } catch (err) {
      const errorMessage = 'Error de conexión'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }, [insforge, toast])

  // Enviar email de reset de contraseña
  const sendResetPasswordEmail = useCallback(async (email: string) => {
    try {
      const { data, error } = await insforge.auth.sendResetPasswordEmail({
        email,
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      toast({
        title: "Email enviado",
        description: "Revisa tu bandeja de entrada para restablecer tu contraseña",
      })

      return { success: true }
    } catch (err) {
      return { success: false, error: 'Error al enviar email de restablecimiento' }
    }
  }, [toast])

  // Restablecer contraseña
  const resetPassword = useCallback(async (newPassword: string, otp: string) => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const { data, error } = await insforge.auth.resetPassword({
        newPassword,
        otp,
      })

      if (error) {
        const errorMessage = error.message || 'Error al restablecer contraseña'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage
        }))
        return { success: false, error: errorMessage }
      }

      setState(prev => ({ ...prev, isLoading: false }))

      toast({
        title: "Contraseña restablecida",
        description: "Tu contraseña ha sido restablecida correctamente",
      })

      return { success: true }
    } catch (err) {
      const errorMessage = 'Error de conexión'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }, [toast])

  return {
    ...state,
    signIn,
    signUp,
    signInWithOAuth,
    signOut,
    refreshUser,
    updateProfile,
    resendVerificationEmail,
    verifyEmail,
    sendResetPasswordEmail,
    resetPassword,
  }
}