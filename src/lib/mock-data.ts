import { User, Post } from "@/types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    bio: "Full-stack developer passionate about building beautiful interfaces",
    location: "San Francisco, CA",
    website: "https://github.com/johndoe",
    twitter: "johndoe",
    avatar: "/assets/images/and.png",
    coverImage: "/assets/images/and.png",
    followingCount: 1234,
    followersCount: 5678,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "janesmith",
    bio: "UI/UX Designer | Creating delightful user experiences",
    location: "New York, NY",
    website: "https://dribbble.com/janesmith",
    twitter: "janesmith",
    avatar: "/assets/images/and.png",
    coverImage: "/assets/images/and.png",
    followingCount: 892,
    followersCount: 2341,
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Alex Johnson",
    username: "alexj",
    bio: "Mobile Developer | Coffee Enthusiast ☕",
    location: "London, UK",
    website: "https://alexj.dev",
    twitter: "alexj",
    avatar: "/assets/images/and.png",
    coverImage: "/assets/images/and.png",
    followingCount: 456,
    followersCount: 1234,
    createdAt: new Date(),
  },
]

export const mockUser = mockUsers[0]

export const mockPosts: Post[] = [
  {
    id: "1",
    content: "Just launched my new website! Check it out 🚀",
    author: mockUsers[0],
    likes: 42,
    comments: 12,
    shares: 5,
    isLiked: false,
    createdAt: new Date(),
    images: ["/assets/images/and.png"],
    feeling: {
      emoji: "🎉",
      text: "excited"
    }
  },
  {
    id: "2",
    content: "Working on some exciting new features!",
    author: mockUsers[0],
    likes: 24,
    comments: 8,
    shares: 2,
    isLiked: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    link: {
      url: "https://github.com/features",
      title: "GitHub Features",
      description: "Discover new GitHub features and improvements",
    }
  },
  {
    id: "3",
    content: "Beautiful sunset in New York City 🌅",
    author: mockUsers[1],
    likes: 156,
    comments: 18,
    shares: 12,
    isLiked: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    images: ["/assets/images/and.png", "/assets/images/and.png"],
    feeling: {
      emoji: "😍",
      text: "blessed"
    }
  },
  {
    id: "4",
    content: "Check out this cool animation I made!",
    author: mockUsers[1],
    likes: 89,
    comments: 15,
    shares: 8,
    isLiked: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    videos: ["/assets/images/and.png"],
  },
  {
    id: "5",
    content: "Just published my first npm package 📦",
    author: mockUsers[2],
    likes: 234,
    comments: 45,
    shares: 23,
    isLiked: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    link: {
      url: "https://www.npmjs.com/package/my-package",
      title: "my-package - npm",
      description: "A useful utility package for React applications",
    }
  },
]

export const mockComments = [
  {
    id: "1",
    content: "This looks amazing! 🎉",
    author: mockUsers[1],
    postId: "1",
    likes: 5,
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "2",
    content: "Great work! Can't wait to try it out",
    author: mockUsers[2],
    postId: "1",
    likes: 3,
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
  },
]

export const mockSuggestedUsers = mockUsers.slice(1)

export const mockTrendingTopics = [
  {
    tag: "#Technology",
    postCount: 1543,
  },
  {
    tag: "#Programming",
    postCount: 1232,
  },
  {
    tag: "#WebDev",
    postCount: 986,
  },
  {
    tag: "#React",
    postCount: 876,
  },
  {
    tag: "#Innovation",
    postCount: 654,
  },
]

export const mockChats = [
  {
    id: "1",
    participants: [mockUsers[0], mockUsers[1]],
    messages: [
      {
        id: "1",
        content: "Hey, how's it going?",
        sender: mockUsers[1],
        createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      },
      {
        id: "2",
        content: "I'm good! Just working on some new features. How about you?",
        sender: mockUsers[0],
        createdAt: new Date(Date.now() - 55 * 60 * 1000), // 55 minutes ago
      },
      {
        id: "3",
        content: "That's great! I'd love to see what you're working on 👀",
        sender: mockUsers[1],
        createdAt: new Date(Date.now() - 50 * 60 * 1000), // 50 minutes ago
      },
    ],
    lastMessage: {
      content: "That's great! I'd love to see what you're working on 👀",
      createdAt: new Date(Date.now() - 50 * 60 * 1000),
    },
    unreadCount: 2,
  },
  {
    id: "2",
    participants: [mockUsers[0], mockUsers[2]],
    messages: [
      {
        id: "1",
        content: "Hi! I saw your latest project, it looks amazing!",
        sender: mockUsers[2],
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: "2",
        content: "Thanks! I really enjoyed working on it",
        sender: mockUsers[0],
        createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      },
    ],
    lastMessage: {
      content: "Thanks! I really enjoyed working on it",
      createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    },
    unreadCount: 0,
  },
] 