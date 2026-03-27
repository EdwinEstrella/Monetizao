import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AuthorBioProps {
  author: {
    name: string;
    avatar?: string | null;
  };
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <Card className="mt-12">
      <CardContent className="pt-6">
        <div className="flex items-center">
          <div className="mr-4">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-16 h-16 rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-bold text-lg">Escrito por {author.name}</h4>
            <p className="text-sm text-muted-foreground">
              Edwin es el fundador de Monetizao y un experto en la aplicación de la IA para la creación de negocios digitales. Conecta con él en <a href="https://www.linkedin.com/in/edwin-estrella/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
