import { NextRequest, NextResponse } from 'next/server'
import { DeviceService } from '@/lib/security/device-service'
import { z } from 'zod'

// Schema para validar la data del fingerprint
const FingerprintSchema = z.object({
  screenResolution: z.string().optional(),
  colorDepth: z.number().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
  hardwareConcurrency: z.number().optional(),
  deviceMemory: z.number().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Obtener información básica del dispositivo del request
    const deviceInfo = DeviceService.extractDeviceInfo(request)

    // Obtener información adicional del body (del cliente)
    const body = await request.json()
    const additionalData = FingerprintSchema.parse(body)

    // Combinar información
    const fullDeviceInfo = {
      ...deviceInfo,
      ...additionalData
    }

    // Verificar si puede registrar este dispositivo
    const checkResult = await DeviceService.canRegisterDevice(fullDeviceInfo)

    if (!checkResult.allowed) {
      return NextResponse.json({
        success: false,
        error: checkResult.reason,
        blocked: true
      }, { status: 403 })
    }

    let device
    if (checkResult.device) {
      // Actualizar dispositivo existente
      await DeviceService.updateDevice(checkResult.fingerprint, undefined, true)
      device = checkResult.device
    } else {
      // Registrar nuevo dispositivo
      device = await DeviceService.registerDevice(fullDeviceInfo)
    }

    return NextResponse.json({
      success: true,
      data: {
        fingerprint: deviceInfo.fingerprint,
        deviceId: device.id,
        isNewDevice: !checkResult.device,
        hasExistingUser: !!checkResult.existingUser
      }
    })

  } catch (error) {
    console.error('Error in fingerprint endpoint:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Datos inválidos',
        details: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
}

// Endpoint para obtener información del dispositivo actual
export async function GET(request: NextRequest) {
  try {
    const deviceInfo = DeviceService.extractDeviceInfo(request)

    const existingDevice = await DeviceService.checkDeviceExists(deviceInfo.fingerprint)

    return NextResponse.json({
      success: true,
      data: {
        fingerprint: deviceInfo.fingerprint,
        deviceInfo: {
          ip: deviceInfo.ip,
          userAgent: deviceInfo.userAgent,
          platform: deviceInfo.platform,
          browser: deviceInfo.browser,
          browserVersion: deviceInfo.browserVersion,
          os: deviceInfo.os,
          osVersion: deviceInfo.osVersion,
        },
        hasExistingDevice: !!existingDevice,
        device: existingDevice
      }
    })

  } catch (error) {
    console.error('Error getting device info:', error)
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
}