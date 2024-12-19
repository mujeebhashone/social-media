'use client'

import { CreatePost } from "./create-post"
import { Post } from "./post"

const DUMMY_POSTS = [
  {
    user: {
      name: "John Doe",
      image: "/placeholder-user.jpg",
      username: "johndoe",
    },
    content: "Just launched my new portfolio website! Check it out 🚀",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    timestamp: "2h ago",
    likes: 120,
    comments: 14,
  },
  {
    user: {
      name: "Jane Smith",
      image: "/placeholder-user.jpg",
      username: "janesmith",
    },
    content: "Beautiful sunset today! 🌅",
    image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869",
    timestamp: "4h ago",
    likes: 89,
    comments: 5,
  },
]

export function Feed() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <CreatePost />
      {DUMMY_POSTS.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  )
}
