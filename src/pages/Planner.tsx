import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Clock, Target, CheckCircle, Trash2, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Tâches de suivi pour diabétiques
const diabeticTasks = [
  {
    id: 1,
    title: 'Contrôle glycémie matin',
    description: 'Mesurer la glycémie à jeun',
    priority: 'high',
    category: 'surveillance',
    completed: true,
    time: '07:00'
  },
  {
    id: 2,
    title: 'Prendre médicaments',
    description: 'Metformine 500mg + vitamines',
    priority: 'high',
    category: 'traitement',
    completed: false,
    time: '08:00'
  },
  {
    id: 3,
    title: 'Marche 30 minutes',
    description: 'Activité physique modérée',
    priority: 'medium',
    category: 'exercice',
    completed: false,
    time: '16:00'
  },
  {
    id: 4,
    title: 'Contrôle glycémie soir',
    description: '2h après le dîner',
    priority: 'high',
    category: 'surveillance',
    completed: false,
    time: '20:30'
  },
  {
    id: 5,
    title: 'Noter alimentation',
    description: 'Journal alimentaire quotidien',
    priority: 'medium',
    category: 'nutrition',
    completed: false,
    time: '21:00'
  }
];

const categories = [
  { id: 'surveillance', label: 'Surveillance', color: 'bg-blue-100 text-blue-700', icon: '📊' },
  { id: 'traitement', label: 'Traitement', color: 'bg-green-100 text-green-700', icon: '💊' },
  { id: 'exercice', label: 'Exercice', color: 'bg-purple-100 text-purple-700', icon: '🏃‍♂️' },
  { id: 'nutrition', label: 'Nutrition', color: 'bg-orange-100 text-orange-700', icon: '🥗' }
];

const priorities = {
  high: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
  medium: { label: 'Important', color: 'bg-yellow-100 text-yellow-700' },
  low: { label: 'Optionnel', color: 'bg-gray-100 text-gray-700' }
};

export default function Planner() {
  const [tasks, setTasks] = useState(diabeticTasks);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const toggleTask = (taskId: number) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      toast({
        title: "Tâche complétée ! 🎉",
        description: `Bravo pour avoir complété "${task.title}"`,
      });
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  const filteredTasks = selectedCategory 
    ? tasks.filter(task => task.category === selectedCategory)
    : tasks;

  // Calcul des statistiques de santé
  const surveillanceTasks = tasks.filter(t => t.category === 'surveillance');
  const completedSurveillance = surveillanceTasks.filter(t => t.completed).length;

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
          <h1 className="text-xl font-bold text-blue-700">Suivi Diabète</h1>
          <p className="text-muted-foreground">Votre planning de soins quotidien</p>
        </div>
        <Activity className="w-6 h-6 text-green-500" />
      </div>

      {/* Progress Overview */}
      <Card className="wellness-card bg-gradient-to-br from-blue-50 to-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">Progrès du jour</h3>
              <p className="text-muted-foreground">{completedTasks}/{totalTasks} tâches complétées</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{Math.round(completionPercentage)}%</div>
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mt-1" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/50 p-3 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{completedSurveillance}/{surveillanceTasks.length}</div>
              <div className="text-xs text-muted-foreground">Contrôles glycémie</div>
            </div>
            <div className="bg-white/50 p-3 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {tasks.filter(t => t.category === 'traitement' && t.completed).length}/{tasks.filter(t => t.category === 'traitement').length}
              </div>
              <div className="text-xs text-muted-foreground">Traitements pris</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="rounded-full"
        >
          Toutes les tâches
        </Button>
        {categories.map(({ id, label, icon }) => (
          <Button
            key={id}
            variant={selectedCategory === id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(id)}
            className="rounded-full"
          >
            <span className="mr-1">{icon}</span>
            {label}
          </Button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const category = categories.find(cat => cat.id === task.category);
          const priority = priorities[task.priority as keyof typeof priorities];
          
          return (
            <Card key={task.id} className={`wellness-card transition-all duration-300 ${
              task.completed ? 'opacity-70 border-green-200' : 'hover:shadow-lg'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {task.time && (
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{task.time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                      {task.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      {category && (
                        <Badge className={`${category.color} text-xs`}>
                          <span className="mr-1">{category.icon}</span>
                          {category.label}
                        </Badge>
                      )}
                      <Badge className={`${priority.color} text-xs`}>
                        {priority.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Health Tips */}
      <Card className="wellness-card bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <Target className="w-5 h-5" />
            <span>💡 Conseil santé</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-800">
            Gardez toujours des comprimés de glucose ou des bonbons sur vous en cas d'hypoglycémie. 
            Mesurez votre glycémie régulièrement et notez les résultats pour mieux comprendre vos variations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}