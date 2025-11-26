import { Component, ChangeDetectionStrategy, output } from '@angular/core';

interface Mood {
  name: string;
  emoji: string;
}

@Component({
  selector: 'app-mood-assessment',
  templateUrl: './mood-assessment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoodAssessmentComponent {
  moodSelected = output<string>();

  moods: Mood[] = [
    { name: 'Happy', emoji: '😊' },
    { name: 'Calm', emoji: '😌' },
    { name: 'Okay', emoji: '😐' },
    { name: 'Anxious', emoji: '😟' },
    { name: 'Sad', emoji: '😢' },
    { name: 'Overwhelmed', emoji: '😵' },
  ];

  selectMood(moodName: string): void {
    this.moodSelected.emit(moodName.toLowerCase());
  }
}
