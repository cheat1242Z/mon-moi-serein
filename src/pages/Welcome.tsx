import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, BookOpen, Gift, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-green-500 p-4 rounded-full">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            DiabCare
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Votre communauté de soutien pour bien vivre avec le diabète
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conseils pratiques, motivation quotidienne, et solidarité pour tous ceux qui vivent avec le diabète
          </p>
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg"
          >
            Rejoindre notre communauté
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">Conseils d'experts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Guides pratiques et conseils médicaux validés
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <CardTitle className="text-lg">Communauté</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Partagez vos expériences et trouvez du soutien
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Heart className="w-8 h-8 mx-auto text-red-500 mb-2" />
              <CardTitle className="text-lg">Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Citations inspirantes et histoires de réussite
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Gift className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <CardTitle className="text-lg">Faire un don</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Soutenez la recherche et aidez d'autres personnes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Section */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-green-50">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-xl italic mb-4">
              "Grâce à DiabCare, j'ai appris à mieux gérer mon diabète au quotidien. 
              La communauté m'apporte un soutien précieux et les conseils sont vraiment utiles."
            </blockquote>
            <cite className="text-muted-foreground">- Marie, membre depuis 2 ans</cite>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}