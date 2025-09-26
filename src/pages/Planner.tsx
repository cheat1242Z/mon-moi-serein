import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Calendar, Clock, Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockTasks = [
  {
    id: 1,
    title: 'Méditation matinale',
    description: '10 minutes de méditation',
    priority: 'high',
    category: 'bien-être',
    completed: true,
    time: '08:00'
  },
  {
    id: 2,
    title: 'Réunion projet',
    description: 'Discussion des objectifs Q1',
    priority: 'high',
    category: 'travail',
    completed: false,
    time: '10:00'
  },
  {
    id: 3,
    title: 'Exercice physique',
    description: '30 minutes de course',
    priority: 'medium',
    category: 'santé',
    completed: false,
    time: '18:00'
  },
  {
    id: 4,
    title: 'Lecture du soir',
    description: '20 pages de mon livre actuel',
    priority: 'low',
    category: 'personnel',
    completed: false,
    time: '20:00'
  }
];

const categories = [
  { id: 'travail', label: 'Travail', color: 'bg-blue-100 text-blue-700', icon: '💼' },
  { id: 'santé', label: 'Santé', color: 'bg-green-100 text-green-700', icon: '🏥' },
  { id: 'bien-être', label: 'Bien-être', color: 'bg-purple-100 text-purple-700', icon: '🧘‍♀️' },
  { id: 'personnel', label: 'Personnel', color: 'bg-orange-100 text-orange-700', icon: '📚' }
];

const priorities = {
  high: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
  medium: { label: 'Moyen', color: 'bg-yellow-100 text-yellow-700' },
  low: { label: 'Faible', color: 'bg-gray-100 text-gray-700' }
};

export default function Planner() {
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleTask = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  const filteredTasks = selectedCategory 
    ? tasks.filter(task => task.category === selectedCategory)
    : tasks;

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
          <h1 className="text-xl font-bold">Planificateur</h1>
          <p className="text-muted-foreground">Organisez votre journée</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-light text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle tâche
        </Button>
      </div>

      {/* Progress Overview */}
      <Card className="wellness-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">Progrès du jour</h3>
              <p className="text-muted-foreground">{completedTasks}/{totalTasks} tâches complétées</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{Math.round(completionPercentage)}%</div>
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mt-1" />
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-primary-light h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
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
          Toutes
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
              task.completed ? 'opacity-60' : 'hover:scale-105'
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
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{task.time}</span>
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

      {/* Productivity Tip */}
      <Card className="wellness-card bg-gradient-to-br from-wellness-focus/5 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <Target className="w-5 h-5" />
            <span>💡 Conseil productivité</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Commencez par les tâches les plus importantes le matin quand votre énergie est au maximum. 
            N'hésitez pas à utiliser la technique Pomodoro pour rester concentré.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}