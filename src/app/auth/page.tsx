/**
 * Página de autenticación optimizada según mejores prácticas de InsForge
 * Implementa flujos completos de login, registro, verificación de email y OAuth
 */

'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle, Github, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const auth = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showVerificationOTP, setShowVerificationOTP] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')
  const [pendingEmail, setPendingEmail] = useState('')

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }, [errors])

  const validateForm = useCallback((isLogin: boolean = true) => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'El nombre es requerido'
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Debes confirmar tu contraseña'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm(true)) return

    setErrors({})
    const result = await auth.signIn(formData.email, formData.password)

    if (result.success) {
      setSuccessMessage('¡Inicio de sesión exitoso! Redirigiendo...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else if (result.error) {
      setErrors({ form: result.error })
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm(false)) return

    setErrors({})
    const result = await auth.signUp(formData.email, formData.password, formData.name)

    if (result.success) {
      if (result.requireEmailVerification) {
        // Guardar email pendiente para verificación
        setPendingEmail(formData.email)
        setShowVerificationOTP(true)
        setSuccessMessage('¡Cuenta creada! Por favor verifica tu email.')
      } else {
        setSuccessMessage('¡Registro exitoso! Redirigiendo...')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      }
    } else if (result.error) {
      setErrors({ form: result.error })
    }
  }

  const handleOAuth = useCallback(async (provider: 'google' | 'github') => {
    await auth.signInWithOAuth(provider)
  }, [auth])

  const handleVerifyOTP = async () => {
    const otpInput = document.getElementById('otp') as HTMLInputElement
    const otp = otpInput?.value

    if (!otp || otp.length !== 6) {
      setErrors({ otp: 'El código debe tener 6 dígitos' })
      return
    }

    const result = await auth.verifyEmail(pendingEmail, otp)

    if (result.success) {
      setSuccessMessage('¡Email verificado! Redirigiendo...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else if (result.error) {
      setErrors({ otp: result.error })
    }
  }

  const handleResendOTP = async () => {
    const result = await auth.resendVerificationEmail(pendingEmail)

    if (result.success) {
      setSuccessMessage('Código reenviado. Revisa tu email.')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  // Redirigir si ya está autenticado (con delay para evitar loop infinito)
  useEffect(() => {
    if (auth.isAuthenticated && !auth.isLoading) {
      // Agregar pequeño delay para evitar race conditions
      const timeoutId = setTimeout(() => {
        router.push('/dashboard')
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [auth.isAuthenticated, auth.isLoading, router])

  // Mostrar loader mientras carga el estado de autenticación
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gray-900">Monetizao</h1>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Herramientas IA para Monetizar
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accede a todas las herramientas de IA para aumentar tus ingresos
          </p>
        </div>

        {/* Verificación de email */}
        {showVerificationOTP ? (
          <Card className="shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Verifica tu Email
              </CardTitle>
              <CardDescription className="text-center">
                Hemos enviado un código de 6 dígitos a {pendingEmail}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Revisa tu bandeja de entrada y carpeta de spam
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="otp">Código de Verificación</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                    autoFocus
                  />
                  {errors.otp && (
                    <p className="text-sm text-red-600">{errors.otp}</p>
                  )}
                </div>

                <Button
                  className="w-full"
                  disabled={auth.isLoading}
                  onClick={handleVerifyOTP}
                >
                  {auth.isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    'Verificar Email'
                  )}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    ¿No recibiste el código?
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={auth.isLoading}
                    onClick={handleResendOTP}
                  >
                    Reenviar Código
                  </Button>
                </div>

                {successMessage && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Tarjeta principal */
          <Card className="shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Bienvenido de nuevo
              </CardTitle>
              <CardDescription className="text-center">
                Inicia sesión o regístrate para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                  <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={auth.isLoading}
                          autoComplete="email"
                          required
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="•••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10"
                          disabled={auth.isLoading}
                          autoComplete="current-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    {errors.form && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.form}</AlertDescription>
                      </Alert>
                    )}

                    {successMessage && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={auth.isLoading}>
                      {auth.isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Iniciando sesión...
                        </>
                      ) : (
                        'Iniciar Sesión'
                      )}
                    </Button>

                    <div className="text-center">
                      <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Juan Pérez"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={auth.isLoading}
                          autoComplete="name"
                          required
                        />
                      </div>
                      {errors.name && (
                        <p className="text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Correo Electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="reg-email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={auth.isLoading}
                          autoComplete="email"
                          required
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="reg-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="•••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10"
                          disabled={auth.isLoading}
                          autoComplete="new-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="•••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10 pr-10"
                          disabled={auth.isLoading}
                          autoComplete="new-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {errors.form && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.form}</AlertDescription>
                      </Alert>
                    )}

                    {successMessage && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={auth.isLoading}>
                      {auth.isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Registrando...
                        </>
                      ) : (
                        'Crear Cuenta'
                      )}
                    </Button>

                    <p className="text-xs text-center text-gray-600">
                      Al registrarte, aceptas nuestros{' '}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                        términos de servicio
                      </Link>{' '}
                      y{' '}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                        política de privacidad
                      </Link>
                    </p>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">O continúa con</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={() => handleOAuth('google')}
                    disabled={auth.isLoading}
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={() => handleOAuth('github')}
                    disabled={auth.isLoading}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}