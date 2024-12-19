"use client"

import { PostCard } from "@/components/main-layout/PostCard";
import { useUserStore } from "@/store/use-user-store";
import { usePostStore } from "@/store/use-post-store";
import { useEffect } from "react";
import { mockUser } from "@/lib/mock-data";
import ClientLayout from "@/components/main-layout/ClientLayout";
import { CreatePost } from "@/components/main-layout/CreatePost";

export default function HomePage() {
  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.currentUser);
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);

  useEffect(() => {
    if (!currentUser) {
      setUser(mockUser);
    }
    if (posts.length === 0) {
      setPosts([
        {
          id: "1",
          content: "Just launched my new website! Check it out 🚀",
          author: mockUser,
          likes: 42,
          comments: 12,
          shares: 5,
          isLiked: false,
          createdAt: new Date(),
          images: ["/assets/images/and.png"],
        },
        {
          id: "2",
          content: "Working on some exciting new features!",
          author: mockUser,
          likes: 24,
          comments: 8,
          shares: 2,
          isLiked: true,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          images: ["/assets/images/and.png"],
        },
      ]);
    }
  }, [currentUser, setUser, posts.length, setPosts]);

  return (
    <ClientLayout>
      <CreatePost />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </ClientLayout>
  );
}
