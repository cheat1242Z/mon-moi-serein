import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function DiaryEntry() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [situation, setSituation] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim() || !situation.trim()) return;
    
    setIsLoading(true);
    
    // Simuler l'envoi (remplacer par une vraie API plus tard)
    setTimeout(() => {
      toast({
        title: "Question envoyée",
        description: "Votre question a été transmise à notre équipe d'experts. Vous recevrez une réponse sous 24h.",
      });

      navigate('/dashboard/diary');
      setIsLoading(false);
    }, 1000);
  };

  const categories = [
    'Alimentation et nutrition',
    'Gestion de la glycémie',
    'Activité physique',
    'Médicaments et traitements',
    'Complications',
    'Vie quotidienne',
    'Soutien psychologique'
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Link to="/dashboard/diary">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-blue-700">Poser une question</h1>
          <p className="text-muted-foreground">Nos experts vous répondent</p>
        </div>
        <Heart className="w-6 h-6 text-red-500" />
      </div>

      {/* Question Form */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="text-blue-600">💬 Votre question aux experts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Question */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Votre question *</label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: Comment gérer ma glycémie après les repas ?"
              className="bg-input border-border"
            />
          </div>

          {/* Situation */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Décrivez votre situation *</label>
            <Textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Donnez-nous des détails sur votre situation, vos habitudes, ce que vous avez déjà essayé..."
              className="min-h-[150px] bg-input border-border"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">ℹ️ Informations importantes</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Nos experts sont des professionnels de santé certifiés</li>
              <li>• Vous recevrez une réponse personnalisée sous 24h</li>
              <li>• Ce service ne remplace pas une consultation médicale</li>
              <li>• En cas d'urgence, contactez immédiatement votre médecin</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
            disabled={!question.trim() || !situation.trim() || isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Envoi en cours...' : 'Envoyer ma question'}
          </Button>
        </CardContent>
      </Card>

      {/* FAQ Card */}
      <Card className="wellness-card bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-green-700">❓ Questions fréquentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-3">
              <p className="font-medium text-sm">Quelle est la glycémie normale ?</p>
              <p className="text-xs text-muted-foreground">À jeun : 0,70 à 1,10 g/L</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <p className="font-medium text-sm">Combien d'exercice par semaine ?</p>
              <p className="text-xs text-muted-foreground">150 minutes d'activité modérée</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <p className="font-medium text-sm">Que manger en cas d'hypoglycémie ?</p>
              <p className="text-xs text-muted-foreground">15g de glucides rapides (3 sucres)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}