import { Component, ChangeDetectionStrategy, output } from '@angular/core';

interface Exercise {
  name: string;
  description: string;
  duration: string;
}

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesComponent {
  backToDashboard = output<void>();

  exercises: Exercise[] = [
    {
      name: 'Box Breathing',
      description: 'A simple technique to calm your nervous system. Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s.',
      duration: '5 min'
    },
    {
      name: 'Mindful Observation',
      description: 'Choose an object and observe it for a few minutes. Notice its color, texture, and shape without judgment.',
      duration: '3 min'
    },
    {
      name: '5-4-3-2-1 Grounding',
      description: 'Name 5 things you see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.',
      duration: '5 min'
    },
    {
      name: 'Gratitude Journaling',
      description: 'Write down three things you are grateful for today, no matter how small they seem.',
      duration: '5 min'
    }
  ];
}