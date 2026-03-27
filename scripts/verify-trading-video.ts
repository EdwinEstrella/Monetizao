import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyTradingVideo() {
  try {
    console.log('🔍 Verificando artículo de trading con IA...');

    // Buscar el artículo de trading
    const article = await prisma.article.findFirst({
      where: {
        slug: 'trading-ia-inversiones-automatizadas'
      }
    });

    if (!article) {
      console.error('❌ No se encontró el artículo de trading');
      return;
    }

    console.log('✅ Artículo encontrado:', article.title);
    console.log('📝 Contenido del artículo:');
    console.log('─'.repeat(50));
    console.log(article.content);
    console.log('─'.repeat(50));

    // Verificar si contiene el iframe de YouTube
    const hasYouTubeIframe = article.content.includes('<iframe') &&
                             article.content.includes('youtube.com/embed');

    if (hasYouTubeIframe) {
      console.log('✅ El artículo contiene un iframe de YouTube');

      // Extraer la URL del iframe
      const iframeMatch = article.content.match(/src="([^"]+youtube\.com\/embed\/[^"]+)"/);
      if (iframeMatch) {
        console.log('🎥 URL del video:', iframeMatch[1]);
      }
    } else {
      console.log('❌ El artículo NO contiene un iframe de YouTube');
    }

    // Verificar si contiene los créditos a Alex Ruiz
    const hasCredits = article.content.includes('Alex Ruiz');
    if (hasCredits) {
      console.log('✅ El artículo contiene créditos a Alex Ruiz');
    } else {
      console.log('❌ El artículo NO contiene créditos a Alex Ruiz');
    }

    // Verificar si no tiene imports
    const hasImports = article.content.includes('import { YouTubeVideo }');
    if (!hasImports) {
      console.log('✅ El artículo NO tiene imports problemáticos');
    } else {
      console.log('❌ El artículo todavía contiene imports problemáticos');
    }

  } catch (error) {
    console.error('Error al verificar el artículo:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyTradingVideo();