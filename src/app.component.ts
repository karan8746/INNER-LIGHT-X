
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MoodAssessmentComponent } from './components/mood-assessment/mood-assessment.component';
import { ChatComponent } from './components/chat/chat.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { SessionsComponent } from './components/sessions/sessions.component';

export type View = 'auth' | 'dashboard' | 'mood' | 'chat' | 'resources' | 'exercises' | 'sessions';
export type UserType = 'user' | 'consultant' | 'admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AuthComponent,
    DashboardComponent,
    MoodAssessmentComponent,
    ChatComponent,
    ResourcesComponent,
    ExercisesComponent,
    SessionsComponent
  ]
})
export class AppComponent {
  currentView = signal<View>('auth');
  selectedMood = signal<string>('neutral');
  userType = signal<UserType | null>(null);

  onLoggedIn(userType: UserType): void {
    this.userType.set(userType);
    this.currentView.set('dashboard');
  }

  onLoggedOut(): void {
    this.userType.set(null);
    this.currentView.set('auth');
  }

  navigateTo(view: View): void {
    this.currentView.set(view);
  }

  startChatFlow(): void {
    this.currentView.set('mood');
  }

  onMoodSelected(mood: string): void {
    this.selectedMood.set(mood);
    this.currentView.set('chat');
  }
}
