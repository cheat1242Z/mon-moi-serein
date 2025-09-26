import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Calendar, 
  Sparkles, 
  TrendingUp,
  Flame,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import serenityHero from '@/assets/serenity-hero.jpg';

export default function Dashboard() {
  const currentStreak = 7;
  const todaysMood = null; // null means not recorded yet
  
  const moodEmojis = ['😔', '😕', '😐', '🙂', '😊'];
  
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="flex items-center justify-center mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-foreground">Serenity</h1>
        <p className="text-sm text-muted-foreground">Votre compagnon bien-être</p>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl mb-6">
        <img 
          src={serenityHero} 
          alt="Paysage zen et serein"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h2 className="text-xl font-bold mb-1">Cultivez votre sérénité</h2>
            <p className="text-white/90 text-sm">Prenez un moment pour vous aujourd'hui</p>
          </div>
        </div>
      </div>

      {/* Streak Card */}
      <Card className="wellness-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Série actuelle</h3>
              <p className="text-muted-foreground">Jours consécutifs</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="streak-glow">
                <div className="bg-gradient-to-r from-primary to-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  {currentStreak}
                </div>
              </div>
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <Progress value={(currentStreak % 30) * 3.33} className="mt-4" />
        </CardContent>
      </Card>

      {/* Today's Mood */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-primary" />
            <span>Humeur du jour</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaysMood ? (
            <div className="text-center">
              <div className="text-4xl mb-2">{moodEmojis[todaysMood - 1]}</div>
              <p className="text-muted-foreground">Déjà enregistrée aujourd'hui</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Comment vous sentez-vous aujourd'hui ?</p>
              <Link to="/mood">
                <Button className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Enregistrer mon humeur
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/wellness">
          <Card className="wellness-card hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-wellness-calm/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-wellness-calm" />
              </div>
              <h3 className="font-semibold">Respiration</h3>
              <p className="text-sm text-muted-foreground">Exercice de calme</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/analytics">
          <Card className="wellness-card hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-wellness-focus/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-wellness-focus" />
              </div>
              <h3 className="font-semibold">Progrès</h3>
              <p className="text-sm text-muted-foreground">Mes statistiques</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Inspirational Quote */}
      <Card className="wellness-card bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-6 text-center">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <blockquote className="text-lg font-medium text-foreground mb-2">
            "La sérénité vient de l'intérieur. Ne la cherchez pas à l'extérieur."
          </blockquote>
          <cite className="text-muted-foreground">- Bouddha</cite>
        </CardContent>
      </Card>
    </div>
  );
}