import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, TrendingUp, Users, BookOpen, Gift, MessageCircle, Calendar, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const todayTip = "Buvez un verre d'eau avant chaque repas pour mieux contrôler votre glycémie.";
  
  return (
    <div className="p-4 space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
          Bienvenue sur DiabCare
        </h1>
        <p className="text-muted-foreground">
          Votre compagnon quotidien pour bien vivre avec le diabète
        </p>
      </div>

      {/* Daily Tip */}
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Bell className="w-5 h-5 mr-2" />
            Conseil du jour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800">{todayTip}</p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Users className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold">15,234</div>
            <p className="text-sm text-muted-foreground">Membres actifs</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <BookOpen className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold">142</div>
            <p className="text-sm text-muted-foreground">Articles d'aide</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <MessageCircle className="w-8 h-8 mx-auto text-purple-600 mb-2" />
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-sm text-muted-foreground">Messages d'entraide</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Gift className="w-8 h-8 mx-auto text-red-500 mb-2" />
            <div className="text-2xl font-bold">€28,450</div>
            <p className="text-sm text-muted-foreground">Dons collectés</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <BookOpen className="w-5 h-5 mr-2" />
              Guides & Conseils
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Découvrez nos guides pratiques pour bien gérer votre diabète au quotidien.
            </p>
            <Link to="/dashboard/diary">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Explorer les conseils
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <Heart className="w-5 h-5 mr-2" />
              Motivation quotidienne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Histoires inspirantes et motivation pour vous accompagner chaque jour.
            </p>
            <Link to="/dashboard/mood">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Trouver l'inspiration
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-600">
              <Users className="w-5 h-5 mr-2" />
              Communauté
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Échangez avec d'autres personnes qui vivent les mêmes défis.
            </p>
            <Link to="/dashboard/wellness">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Rejoindre la communauté
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-red-500">
              <Gift className="w-5 h-5 mr-2" />
              Faire un don
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Soutenez la recherche et aidez d'autres personnes diabétiques.
            </p>
            <Link to="/dashboard/analytics">
              <Button className="w-full bg-red-500 hover:bg-red-600">
                Faire un don
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Latest News */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Actualités récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold">Nouvelle étude sur l'activité physique</h4>
              <p className="text-sm text-muted-foreground">
                Des recherches récentes montrent l'impact positif de 30 minutes d'exercice quotidien sur le contrôle glycémique.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold">Recettes diabétiques de saison</h4>
              <p className="text-sm text-muted-foreground">
                Découvrez nos nouvelles recettes équilibrées pour les fêtes de fin d'année.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}