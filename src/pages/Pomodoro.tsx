import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Pause, RotateCcw, Settings, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

type SessionType = 'work' | 'break' | 'longBreak';

const sessionConfig = {
  work: { duration: 25 * 60, label: 'Travail', color: 'text-primary', bgColor: 'bg-primary/10' },
  break: { duration: 5 * 60, label: 'Pause courte', color: 'text-wellness-calm', bgColor: 'bg-wellness-calm/10' },
  longBreak: { duration: 15 * 60, label: 'Pause longue', color: 'text-wellness-balance', bgColor: 'bg-wellness-balance/10' }
};

export default function Pomodoro() {
  const [currentSession, setCurrentSession] = useState<SessionType>('work');
  const [timeLeft, setTimeLeft] = useState(sessionConfig.work.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session completed
      setIsRunning(false);
      
      if (currentSession === 'work') {
        setCompletedPomodoros(prev => prev + 1);
        const nextSession = completedPomodoros + 1 >= 4 ? 'longBreak' : 'break';
        setCurrentSession(nextSession);
        setTimeLeft(sessionConfig[nextSession].duration);
        
        if (completedPomodoros + 1 >= 4) {
          setCurrentCycle(prev => prev + 1);
          setCompletedPomodoros(0);
        }
      } else {
        setCurrentSession('work');
        setTimeLeft(sessionConfig.work.duration);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentSession, completedPomodoros]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionConfig[currentSession].duration);
  };

  const resetAll = () => {
    setIsRunning(false);
    setCurrentSession('work');
    setTimeLeft(sessionConfig.work.duration);
    setCompletedPomodoros(0);
    setCurrentCycle(1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((sessionConfig[currentSession].duration - timeLeft) / sessionConfig[currentSession].duration) * 100;
  const sessionInfo = sessionConfig[currentSession];

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
          <h1 className="text-xl font-bold">Focus Pomodoro</h1>
          <p className="text-muted-foreground">Technique de concentration</p>
        </div>
        <Button variant="outline" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Timer Display */}
      <Card className={`wellness-card ${sessionInfo.bgColor}`}>
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className={`text-sm font-medium mb-2 ${sessionInfo.color}`}>
              {sessionInfo.label}
            </div>
            <div className="text-6xl font-bold text-foreground mb-4">
              {formatTime(timeLeft)}
            </div>
            <Progress value={progress} className="h-2 mb-4" />
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white px-8"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Démarrer
                </>
              )}
            </Button>
            
            <Button
              onClick={resetTimer}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Session Type Selector */}
          <div className="flex justify-center space-x-2">
            {Object.entries(sessionConfig).map(([type, config]) => (
              <Button
                key={type}
                variant={currentSession === type ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (!isRunning) {
                    setCurrentSession(type as SessionType);
                    setTimeLeft(config.duration);
                  }
                }}
                disabled={isRunning}
                className="text-xs"
              >
                {config.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Timer className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {completedPomodoros}/4
            </div>
            <div className="text-sm text-muted-foreground">Pomodoros du cycle</div>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-wellness-focus/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-6 h-6 bg-wellness-focus rounded-full flex items-center justify-center text-white text-xs font-bold">
                {currentCycle}
              </div>
            </div>
            <div className="text-2xl font-bold text-wellness-focus">
              Cycle {currentCycle}
            </div>
            <div className="text-sm text-muted-foreground">En cours</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Indicators */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle>Progression du cycle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  num <= completedPomodoros
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              onClick={resetAll}
              variant="outline"
              size="sm"
              className="text-muted-foreground"
            >
              Nouveau cycle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="wellness-card bg-gradient-to-br from-wellness-energy/5 to-wellness-focus/5">
        <CardHeader>
          <CardTitle className="text-wellness-focus">📚 Comment utiliser</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 25 minutes de travail concentré</li>
            <li>• 5 minutes de pause courte</li>
            <li>• Après 4 cycles : 15 minutes de pause longue</li>
            <li>• Éliminez toute distraction pendant le travail</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}