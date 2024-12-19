export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  twitter: string;
  avatar: string;
  coverImage: string;
  followingCount: number;
  followersCount: number;
  createdAt: Date;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  createdAt: Date;
  images?: string[];
  videos?: string[];
  link?: {
    url: string;
    title?: string;
    description?: string;
    image?: string;
  };
  feeling?: {
    emoji: string;
    text: string;
  };
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  likes: number;
  createdAt: Date;
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  postId: string;
  createdAt: Date;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: {
    id: string;
    content: string;
    sender: User;
    createdAt: Date;
  }[];
  lastMessage: {
    content: string;
    createdAt: Date;
  };
  unreadCount: number;
} 