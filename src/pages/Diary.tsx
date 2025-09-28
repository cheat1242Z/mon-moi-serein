import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, BookOpen, Search, Heart, Activity, Apple } from 'lucide-react';
import { Link } from 'react-router-dom';

// Conseils pour diabétiques
const diabeticTips = [
  {
    id: 1,
    date: '2024-01-15',
    title: 'Contrôler sa glycémie le matin',
    content: 'Prenez votre glycémie à jeun tous les matins pour mieux comprendre comment votre corps réagit. Notez les résultats dans un carnet pour identifier les tendances.',
    category: 'Surveillance',
    icon: '📊',
    difficulty: 'Facile'
  },
  {
    id: 2,
    date: '2024-01-14',
    title: 'L\'importance de l\'exercice quotidien',
    content: '30 minutes de marche par jour peuvent réduire votre glycémie de manière significative. Commencez doucement et augmentez progressivement l\'intensité.',
    category: 'Activité physique',
    icon: '🚶‍♀️',
    difficulty: 'Modéré'
  },
  {
    id: 3,
    date: '2024-01-13',
    title: 'Comprendre l\'index glycémique',
    content: 'Privilégiez les aliments à index glycémique bas comme les légumes verts, les légumineuses et les céréales complètes pour maintenir une glycémie stable.',
    category: 'Nutrition',
    icon: '🥗',
    difficulty: 'Intermédiaire'
  },
  {
    id: 4,
    date: '2024-01-12',
    title: 'Gérer le stress et le diabète',
    content: 'Le stress peut faire augmenter votre glycémie. Pratiquez des techniques de relaxation comme la méditation ou la respiration profonde.',
    category: 'Bien-être',
    icon: '🧘‍♀️',
    difficulty: 'Facile'
  },
  {
    id: 5,
    date: '2024-01-11',
    title: 'Préparer ses repas à l\'avance',
    content: 'La planification des repas vous aide à contrôler votre alimentation. Préparez des portions équilibrées avec des protéines, des légumes et des glucides complexes.',
    category: 'Nutrition',
    icon: '🍽️',
    difficulty: 'Modéré'
  }
];

const categories = [
  { id: 'all', label: 'Tous', icon: '📋' },
  { id: 'Surveillance', label: 'Surveillance', icon: '📊' },
  { id: 'Nutrition', label: 'Nutrition', icon: '🥗' },
  { id: 'Activité physique', label: 'Exercice', icon: '🏃‍♂️' },
  { id: 'Bien-être', label: 'Bien-être', icon: '💆‍♀️' }
];

export default function Diary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTips = diabeticTips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-700';
      case 'Modéré': return 'bg-yellow-100 text-yellow-700';
      case 'Intermédiaire': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-blue-700">Conseils & Guides</h1>
          <p className="text-muted-foreground">Votre guide pratique pour bien vivre avec le diabète</p>
        </div>
        <Heart className="w-6 h-6 text-red-500" />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher un conseil..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="rounded-full"
          >
            <span className="mr-1">{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </div>

      {/* Tips List */}
      <div className="space-y-4">
        {filteredTips.length === 0 ? (
          <Card className="wellness-card">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Aucun conseil trouvé</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Aucun conseil ne correspond à votre recherche.' : 'Sélectionnez une catégorie pour voir les conseils.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTips.map((tip) => (
            <Card key={tip.id} className="wellness-card hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">{tip.icon}</span>
                    <span className="text-blue-700">{tip.title}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(tip.difficulty)}`}>
                      {tip.difficulty}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  {tip.content}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">
                    📂 {tip.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(tip.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long'
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Emergency Card */}
      <Card className="wellness-card bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center">
            🚨 Urgence diabétique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-800 mb-2">
            En cas d'hypoglycémie sévère ou d'hyperglycémie, contactez immédiatement votre médecin ou appelez le 15.
          </p>
          <p className="text-sm text-red-600">
            Signes d'urgence : confusion, perte de conscience, vomissements persistants, respiration rapide.
          </p>
        </CardContent>
      </Card>

      {/* Daily Tip */}
      <Card className="wellness-card bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-green-700 flex items-center">
            💡 Astuce du jour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-800">
            Buvez un grand verre d'eau avant chaque repas. Cela peut vous aider à vous sentir plus rassasié et à mieux contrôler votre glycémie post-prandiale.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}