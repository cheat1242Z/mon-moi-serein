import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, Calendar, Heart, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockData = {
  averageMood: 3.8,
  totalEntries: 24,
  streakDays: 7,
  weeklyData: [
    { day: 'Lun', mood: 4, emotions: ['Motivé', 'Énergique'] },
    { day: 'Mar', mood: 3, emotions: ['Calme', 'Concentré'] },
    { day: 'Mer', mood: 5, emotions: ['Heureux', 'Reconnaissant'] },
    { day: 'Jeu', mood: 2, emotions: ['Stressé', 'Fatigué'] },
    { day: 'Ven', mood: 4, emotions: ['Soulagé', 'Optimiste'] },
    { day: 'Sam', mood: 5, emotions: ['Détendu', 'Joyeux'] },
    { day: 'Dim', mood: 4, emotions: ['Paisible', 'Reconnaissant'] },
  ],
  emotionStats: [
    { emotion: 'Heureux', count: 12, percentage: 50 },
    { emotion: 'Calme', count: 10, percentage: 42 },
    { emotion: 'Énergique', count: 8, percentage: 33 },
    { emotion: 'Stressé', count: 6, percentage: 25 },
    { emotion: 'Fatigué', count: 4, percentage: 17 },
  ],
  domainImpact: [
    { domain: 'Travail', impact: 70, icon: '💼' },
    { domain: 'Santé', impact: 85, icon: '🏥' },
    { domain: 'Relations', impact: 90, icon: '💕' },
    { domain: 'Personnel', impact: 75, icon: '🧘‍♀️' },
  ]
};

const getMoodEmoji = (mood: number) => {
  const emojis = ['😔', '😕', '😐', '🙂', '😊'];
  return emojis[mood - 1] || '😐';
};

const getMoodColor = (mood: number) => {
  if (mood <= 2) return 'bg-red-500';
  if (mood === 3) return 'bg-yellow-500';
  return 'bg-green-500';
};

export default function Analytics() {
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
          <h1 className="text-xl font-bold">Analyses</h1>
          <p className="text-muted-foreground">Votre évolution bien-être</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {mockData.averageMood.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Humeur moyenne</div>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-wellness-focus/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-wellness-focus" />
            </div>
            <div className="text-2xl font-bold text-wellness-focus">
              {mockData.totalEntries}
            </div>
            <div className="text-sm text-muted-foreground">Jours enregistrés</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Mood Trend */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Tendance de la semaine</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.weeklyData.map(({ day, mood, emotions }) => (
              <div key={day} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium w-8">{day}</div>
                  <div className="text-lg">{getMoodEmoji(mood)}</div>
                  <div className="flex flex-wrap gap-1">
                    {emotions.slice(0, 2).map((emotion) => (
                      <span key={emotion} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {emotion}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getMoodColor(mood)}`} />
                  <span className="text-sm font-medium">{mood}/5</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Emotions */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle>Émotions principales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockData.emotionStats.map(({ emotion, count, percentage }) => (
            <div key={emotion} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{emotion}</span>
                <span className="text-muted-foreground">{count} fois</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Life Domains Impact */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Impact par domaine</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockData.domainImpact.map(({ domain, impact, icon }) => (
            <div key={domain} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{icon}</span>
                <span className="font-medium">{domain}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20">
                  <Progress value={impact} className="h-2" />
                </div>
                <span className="text-sm font-medium w-10">{impact}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Insights Card */}
      <Card className="wellness-card bg-gradient-to-br from-wellness-balance/5 to-primary/5">
        <CardHeader>
          <CardTitle className="text-primary">✨ Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Votre humeur est plus élevée les weekends</li>
            <li>• Les domaines Relations et Santé ont un impact positif</li>
            <li>• Vous ressentez plus de calme après les exercices de respiration</li>
            <li>• Votre série de 7 jours montre une belle régularité</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}