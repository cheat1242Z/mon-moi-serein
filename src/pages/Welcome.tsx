import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-calm via-background to-wellness-balance flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo et titre */}
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-primary animate-pulse" />
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-wellness-energy bg-clip-text text-transparent">
            Serenity
          </h1>
          
          <p className="text-lg text-muted-foreground font-medium">
            Votre compagnon de bien-être mental
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4 text-center">
          <p className="text-foreground/80 leading-relaxed">
            Découvrez une approche douce pour cultiver votre sérénité quotidienne, 
            suivre votre humeur et développer des habitudes positives.
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-wellness-calm rounded-full"></div>
              <span>Suivi d'humeur</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-wellness-energy rounded-full"></div>
              <span>Exercices bien-être</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-wellness-focus rounded-full"></div>
              <span>Productivité zen</span>
            </div>
          </div>
        </div>

        {/* Bouton d'action */}
        <div className="pt-4">
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-primary to-wellness-energy hover:from-primary/90 hover:to-wellness-energy/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Commencer mon voyage
          </Button>
        </div>

        {/* Citation inspirante */}
        <div className="pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground/80 italic">
            "La sérénité n'est pas l'absence de tempête, mais la paix au milieu de la tempête."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;