import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, BookOpen, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockEntries = [
  {
    id: 1,
    date: '2024-01-15',
    title: 'Une belle journée',
    content: 'Aujourd\'hui j\'ai passé du temps dans le jardin. Les fleurs commencent à éclore et cela me remplit de joie...',
    mood: 4
  },
  {
    id: 2,
    date: '2024-01-14',
    title: 'Réflexions du soir',
    content: 'J\'ai pris le temps de méditer ce soir. Ces moments de calme sont précieux dans ma routine quotidienne...',
    mood: 5
  }
];

export default function Diary() {
  const [entries] = useState(mockEntries);
  const [searchTerm, setSearchTerm] = useState('');

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😔', '😕', '😐', '🙂', '😊'];
    return emojis[mood - 1] || '😐';
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 py-4">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Journal Intime</h1>
          <p className="text-muted-foreground">Vos pensées et réflexions</p>
        </div>
        <Link to="/dashboard/diary/new">
          <Button className="bg-gradient-to-r from-primary to-primary-light text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle entrée
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher dans vos entrées..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="wellness-card">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Aucune entrée trouvée</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Aucune entrée ne correspond à votre recherche.' : 'Commencez à écrire votre premier journal.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="wellness-card hover:scale-105 transition-transform duration-300 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                    <span>{entry.title}</span>
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {entry.content}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Tips Card */}
      <Card className="wellness-card bg-gradient-to-br from-wellness-balance/5 to-wellness-calm/5">
        <CardHeader>
          <CardTitle className="text-wellness-balance">✨ Conseil d'écriture</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Écrivez quelques lignes chaque jour sur vos pensées, émotions ou événements marquants. 
            Cette pratique peut améliorer votre bien-être mental et votre auto-réflexion.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}