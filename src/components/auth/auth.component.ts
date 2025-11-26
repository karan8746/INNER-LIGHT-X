import { Component, ChangeDetectionStrategy, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserType } from '../../app.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  loggedIn = output<UserType>();

  isLoginView = signal(true);
  userType = signal<UserType>('user');

  toggleView(): void {
    this.isLoginView.update(v => !v);
  }

  // Mock login/signup function
  submit(): void {
    this.loggedIn.emit(this.userType());
  }
}