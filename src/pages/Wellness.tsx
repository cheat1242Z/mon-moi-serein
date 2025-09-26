import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wellness() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isBreathing) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            setPhase(current => {
              const newPhase = current === 'inhale' ? 'exhale' : 'inhale';
              if (newPhase === 'inhale') {
                setCycle(c => c + 1);
              }
              return newPhase;
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isBreathing]);

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
  };

  const resetBreathing = () => {
    setIsBreathing(false);
    setPhase('inhale');
    setCountdown(4);
    setCycle(0);
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
          <h1 className="text-xl font-bold">Bien-être</h1>
          <p className="text-muted-foreground">Exercices de relaxation</p>
        </div>
      </div>

      {/* Breathing Exercise */}
      <Card className="wellness-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Exercice de respiration</CardTitle>
          <p className="text-muted-foreground">
            Suivez le rythme pour vous détendre
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-8">
          {/* Breathing Circle */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div 
                className={`breathing-circle w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 ${
                  isBreathing && phase === 'inhale' ? 'breathing-active' : ''
                } ${
                  isBreathing && phase === 'exhale' ? 'scale-75 border-primary/60' : ''
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {countdown}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground capitalize">
                    {phase === 'inhale' ? 'Inspirez' : 'Expirez'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="text-sm text-muted-foreground mb-1">Cycles complétés</div>
            <div className="text-2xl font-bold text-primary">{cycle}</div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggleBreathing}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white px-8"
            >
              {isBreathing ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Commencer
                </>
              )}
            </Button>
            
            <Button
              onClick={resetBreathing}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-wellness-calm/10 to-wellness-balance/10 rounded-xl p-4 text-left space-y-2">
            <h3 className="font-semibold text-wellness-calm">Instructions :</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Inspirez pendant 4 secondes quand le cercle grandit</li>
              <li>• Expirez pendant 4 secondes quand le cercle rétrécit</li>
              <li>• Répétez le cycle pour vous détendre</li>
              <li>• Concentrez-vous uniquement sur votre respiration</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="wellness-card bg-gradient-to-br from-wellness-balance/5 to-wellness-calm/5">
        <CardHeader>
          <CardTitle className="text-wellness-balance">💡 Conseil bien-être</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Pratiquez cet exercice de respiration 5 minutes par jour pour réduire le stress 
            et améliorer votre concentration. C'est particulièrement efficace le matin ou 
            avant une tâche importante.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}