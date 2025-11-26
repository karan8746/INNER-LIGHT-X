import { Component, ChangeDetectionStrategy, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'failed';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsComponent {
  backToDashboard = output<void>();

  // State for scheduled sessions
  submitted = signal(false);

  // State for immediate connection
  connectionStatus = signal<ConnectionStatus>('idle');

  // --- Methods for Immediate Connection ---
  connectNow(): void {
    this.connectionStatus.set('connecting');
    // Simulate network delay and finding a consultant
    setTimeout(() => {
      // Simulate a 50/50 chance of finding someone
      if (Math.random() > 0.5) {
        this.connectionStatus.set('connected');
      } else {
        this.connectionStatus.set('failed');
      }
    }, 3000); 
  }

  resetConnection(): void {
    this.connectionStatus.set('idle');
  }

  // --- Methods for Scheduled Sessions ---
  requestSession(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);
  }

  bookAnother(): void {
    this.submitted.set(false);
  }
}
