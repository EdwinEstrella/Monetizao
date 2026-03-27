'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, Zap, Target, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import FadeIn from '@/components/ui/fade-in'
import SmartLink, { ContextualBacklinks } from '@/components/ui/smart-links'
import SmartPopupWrapper from '@/components/ui/smart-popup-wrapper'


export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <FadeIn direction="left" delay={100}>
              <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent break-words">
                  Monetiza con IA
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 break-words">
                  Descubre estrategias probadas para generar ingresos sustanciales usando Inteligencia Artificial.
                  Desde <SmartLink href="/guias/prompts-lucrativos-generar-ingresos">prompts lucrativos</SmartLink> hasta <SmartLink href="/guias/automatizacion-negocios-24-7">negocios automatizados</SmartLink>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <SmartLink href="/guias">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Ver Guías de IA
                  </SmartLink>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/sobre-nosotros">Saber Más</Link>
                </Button>
              </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={300} duration={1000}>
              <div className="flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
                <div className="relative w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/20 rounded-3xl blur-3xl scale-110 animate-pulse"></div>
                  <div className="relative bg-card rounded-3xl p-6 sm:p-8 border shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <TrendingUp className="h-10 w-10 sm:h-8 sm:w-8 text-primary flex-shrink-0 animate-pulse" />
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">Potencial de Ingresos</p>
                          <p className="text-2xl sm:text-3xl font-bold">Alto Potencial</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 sm:p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                          <p className="text-2xl sm:text-3xl font-bold text-primary">50+</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Estrategias IA</p>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                          <p className="text-2xl sm:text-3xl font-bold text-primary">1000+</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Prompts Listos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <FadeIn direction="up" delay={200}>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl break-words">
                  Todo lo que necesitas para empezar
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl break-words">
                  Te proporcionamos las <SmartLink href="/guias">herramientas y estrategias</SmartLink> para que puedas
                  monetizar efectivamente con Inteligencia Artificial.
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <FadeIn direction="up" delay={400} duration={800}>
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardHeader className="text-center">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="group-hover:text-primary transition-colors">Estrategias Rápidas</CardTitle>
                  <CardDescription>
                    <SmartLink href="/guias/precios-premium-servicios-ia">Métodos probados</SmartLink> para generar ingresos en días, no meses.
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
            <FadeIn direction="up" delay={600} duration={800}>
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardHeader className="text-center">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="group-hover:text-primary transition-colors">Prompts Lucrativos</CardTitle>
                  <CardDescription>
                    <SmartLink href="/guias/prompts-lucrativos-generar-ingresos">Colección de prompts optimizados</SmartLink> para maximizar ganancias.
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
            <FadeIn direction="up" delay={800} duration={800}>
              <Card className="h-full sm:col-span-2 lg:col-span-1 hover:shadow-lg transition-shadow group">
                <CardHeader className="text-center">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="group-hover:text-primary transition-colors">Guías Detalladas</CardTitle>
                  <CardDescription>
                    <SmartLink href="/guias">Tutoriales paso a paso</SmartLink> para implementar cada estrategia.
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <FadeIn direction="up" delay={300}>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl break-words">
                  Contenido Popular
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl break-words">
                  Descubre los <SmartLink href="/blog">artículos más leídos</SmartLink> sobre monetización con IA.
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
            <FadeIn direction="up" delay={500} duration={800}>
              <Card className="group hover:shadow-lg transition-all h-full hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors text-xl break-words">
                    ChatGPT para Freelancers
                  </CardTitle>
                  <CardDescription className="text-base break-words">
                    Aumenta tu productividad 10x y gana más con <SmartLink href="/guias/prompts-lucrativos-generar-ingresos">estos prompts</SmartLink>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto text-base group-hover:text-primary transition-colors" asChild>
                    <Link href="/blog/chatgpt-freelancers-ganar-dinero">
                      Leer más →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn direction="up" delay={700} duration={800}>
              <Card className="group hover:shadow-lg transition-all h-full hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors text-xl break-words">
                    Negocios con Midjourney
                  </CardTitle>
                  <CardDescription className="text-base break-words">
                    Cómo ganar $5,000+ mensuales vendiendo <SmartLink href="/guias/productos-digitales-con-ia">arte generado por IA</SmartLink>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto text-base group-hover:text-primary transition-colors" asChild>
                    <Link href="/blog/midjourney-negocios-5000-dolares">
                      Leer más →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn direction="up" delay={900} duration={800}>
              <Card className="group hover:shadow-lg transition-all h-full sm:col-span-2 lg:col-span-1 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors text-xl break-words">
                    Automatización con IA
                  </CardTitle>
                  <CardDescription className="text-base break-words">
                    Crea <SmartLink href="/guias/automatizacion-negocios-24-7">negocios automatizados</SmartLink> que generan ingresos 24/7.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto text-base group-hover:text-primary transition-colors" asChild>
                    <Link href="/blog/automatizacion-negocios-ia-24-7">
                      Leer más →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <FadeIn direction="scale" delay={400} duration={1000}>
              <div className="space-y-4 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl break-words">
                  ¿Listo para empezar a monetizar con IA?
                </h2>
                <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto break-words">
                  Únete a miles de emprendedores que ya están generando ingresos
                  sustanciales gracias a nuestras estrategias probadas.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto items-center justify-center sm:justify-center">
                <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto hover:scale-105 transition-transform">
                  <Link href="/blog">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Ver Todos los Artículos
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto hover:scale-105 transition-transform">
                  <Link href="/sobre-nosotros">
                    Conoce Nuestra Metodología
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <SmartPopupWrapper />
    </div>
  )
}