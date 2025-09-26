import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SoundTrack {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  // En production, vous utiliseriez de vrais fichiers audio
  // Pour cette démo, on simule avec des URLs d'exemple
  audioUrl: string;
}

const soundTracks: SoundTrack[] = [
  {
    id: 'rain',
    name: 'Pluie douce',
    icon: '🌧️',
    description: 'Sons apaisants de pluie légère',
    color: 'from-blue-400/20 to-slate-400/20',
    audioUrl: 'https://www.soundjay.com/misc/sounds/rain-01.wav'
  },
  {
    id: 'ocean',
    name: 'Vagues océan',
    icon: '🌊',
    description: 'Bruits relaxants de vagues',
    color: 'from-cyan-400/20 to-blue-500/20',
    audioUrl: 'https://www.soundjay.com/misc/sounds/ocean-wave-1.wav'
  },
  {
    id: 'forest',
    name: 'Forêt mystique',
    icon: '🌲',
    description: 'Ambiance naturelle de forêt',
    color: 'from-green-400/20 to-emerald-500/20',
    audioUrl: 'https://www.soundjay.com/misc/sounds/forest-01.wav'
  },
  {
    id: 'birds',
    name: 'Chants d\'oiseaux',
    icon: '🐦',
    description: 'Mélodies naturelles d\'oiseaux',
    color: 'from-yellow-400/20 to-orange-400/20',
    audioUrl: 'https://www.soundjay.com/misc/sounds/birds-01.wav'
  },
  {
    id: 'fireplace',
    name: 'Cheminée crépitante',
    icon: '🔥',
    description: 'Crépitement chaleureux de feu',
    color: 'from-red-400/20 to-orange-500/20',
    audioUrl: 'https://www.soundjay.com/misc/sounds/fire-01.wav'
  },
  {
    id: 'wind',
    name: 'Vent léger',
    icon: '💨',
    description: 'Souffle doux et apaisant',
    color: 'from-gray-400/20 to-slate-500/20',
    audioUrl: 'https://www.soundjay.com/misc/sounds/wind-01.wav'
  }
];

export default function Music() {
  const [activeTracks, setActiveTracks] = useState<Set<string>>(new Set());
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [masterVolume, setMasterVolume] = useState([70]);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    // Initialiser les volumes par défaut
    const defaultVolumes: Record<string, number> = {};
    soundTracks.forEach(track => {
      defaultVolumes[track.id] = 50;
    });
    setVolumes(defaultVolumes);
  }, []);

  const toggleTrack = (trackId: string) => {
    const newActiveTracks = new Set(activeTracks);
    
    if (activeTracks.has(trackId)) {
      newActiveTracks.delete(trackId);
      // Pause audio
      if (audioRefs.current[trackId]) {
        audioRefs.current[trackId].pause();
      }
    } else {
      newActiveTracks.add(trackId);
      // Note: En production, vous ajouteriez ici la logique pour jouer le son
      // Pour cette démo, on simule juste l'état
    }
    
    setActiveTracks(newActiveTracks);
  };

  const updateVolume = (trackId: string, volume: number) => {
    setVolumes(prev => ({
      ...prev,
      [trackId]: volume
    }));
    
    // En production, vous mettriez à jour le volume de l'audio
    if (audioRefs.current[trackId]) {
      audioRefs.current[trackId].volume = (volume / 100) * (masterVolume[0] / 100);
    }
  };

  const stopAllTracks = () => {
    setActiveTracks(new Set());
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause();
      }
    });
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
          <h1 className="text-xl font-bold">Musique relaxante</h1>
          <p className="text-muted-foreground">Sons d'ambiance pour se détendre</p>
        </div>
      </div>

      {/* Master Controls */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-primary" />
            <span>Volume principal</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <VolumeX className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={masterVolume}
              onValueChange={setMasterVolume}
              max={100}
              step={1}
              className="flex-1"
            />
            <Volume2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium w-12">{masterVolume[0]}%</span>
          </div>
          
          {activeTracks.size > 0 && (
            <Button
              onClick={stopAllTracks}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Pause className="w-4 h-4 mr-2" />
              Arrêter tous les sons
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Sound Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {soundTracks.map((track) => {
          const isActive = activeTracks.has(track.id);
          const volume = volumes[track.id] || 50;
          
          return (
            <Card key={track.id} className={`wellness-card transition-all duration-300 ${
              isActive ? 'ring-2 ring-primary/30 scale-[1.02]' : ''
            }`}>
              <CardContent className="p-6 space-y-4">
                {/* Track Header */}
                <div className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${track.color}`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{track.icon}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">{track.name}</h3>
                      <p className="text-sm text-muted-foreground">{track.description}</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => toggleTrack(track.id)}
                    size="lg"
                    variant={isActive ? "default" : "outline"}
                    className={`rounded-full ${
                      isActive 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'border-primary/20 hover:border-primary/40 hover:bg-primary/5'
                    }`}
                  >
                    {isActive ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                </div>

                {/* Volume Control */}
                <div className={`space-y-2 transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Volume</span>
                    <span className="text-sm text-muted-foreground">{volume}%</span>
                  </div>
                  <Slider
                    value={[volume]}
                    onValueChange={(value) => updateVolume(track.id, value[0])}
                    max={100}
                    step={1}
                    disabled={!isActive}
                    className="w-full"
                  />
                </div>

                {/* Status Indicator */}
                {isActive && (
                  <div className="flex items-center space-x-2 text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm font-medium">En cours de lecture</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips Card */}
      <Card className="wellness-card bg-gradient-to-br from-wellness-balance/5 to-wellness-calm/5">
        <CardHeader>
          <CardTitle className="text-wellness-balance">🎵 Conseils d'utilisation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            • <strong>Combinez plusieurs sons</strong> pour créer votre ambiance parfaite
          </p>
          <p className="text-sm text-muted-foreground">
            • <strong>Ajustez les volumes</strong> individuellement selon vos préférences
          </p>
          <p className="text-sm text-muted-foreground">
            • <strong>Utilisez avec casque</strong> pour une expérience immersive optimale
          </p>
          <p className="text-sm text-muted-foreground">
            • <strong>Idéal pendant</strong> la méditation, le travail ou avant le sommeil
          </p>
        </CardContent>
      </Card>
    </div>
  );
}