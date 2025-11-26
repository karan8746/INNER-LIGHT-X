import { Component, ChangeDetectionStrategy, output, input, signal } from '@angular/core';
import { View, UserType } from '../../app.component';

interface ConsultantProfile {
  specialization: string;
  degree: string;
  university: string;
  verificationStatus: 'Pending' | 'Verified' | 'Rejected';
  isFlagged?: boolean;
}

interface ManagedUser {
  email: string;
  role: UserType;
  status: 'Active' | 'Suspended';
  consultantProfile?: ConsultantProfile;
}

interface SessionRating {
  clientId: string;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  userType = input.required<UserType | null>();
  navigate = output<View>();
  startChat = output<void>();
  logout = output<void>();

  managedUsers = signal<ManagedUser[]>([
    { email: 'user_jane@email.com', role: 'user', status: 'Active' },
    { email: 'user_john@email.com', role: 'user', status: 'Suspended' },
    { 
      email: 'consult_drew@email.com', 
      role: 'consultant', 
      status: 'Active',
      consultantProfile: {
        specialization: 'Cognitive Behavioral Therapy',
        degree: 'M.S. in Clinical Psychology',
        university: 'State University',
        verificationStatus: 'Verified',
        isFlagged: false,
      }
    },
    { 
      email: 'consult_new@email.com', 
      role: 'consultant', 
      status: 'Active',
      consultantProfile: {
        specialization: 'Mindfulness & Stress Reduction',
        degree: 'Ph.D. in Counseling Psychology',
        university: 'Tech Institute',
        verificationStatus: 'Pending',
        isFlagged: true,
      }
    },
  ]);

  sessionRatings = signal<SessionRating[]>([
    { clientId: '8A2B4C', rating: 5, comment: 'Luma was incredibly helpful and understanding. The session gave me a lot of clarity.' },
    { clientId: '9F1E3D', rating: 4, comment: 'A very positive experience. The breathing exercise we practiced was very effective.' },
    { clientId: '5G8H7J', rating: 5, comment: 'Felt truly heard. Thank you.' },
  ]);

  toggleUserStatus(user: ManagedUser): void {
    this.managedUsers.update(users => 
      users.map(u => 
        u.email === user.email 
          ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } 
          : u
      )
    );
  }

  updateVerificationStatus(user: ManagedUser, newStatus: 'Verified' | 'Rejected'): void {
    this.managedUsers.update(users =>
      users.map(u =>
        (u.email === user.email && u.consultantProfile)
          ? { ...u, consultantProfile: { ...u.consultantProfile, verificationStatus: newStatus } }
          : u
      )
    );
  }

  toggleFlagStatus(user: ManagedUser): void {
    this.managedUsers.update(users =>
      users.map(u =>
        (u.email === user.email && u.consultantProfile)
          ? { ...u, consultantProfile: { ...u.consultantProfile, isFlagged: !u.consultantProfile.isFlagged } }
          : u
      )
    );
  }
}