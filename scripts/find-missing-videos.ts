import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient();

async function findMissingVideos() {
  try {
    console.log('🔍 Buscando artículos que necesitan videos...');

    // Obtener todos los artículos publicados
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true
      }
    });

    console.log(`📊 Total de artículos publicados: ${articles.length}`);

    const articlesNeedingVideos: Array<{
      id: string;
      title: string;
      slug: string;
      reason: string;
    }> = [];

    for (const article of articles) {
      const content = article.content;
      const reasons: string[] = [];

      // Verificar si tiene imports de YouTubeVideo
      if (content.includes('import { YouTubeVideo }')) {
        reasons.push('Tiene imports de YouTubeVideo no procesados');
      }

      // Verificar si menciona videos pero no tiene iframes
      const videoKeywords = ['video', 'youtube', 'vídeo', 'tutorial', 'demo', 'ejemplo'];
      const hasVideoKeywords = videoKeywords.some(keyword =>
        content.toLowerCase().includes(keyword)
      );

      const hasIframe = content.includes('<iframe') &&
                       content.includes('youtube.com/embed');

      if (hasVideoKeywords && !hasIframe) {
        reasons.push('Menciona videos pero no tiene iframes de YouTube');
      }

      // Verificar si es un artículo que típicamente tendría video
      const videoWorthyKeywords = [
        'trading', 'ia', 'automatización', 'tutorial', 'guía', 'curso',
        'demo', 'ejemplo práctico', 'paso a paso', 'cómo', 'aprende',
        'automatizar', 'inversión', 'negocios', 'monetización'
      ];

      const shouldHaveVideo = videoWorthyKeywords.some(keyword =>
        content.toLowerCase().includes(keyword)
      );

      if (shouldHaveVideo && !hasIframe) {
        reasons.push('El tema sugiere que debería tener un video demostrativo');
      }

      if (reasons.length > 0) {
        articlesNeedingVideos.push({
          id: article.id,
          title: article.title,
          slug: article.slug,
          reason: reasons.join(' | ')
        });
      }
    }

    console.log('\n📋 ARTÍCULOS QUE NECESITAN VIDEOS:');
    console.log('='.repeat(80));

    if (articlesNeedingVideos.length === 0) {
      console.log('✅ Todos los artículos parecen tener videos apropiados');
    } else {
      articlesNeedingVideos.forEach((article, index) => {
        console.log(`\n${index + 1}. ${article.title}`);
        console.log(`   Slug: ${article.slug}`);
        console.log(`   Razón: ${article.reason}`);
        console.log(`   URL: http://localhost:3000/blog/${article.slug}`);
      });

      console.log(`\n📊 Total de artículos que necesitan videos: ${articlesNeedingVideos.length}`);
    }

    console.log('\n🎥 ARTÍCULOS CON VIDEOS (referencia):');
    console.log('='.repeat(80));

    const articlesWithVideos = articles.filter(article =>
      article.content.includes('<iframe') &&
      article.content.includes('youtube.com/embed')
    );

    articlesWithVideos.forEach((article: any, index: number) => {
      console.log(`\n${index + 1}. ${article.title}`);
      console.log(`   Slug: ${article.slug}`);
      console.log(`   URL: http://localhost:3000/blog/${article.slug}`);
    });

    console.log(`\n📊 Total de artículos con videos: ${articlesWithVideos.length}`);

    return articlesNeedingVideos;

  } catch (error) {
    console.error('Error al buscar artículos:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

findMissingVideos();