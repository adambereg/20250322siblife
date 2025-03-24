export interface ClanMember {
  _id: string;
  name: string;
  avatar?: string;
  role: 'leader' | 'moderator' | 'member';
  joinDate: string;
}

export interface ClanActivity {
  _id: string;
  type: 'post' | 'event' | 'member_joined' | 'change';
  title?: string;
  content?: string;
  author?: {
    _id: string;
    name: string;
    avatar?: string;
  };
  date: string;
  comments?: Array<{
    _id: string;
    content: string;
    author: {
      _id: string;
      name: string;
      avatar?: string;
    };
    date: string;
  }>;
  likes?: number;
  images?: string[];
}

export interface MembershipRequest {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ClanEvent {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime?: string;
  maxParticipants?: number;
  participants: string[];
  tags: string[];
  image?: string;
  clanId: string;
  organizer: {
    _id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Clan {
  _id: string;
  name: string;
  description: string;
  logo?: string;
  type: 'open' | 'closed';
  leader: {
    _id: string;
    name: string;
    avatar?: string;
  };
  members: ClanMember[];
  rating: number;
  status: 'active' | 'inactive' | 'archived';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  activity: ClanActivity[];
  membershipRequests?: MembershipRequest[];
  events?: ClanEvent[];
} 