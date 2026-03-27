'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Settings,
  Key,
  Cpu,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
  ExternalLink,
  Save,
  TestTube,
  Shield,
  CreditCard
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [apiConfig, setApiConfig] = useState({
    provider: '',
    apiKey: '',
    modelName: '',
    maxTokens: 4000,
    temperature: 0.7,
  })
  const [supportedProviders, setSupportedProviders] = useState<any[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle')
  const { toast } = useToast()
  const router = useRouter()

  // Wrap fetchUserData in useCallback to prevent infinite loops
  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()

        // Verificar que data.user existe antes de usarlo
        if (!data.user) {
          router.push('/auth')
          return
        }

        setUser(data.user)

        // Cargar configuración de API existente y proveedores soportados
        const configResponse = await fetch('/api/user/api-config')
        if (configResponse.ok) {
          const configData = await configResponse.json()
          if (configData.data.apiConfig) {
            setApiConfig(configData.data.apiConfig)
          }
          if (configData.data.supportedProviders) {
            setSupportedProviders(configData.data.supportedProviders)
          }
        }
      } else {
        router.push('/auth')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      router.push('/auth')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Solo ejecutar una vez al montar

  const currentProvider = supportedProviders.find(p => p.value === apiConfig.provider)

  const handleInputChange = (field: string, value: string | number) => {
    setApiConfig(prev => ({ ...prev, [field]: value }))
    setValidationStatus('idle')

    // Limpiar errores cuando el usuario modifica el campo
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!apiConfig.provider) {
      newErrors.provider = 'Selecciona un proveedor de IA'
    }

    if (!apiConfig.apiKey.trim()) {
      newErrors.apiKey = 'La API key es requerida'
    } else if (apiConfig.provider === 'openai' && !apiConfig.apiKey.startsWith('sk-')) {
      newErrors.apiKey = 'La API key de OpenAI debe comenzar con "sk-"'
    } else if (apiConfig.provider === 'gemini' && !apiConfig.apiKey.match(/^[A-Za-z0-9_-]{35}$/)) {
      newErrors.apiKey = 'La API key de Gemini debe tener 39 caracteres alfanuméricos'
    }

    if (!apiConfig.modelName) {
      newErrors.modelName = 'Selecciona un modelo'
    }

    if (apiConfig.maxTokens < 100 || apiConfig.maxTokens > 32768) {
      newErrors.maxTokens = 'Los tokens deben estar entre 100 y 32768'
    }

    if (apiConfig.temperature < 0 || apiConfig.temperature > 2) {
      newErrors.temperature = 'La temperatura debe estar entre 0 y 2'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setSaving(true)
    try {
      const response = await fetch('/api/user/api-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiConfig)
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          toast({
            title: "Configuración guardada",
            description: "Tu configuración de IA ha sido actualizada exitosamente",
          })
          setValidationStatus('valid')
        } else {
          throw new Error('Error al guardar configuración')
        }
      } else {
        throw new Error('Error en la llamada al API')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar la configuración",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleTest = async () => {
    if (!apiConfig.apiKey.trim() || !apiConfig.provider) {
      toast({
        title: "Configuración incompleta",
        description: "Completa la configuración antes de probar",
        variant: "destructive",
      })
      return
    }

    setTesting(true)
    setValidationStatus('validating')

    try {
      const response = await fetch('/api/user/test-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiConfig)
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setValidationStatus('valid')
          toast({
            title: "¡Conexión exitosa!",
            description: "Tu configuración de IA funciona correctamente",
          })
        } else {
          throw new Error(data.error || 'Error de conexión')
        }
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error en la llamada al API')
      }
    } catch (error) {
      setValidationStatus('invalid')
      toast({
        title: "Error de conexión",
        description: error instanceof Error ? error.message : "No se pudo conectar con la API. Verifica tu configuración.",
        variant: "destructive",
      })
    } finally {
      setTesting(false)
    }
  }

  const handleUpgradePlan = async () => {
    // TODO: Implementar lógica de upgrade
    toast({
      title: "Función próximamente",
      description: "El upgrade de planes estará disponible pronto",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-64 bg-gray-200 rounded w-96"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
                Monetizao
              </Link>
              <span className="ml-2 text-sm text-gray-500">/ Configuración</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                Volver al Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Configuración de Cuenta
          </h1>
          <p className="text-gray-600 mt-2">
            Gestiona tu perfil y configuración de APIs de IA
          </p>
        </div>

        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="api">Configuración IA</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="subscription">Suscripción</TabsTrigger>
          </TabsList>

          {/* API Configuration Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  Configuración de IA
                </CardTitle>
                <CardDescription>
                  Configura tus APIs de IA para usar las herramientas de Monetizao
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Provider Selection */}
                <div className="space-y-2">
                  <Label htmlFor="provider">Proveedor de IA</Label>
                  <Select
                    value={apiConfig.provider}
                    onValueChange={(value) => handleInputChange('provider', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedProviders.map((provider) => (
                        <SelectItem key={provider.value} value={provider.value}>
                          <div className="flex flex-col items-start">
                            <div className="font-medium">{provider.label}</div>
                            <div className="text-sm text-gray-500">{provider.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.provider && (
                    <p className="text-sm text-red-600">{errors.provider}</p>
                  )}
                </div>

                {/* API Key */}
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Tu API key"
                    value={apiConfig.apiKey}
                    onChange={(e) => handleInputChange('apiKey', e.target.value)}
                    className="font-mono text-sm"
                  />
                  {errors.apiKey && (
                    <p className="text-sm text-red-600">{errors.apiKey}</p>
                  )}
                  {currentProvider && (
                    <div className="text-sm text-gray-500">
                      <Link
                        href={currentProvider.value === 'openai' ? 'https://platform.openai.com/api-keys' :
                               currentProvider.value === 'deepseek' ? 'https://platform.deepseek.com/' :
                               'https://makersuite.google.com/app/apikey'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500 flex items-center gap-1"
                      >
                        Obtener API Key
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Model Selection */}
                <div className="space-y-2">
                  <Label htmlFor="modelName">Modelo</Label>
                  <Select
                    value={apiConfig.modelName}
                    onValueChange={(value) => handleInputChange('modelName', value)}
                    disabled={!apiConfig.provider}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentProvider?.models.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.modelName && (
                    <p className="text-sm text-red-600">{errors.modelName}</p>
                  )}
                </div>

                {/* Advanced Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Tokens Máximos</Label>
                    <Input
                      id="maxTokens"
                      type="number"
                      min="100"
                      max="32768"
                      value={apiConfig.maxTokens}
                      onChange={(e) => handleInputChange('maxTokens', parseInt(e.target.value))}
                    />
                    {errors.maxTokens && (
                      <p className="text-sm text-red-600">{errors.maxTokens}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperatura (0-2)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      min="0"
                      max="2"
                      step="0.1"
                      value={apiConfig.temperature}
                      onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                    />
                    {errors.temperature && (
                      <p className="text-sm text-red-600">{errors.temperature}</p>
                    )}
                  </div>
                </div>

                {/* Validation Status */}
                {validationStatus !== 'idle' && (
                  <Alert className={validationStatus === 'valid' ? 'border-green-200 bg-green-50' : validationStatus === 'invalid' ? 'border-red-200 bg-red-50' : ''}>
                    {validationStatus === 'valid' && (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Configuración validada exitosamente
                        </AlertDescription>
                      </>
                    )}
                    {validationStatus === 'invalid' && (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          Error de conexión. Verifica tu API key y configuración.
                        </AlertDescription>
                      </>
                    )}
                    {validationStatus === 'validating' && (
                      <>
                        <TestTube className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          Probando conexión...
                        </AlertDescription>
                      </>
                    )}
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleTest}
                    disabled={testing || !apiConfig.apiKey || !apiConfig.provider}
                    variant="outline"
                  >
                    {testing ? (
                      <>
                        <TestTube className="h-4 w-4 mr-2 animate-spin" />
                        Probando...
                      </>
                    ) : (
                      <>
                        <TestTube className="h-4 w-4 mr-2" />
                        Probar Conexión
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Save className="h-4 w-4 mr-2 animate-pulse" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Configuración
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                    Estado de Uso
                </CardTitle>
                <CardDescription>
                  Monitorea tu consumo y límites diarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Uso diario</span>
                    <Badge variant={user?.dailyUsageCount >= 5 && !user?.hasActiveSubscription ? 'destructive' : 'default'}>
                      {user?.dailyUsageCount}/5 (Gratis)
                    </Badge>
                  </div>
                  {!user?.hasActiveSubscription && (
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        Has alcanzado tu límite diario. Considera actualizar a Premium para uso ilimitado.
                      </AlertDescription>
                    </Alert>
                  )}
                  <Button className="w-full" onClick={handleUpgradePlan}>
                    <Star className="h-4 w-4 mr-2" />
                    Actualizar a Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del Perfil</CardTitle>
                <CardDescription>
                  Gestiona tu información personal y contraseña
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nombre</Label>
                    <Input value={user?.name || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Correo Electrónico</Label>
                    <Input value={user?.email || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Rol</Label>
                    <Input value={user?.role || 'user'} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant={user?.is_verified ? 'default' : 'secondary'}>
                        {user?.is_verified ? 'Verificado' : 'No verificado'}
                      </Badge>
                      <Badge variant={user?.is_active ? 'default' : 'destructive'}>
                        {user?.is_active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Plan de Suscripción
                </CardTitle>
                <CardDescription>
                  Gestiona tu suscripción y métodos de pago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user?.hasActiveSubscription ? (
                    <>
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Plan Actual</span>
                          <Badge variant="default">Premium</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Válido hasta: {new Date(user.subscription.endDate).toLocaleDateString()}
                        </p>
                        <Button variant="outline" className="w-full">
                          Administrar Suscripción
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No tienes suscripción activa
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Actualiza a Premium para disfrutar de todas las herramientas sin límites
                      </p>
                      <Button onClick={handleUpgradePlan} className="w-full">
                        <Star className="h-4 w-4 mr-2" />
                        Actualizar a Premium
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}