import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { id: 'surveillance', label: 'Surveillance glycémique', icon: '📊' },
  { id: 'traitement', label: 'Prise de médicaments', icon: '💊' },
  { id: 'exercice', label: 'Activité physique', icon: '🏃‍♂️' },
  { id: 'nutrition', label: 'Nutrition et repas', icon: '🥗' },
  { id: 'medical', label: 'Rendez-vous médical', icon: '🏥' }
];

const priorities = [
  { id: 'high', label: 'Urgent - Ne pas oublier' },
  { id: 'medium', label: 'Important - À faire aujourd\'hui' },
  { id: 'low', label: 'Optionnel - Quand possible' }
];

const sugggestedTasks = {
  surveillance: [
    'Contrôle glycémie à jeun',
    'Mesure glycémie 2h après repas',
    'Contrôle de la tension artérielle',
    'Pesée quotidienne'
  ],
  traitement: [
    'Prendre Metformine',
    'Injection insuline',
    'Vitamines et compléments',
    'Vérifier stock médicaments'
  ],
  exercice: [
    'Marche 30 minutes',
    'Séance de natation',
    'Exercices de résistance',
    'Yoga ou stretching'
  ],
  nutrition: [
    'Noter les repas du jour',
    'Préparer collation équilibrée',
    'Calculer les glucides',
    'Planifier menu de demain'
  ]
};

export default function TaskEntry() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !category || !priority) return;

    setIsLoading(true);

    // Simulation de sauvegarde
    setTimeout(() => {
      toast({
        title: "Tâche créée avec succès ! 🎉",
        description: "Votre tâche de suivi a été ajoutée à votre planning.",
      });

      navigate('/dashboard/planner');
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTitle(suggestion);
  };

  const currentSuggestions = category ? sugggestedTasks[category as keyof typeof sugggestedTasks] || [] : [];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Link to="/dashboard/planner">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-blue-700">Nouvelle tâche de suivi</h1>
          <p className="text-muted-foreground">Ajoutez une tâche à votre routine diabète</p>
        </div>
      </div>

      {/* Task Form */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="text-blue-600">📋 Créer une tâche de suivi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type de suivi *</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Choisissez le type de suivi" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <span className="flex items-center space-x-2">
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Suggestions */}
          {currentSuggestions.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Suggestions populaires</label>
              <div className="flex flex-wrap gap-2">
                {currentSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs rounded-full"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom de la tâche *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Contrôle glycémie matin"
              className="bg-input border-border"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes ou rappel</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ajoutez des détails, posologie, objectifs..."
              className="bg-input border-border"
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Heure de rappel</label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-input border-border"
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Importance *</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Choisissez le niveau d'importance" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((prio) => (
                  <SelectItem key={prio.id} value={prio.id}>
                    {prio.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">💡 Conseils pour un bon suivi</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Fixez des horaires réguliers pour vos contrôles</li>
              <li>• Notez vos résultats dans un carnet ou une app</li>
              <li>• N'oubliez pas de prendre vos médicaments à heures fixes</li>
              <li>• Consultez votre médecin en cas de valeurs inhabituelles</li>
            </ul>
          </div>

          {/* Save Button */}
          <Button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
            disabled={!title.trim() || !category || !priority || isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Création en cours...' : 'Créer la tâche'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}