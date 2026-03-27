/**
 * Hook de autenticación - Patrón SSR Correcto
 *
 * En el patrón SSR:
 * - NO creamos el SDK cliente para operaciones de auth
 * - Todas las operaciones de auth usan Server Actions
 * - El SDK cliente solo se usa para getCurrentUser() (lectura)
 * - Los tokens se manejan en cookies httpOnly en el servidor
 * - El SDK detecta automáticamente los callbacks de OAuth
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import {
  signInAction,
  signUpAction,
  signInWithOAuthAction,
  signOutAction,
  getCurrentUserAction,
  verifyEmailAction,
  resendVerificationEmailAction,
  sendResetPasswordEmailAction,
  resetPasswordAction,
  updateProfileAction,
} from '@/app/auth/actions'

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

  // Inicializar: verificar si hay sesión usando Server Action
  // Esto evita crear el SDK cliente durante el render
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Verificar si el SDK de InsForge detectó un código OAuth en la URL
        // Si lo detectó, ya procesó el callback y guardó la sesión
        const urlParams = new URLSearchParams(window.location.search)
        const hasOauthCode = urlParams.has('insforge_code') || urlParams.has('code')

        if (hasOauthCode) {
          // El SDK ya procesó el OAuth, esperar un momento y limpiar URL
          await new Promise(resolve => setTimeout(resolve, 100))

          // Limpiar la URL
          const cleanUrl = window.location.pathname
          window.history.replaceState({}, '', cleanUrl)
        }

        // Obtener usuario actual usando server action
        // Esto verifica las cookies httpOnly en el servidor
        const user = await getCurrentUserAction()

        setState({
          user,
          isLoading: false,
          error: null,
          isAuthenticated: user !== null
        })
      } catch (err) {
        console.error('Error initializing auth:', err)
        setState({
          user: null,
          isLoading: false,
          error: null,
          isAuthenticated: false
        })
      }
    }

    initializeAuth()
  }, [])

  // Iniciar sesión - Usa Server Action
  const signIn = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    const result = await signInAction(email, password)

    if (result.success) {
      setState({
        user: result.user,
        isLoading: false,
        error: null,
        isAuthenticated: true
      })

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      })

      return { success: true }
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: result.error
      }))
      return { success: false, error: result.error }
    }
  }, [toast])

  // Registrarse - Usa Server Action
  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    const result = await signUpAction(email, password, name)

    if (result.success) {
      if (result.requireEmailVerification) {
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

      if (result.user) {
        setState({
          user: result.user,
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
    }

    setState(prev => ({
      ...prev,
      isLoading: false,
      error: result.error
    }))

    return { success: false, error: result.error }
  }, [toast])

  // Iniciar OAuth - Usa Server Action
  const signInWithOAuth = useCallback(async (provider: 'google' | 'github') => {
    setState(prev => ({ ...prev, isLoading: true }))

    const result = await signInWithOAuthAction(provider)

    if (result.success && result.url) {
      // Redirigir al proveedor OAuth
      window.location.href = result.url
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: result.error
      }))
    }
  }, [])

  // Cerrar sesión - Usa Server Action
  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))

    await signOutAction()

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
  }, [router, toast])

  // Refrescar datos del usuario - Usa Server Action
  const refreshUser = useCallback(async () => {
    const user = await getCurrentUserAction()

    if (user) {
      setState({
        user,
        isLoading: false,
        error: null,
        isAuthenticated: true
      })
    }
  }, [])

  // Actualizar perfil - Usa Server Action
  const updateProfile = useCallback(async (profile: Record<string, any>) => {
    const result = await updateProfileAction(profile)

    if (result.success) {
      // Refrescar datos del usuario
      await refreshUser()

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente",
      })
    }

    return result
  }, [refreshUser, toast])

  // Verificar email - Usa Server Action
  const verifyEmail = useCallback(async (email: string, otp: string) => {
    setState(prev => ({ ...prev, isLoading: true }))

    const result = await verifyEmailAction(email, otp)

    if (result.success) {
      setState({
        user: result.user,
        isLoading: false,
        error: null,
        isAuthenticated: true
      })

      toast({
        title: "¡Email verificado!",
        description: "Tu email ha sido verificado correctamente",
      })

      return { success: true }
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: result.error
      }))
      return { success: false, error: result.error }
    }
  }, [toast])

  // Reenviar email de verificación - Usa Server Action
  const resendVerificationEmail = useCallback(async (email: string) => {
    const result = await resendVerificationEmailAction(email)

    if (result.success) {
      toast({
        title: "Email enviado",
        description: "Revisa tu bandeja de entrada para el código de verificación",
      })
    }

    return result
  }, [toast])

  // Enviar email de reset de contraseña - Usa Server Action
  const sendResetPasswordEmail = useCallback(async (email: string) => {
    const result = await sendResetPasswordEmailAction(email)

    if (result.success) {
      toast({
        title: "Email enviado",
        description: "Revisa tu bandeja de entrada para restablecer tu contraseña",
      })
    }

    return result
  }, [toast])

  // Restablecer contraseña - Usa Server Action
  const resetPassword = useCallback(async (newPassword: string, otp: string) => {
    setState(prev => ({ ...prev, isLoading: true }))

    const result = await resetPasswordAction(newPassword, otp)

    setState(prev => ({ ...prev, isLoading: false }))

    if (result.success) {
      toast({
        title: "Contraseña restablecida",
        description: "Tu contraseña ha sido restablecida correctamente",
      })
    }

    return result
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
