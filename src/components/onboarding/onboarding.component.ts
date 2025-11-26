import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingComponent {
  started = output<void>();

  onBegin(): void {
    this.started.emit();
  }
}
