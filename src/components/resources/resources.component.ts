import { Component, ChangeDetectionStrategy, output } from '@angular/core';

interface Resource {
  name: string;
  description: string;
  link: string;
  tags: string[];
}

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesComponent {
  backToDashboard = output<void>();

  resources: Resource[] = [
    {
      name: '988 Suicide & Crisis Lifeline',
      description: '24/7, free and confidential support for people in distress. (US & Canada)',
      link: 'https://988lifeline.org/',
      tags: ['Crisis', 'Global']
    },
    {
      name: 'Vandrevala Foundation',
      description: 'A non-profit organization in India providing free psychological counseling and crisis intervention.',
      link: 'http://www.vandrevalafoundation.com/',
      tags: ['Helpline', 'India']
    },
    {
      name: 'AASRA',
      description: 'A charity in India providing confidential support to people in emotional distress.',
      link: 'http://www.aasra.info/',
      tags: ['Helpline', 'India']
    },
    {
      name: 'Headspace: Mindfulness',
      description: 'Guided meditations, animations, articles and videos for mindfulness and stress relief.',
      link: 'https://www.headspace.com/',
      tags: ['Mindfulness', 'App']
    },
    {
      name: 'Calm',
      description: 'An app for sleep and meditation. Find your calm, and improve your health and happiness.',
      link: 'https://www.calm.com/',
      tags: ['Mindfulness', 'App']
    },
  ];

}