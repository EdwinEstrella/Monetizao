import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Plantando semillas para herramientas de Monetizao...')

  // Crear herramientas
  const tools = [
    {
      name: 'Generador de Prompts Lucrativos',
      slug: 'generador-prompts-lucrativos',
      description: 'Crea prompts optimizados para generar ingresos con IA usando técnicas avanzadas de prompting',
      category: 'Generación',
      isPremium: false,
      icon: 'Zap',
      rating: 4.9,
      usersCount: 25000,
    },
    {
      name: 'Calculadora de ROI para Servicios IA',
      slug: 'calculadora-roi-servicios-ia',
      description: 'Calcula el retorno de inversión para servicios de IA y automatización',
      category: 'Analytics',
      isPremium: false,
      icon: 'BarChart3',
      rating: 4.7,
      usersCount: 12000,
    },
    {
      name: 'Generador de Propuestas Comerciales',
      slug: 'generador-propuestas-comerciales',
      description: 'Genera propuestas comerciales profesionales personalizadas con IA',
      category: 'Negocio',
      isPremium: false,
      icon: 'Wrench',
      rating: 4.5,
      usersCount: 15000,
    },
    {
      name: 'Template Generator para Nichos',
      slug: 'template-generator-nichos',
      description: 'Crea plantillas optimizadas para nichos específicos de mercado',
      category: 'Plantillas',
      isPremium: false,
      icon: 'Wrench',
      rating: 4.4,
      usersCount: 18000,
    },
    {
      name: 'Analizador de Competencia IA',
      slug: 'analizador-competencia-ia',
      description: 'Analiza la competencia usando IA para identificar oportunidades',
      category: 'Análisis',
      isPremium: true,
      icon: 'Target',
      rating: 4.8,
      usersCount: 8000,
    },
    {
      name: 'Optimizador de Contenido IA',
      slug: 'optimizador-contenido-ia',
      description: 'Optimiza contenido existente para mejorar SEO y conversiones',
      category: 'Optimización',
      isPremium: true,
      icon: 'Globe',
      rating: 4.6,
      usersCount: 6000,
    },
    {
      name: 'Dashboard de Métricas de Monetización',
      slug: 'dashboard-metricas-monetizacion',
      description: 'Visualiza métricas clave de monetización en tiempo real',
      category: 'Dashboard',
      isPremium: true,
      icon: 'BarChart3',
      rating: 4.9,
      usersCount: 4000,
    },
    {
      name: 'Detector de Tendencias IA',
      slug: 'detector-tendencias-ia',
      description: 'Identifica tendencias emergentes usando análisis predictivo',
      category: 'Tendencias',
      isPremium: true,
      icon: 'Target',
      rating: 4.7,
      usersCount: 9000,
    },
  ]

  console.log('✅ Creando herramientas...')
  for (const tool of tools) {
    await prisma.tool.upsert({
      where: { slug: tool.slug },
      update: tool,
      create: tool,
    })
  }

  // Crear templates de prompts
  const promptTemplates = [
    {
      title: 'Prompt para Copywriting de Alto Conversión',
      description: 'Template para crear textos publicitarios que convierten',
      category: 'Marketing',
      prompt: `Actúa como un experto copywriter con 10 años de experiencia en marketing directo.

Crea un {tipo_de_contenido} para {producto_servicio} que se dirija a {audiencia_objetivo}.

Contexto del producto/servicio: {contexto_producto}

Objetivo principal: {objetivo_principal}

Tono de voz: {tono_voz}

Longitud aproximada: {longitud}

Incluye:
1. Hook inicial irresistible
2. Beneficios clave (no características)
3. Prueba social
4. Llamada a la acción clara
5. Optimizado para {plataforma_destino}

Asegúrate de que el contenido siga las fórmulas de copywriting probadas (AIDA, PAS, FAB) y se enfoque en emociones y beneficios.`,
      tags: ['marketing', 'copywriting', 'ventas', 'conversión'],
      isPremium: false,
      rating: 4.8,
    },
    {
      title: 'Prompt para Creación de Propuestas Comerciales',
      description: 'Genera propuestas comerciales profesionales y persuasivas',
      category: 'Negocio',
      prompt: `Actúa como un consultor de negocios senior experto en crear propuestas comerciales ganadoras.

Crea una propuesta comercial para: {cliente_potencial}

Servicio a ofertar: {servicio_descripcion}

Presupuesto: {rango_presupuesto}

Problema del cliente: {problema_cliente}

Solución propuesta: {solución_propuesta}

Timeline: {timeline_proyecto}

Estructura la propuesta con:
1. Resumen Ejecutivo
2. Análisis del Problema
3. Solución Propuesta
4. Metodología
5. Timeline y Entregables
6. Inversión (con opciones)
7. Garantías
8. Próximos Pasos

Usa lenguaje profesional pero persuasivo, enfocado en ROI y beneficios medibles.`,
      tags: ['negocio', 'propuestas', 'ventas', 'consultoría'],
      isPremium: false,
      rating: 4.6,
    },
    {
      title: 'Prompt para Análisis de Competencia IA',
      description: 'Analiza a la competencia usando técnicas avanzadas de IA',
      category: 'Análisis',
      prompt: `Actúa como un analista de inteligencia competitiva con experiencia en IA y análisis de mercado.

Analiza la competencia para {niche_mercado} enfocado en {area_especifica}.

Competidores principales: {lista_competidores}

Objetivos del análisis: {objetivos_análisis}

Realiza un análisis completo que incluya:

1. **Análisis de Posicionamiento**
   - Unique Selling Proposition (USP) de cada competidor
   - Segmentos de mercado objetivo
   - Estrategia de precios

2. **Análisis de Contenido**
   - Tipos de contenido que publican
   - Frecuencia y canales
   - Engagement y performance
   - Gaps de contenido

3. **Análisis Técnico**
   - Stack tecnológico
   - UX/UI patterns
   - Features clave
   - Valoraciones y reviews

4. **Análisis de Marketing**
   - Canales de adquisición
   - Estrategias de SEO/SEM
   - Social media presence
   - Partnerships estratégicos

5. **Oportunidades Identificadas**
   - Gaps en el mercado
   - Servicios no ofrecidos
   - Mejoras potenciales
   - Nuevos segmentos

6. **Recomendaciones Estratégicas**
   - Posicionamiento único sugerido
   - Estrategia de diferenciación
   - Primeros pasos a implementar

Proporciona insights accionables con datos específicos cuando sea posible.`,
      tags: ['competencia', 'análisis', 'estrategia', 'mercadeo'],
      isPremium: true,
      rating: 4.9,
    },
    {
      title: 'Prompt para Optimización SEO de Contenido',
      description: 'Optimiza contenido existente para mejorar rankings de búsqueda',
      category: 'SEO',
      prompt: `Actúa como un experto SEO especializado en content optimization con experiencia en Google Algorithm updates.

Optimiza el siguiente contenido para mejorar su ranking en Google:

Contenido actual: {contenido_a_optimizar}

Keyword principal: {keyword_principal}

Keywords secundarios: {keywords_secundarios}

Intención de búsqueda: {intencion_busqueda}

Competencia: {urls_competencia}

Realiza las siguientes optimizaciones:

1. **Optimización On-Page**
   - Mejora título y meta descripción
   - Optimiza H1, H2, H3
   - Incluye keywords naturalmente
   - Mejora densidad de palabras clave

2. **Optimización de Contenido**
   - Aumenta profundidad y valor
   - Añade ejemplos y casos de uso
   - Incluye datos y estadísticas
   - Mejora readability

3. **SEO Semántico**
   - Añade entidades y topics relacionados
   - Incluye sinónimos y variaciones
   - Resuelve preguntas relacionadas
   - Crea conexiones temáticas

4. **Optimización Técnica**
   - Mejora estructura de enlaces internos
   - Optimiza imágenes (alt text)
   - Mejora velocity y mobile experience
   - Añade schema markup apropiado

5. **E-E-A-T Signals**
   - Añade author expertise signals
   - Incluye fuentes y citas
   - Demuestra experiencia
   - Añade prueba social

Proporciona el contenido optimizado completo con justificación de cada cambio.`,
      tags: ['seo', 'contenido', 'optimización', 'ranking'],
      isPremium: true,
      rating: 4.7,
    },
  ]

  console.log('✅ Creando templates de prompts...')
  for (const template of promptTemplates) {
    await prisma.promptTemplate.upsert({
      where: { title: template.title },
      update: template,
      create: template,
    })
  }

  console.log('🎉 ¡Semillas plantadas exitosamente!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error al plantar semillas:', e)
    await prisma.$disconnect()
    process.exit(1)
  })