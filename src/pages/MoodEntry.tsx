import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ArrowLeft, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const moodLevels = [
  { level: 1, emoji: '😔', label: 'Très bas', color: 'bg-red-100 text-red-700' },
  { level: 2, emoji: '😕', label: 'Bas', color: 'bg-orange-100 text-orange-700' },
  { level: 3, emoji: '😐', label: 'Neutre', color: 'bg-yellow-100 text-yellow-700' },
  { level: 4, emoji: '🙂', label: 'Bien', color: 'bg-green-100 text-green-700' },
  { level: 5, emoji: '😊', label: 'Excellent', color: 'bg-emerald-100 text-emerald-700' },
];

const emotions = [
  'Heureux', 'Calme', 'Énergique', 'Confiant', 'Reconnaissant',
  'Anxieux', 'Stressé', 'Fatigué', 'Irrité', 'Triste',
  'Motivé', 'Créatif', 'Détendu', 'Optimiste', 'Paisible'
];

const lifeDomains = [
  { id: 'work', label: 'Travail', icon: '💼' },
  { id: 'study', label: 'Études', icon: '📚' },
  { id: 'family', label: 'Famille', icon: '👨‍👩‍👧‍👦' },
  { id: 'relationship', label: 'Relations', icon: '💕' },
  { id: 'health', label: 'Santé', icon: '🏥' },
  { id: 'finance', label: 'Finances', icon: '💰' },
  { id: 'personal', label: 'Personnel', icon: '🧘‍♀️' },
  { id: 'social', label: 'Social', icon: '👥' },
];

export default function MoodEntry() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleDomainToggle = (domainId: string) => {
    setSelectedDomains(prev => 
      prev.includes(domainId) 
        ? prev.filter(d => d !== domainId)
        : [...prev, domainId]
    );
  };

  const handleSubmit = () => {
    // Save mood entry logic would go here
    navigate('/');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">Comment vous sentez-vous ?</h1>
          <p className="text-muted-foreground">Enregistrez votre humeur du jour</p>
        </div>
      </div>

      {/* Mood Level Selection */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-primary" />
            <span>Niveau d'humeur</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {moodLevels.map(({ level, emoji, label, color }) => (
              <button
                key={level}
                onClick={() => setSelectedMood(level)}
                className={`mood-button text-center ${
                  selectedMood === level 
                    ? 'bg-primary/20 ring-2 ring-primary' 
                    : 'bg-muted/50'
                }`}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-xs font-medium">{label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emotions Selection */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle>Émotions ressenties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => (
              <Badge
                key={emotion}
                variant={selectedEmotions.includes(emotion) ? "default" : "secondary"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedEmotions.includes(emotion)
                    ? 'bg-primary text-white'
                    : 'hover:bg-primary/20'
                }`}
                onClick={() => handleEmotionToggle(emotion)}
              >
                {emotion}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Life Domains */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle>Domaines de vie affectés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {lifeDomains.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => handleDomainToggle(id)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  selectedDomains.includes(id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-lg mb-1">{icon}</div>
                <div className="text-sm font-medium">{label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle>Notes (optionnel)</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Qu'est-ce qui influence votre humeur aujourd'hui ?"
            className="w-full p-3 bg-input border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit}
        disabled={!selectedMood}
        className="w-full py-6 text-lg bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary disabled:opacity-50"
      >
        <Check className="w-5 h-5 mr-2" />
        Enregistrer mon humeur
      </Button>
    </div>
  );
}