import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  { id: 'travail', label: 'Travail', icon: '💼' },
  { id: 'santé', label: 'Santé', icon: '🏥' },
  { id: 'bien-être', label: 'Bien-être', icon: '🧘‍♀️' },
  { id: 'personnel', label: 'Personnel', icon: '📚' }
];

const priorities = [
  { id: 'high', label: 'Urgent' },
  { id: 'medium', label: 'Moyen' },
  { id: 'low', label: 'Faible' }
];

export default function TaskEntry() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');

  const handleSave = () => {
    if (!title.trim() || !category || !priority) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      time,
      category,
      priority,
      completed: false
    };

    // Get existing tasks from localStorage
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    navigate('/dashboard/planner');
  };

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
          <h1 className="text-xl font-bold">Nouvelle Tâche</h1>
          <p className="text-muted-foreground">Planifiez votre journée</p>
        </div>
      </div>

      {/* Task Form */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle>Créer une tâche</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Titre de la tâche *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Méditation matinale"
              className="bg-input border-border"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre tâche..."
              className="bg-input border-border"
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Heure prévue</label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-input border-border"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Catégorie *</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Choisissez une catégorie" />
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

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Priorité *</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Choisissez une priorité" />
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

          {/* Save Button */}
          <Button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-primary to-primary-light text-white"
            disabled={!title.trim() || !category || !priority}
          >
            <Save className="w-4 h-4 mr-2" />
            Créer la tâche
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}