import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function DiaryEntry() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('diary_entries')
        .insert([
          {
            title: title.trim(),
            content: content.trim(),
            mood,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      toast({
        title: "Entrée sauvegardée",
        description: "Votre entrée a été ajoutée au journal.",
      });

      navigate('/dashboard/diary');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'entrée.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const moodEmojis = ['😔', '😕', '😐', '🙂', '😊'];

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
          <h1 className="text-xl font-bold">Nouvelle Entrée</h1>
          <p className="text-muted-foreground">Partagez vos pensées du jour</p>
        </div>
      </div>

      {/* Entry Form */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle>Votre journal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Titre</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Donnez un titre à votre entrée..."
              className="bg-input border-border"
            />
          </div>

          {/* Mood Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Comment vous sentez-vous ?</label>
            <div className="flex space-x-2">
              {moodEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setMood(index + 1)}
                  className={`p-3 text-2xl rounded-xl transition-all ${
                    mood === index + 1
                      ? 'bg-primary/20 scale-110'
                      : 'bg-input hover:bg-accent'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Vos pensées</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Écrivez vos pensées, sentiments, ou événements marquants du jour..."
              className="min-h-[200px] bg-input border-border"
            />
          </div>

          {/* Save Button */}
          <Button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-primary to-primary-light text-white"
            disabled={!title.trim() || !content.trim() || isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            Enregistrer l'entrée
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}