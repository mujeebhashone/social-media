"use client"

import { Camera } from "lucide-react"
import { PostCard } from "../main-layout/PostCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { usePostStore } from "@/store/use-post-store"
import { User } from "@/types"
import { useMemo } from "react"

interface ProfileTabsProps {
  user: User;
}

export function ProfileTabs({ user }: ProfileTabsProps) {
  const allPosts = usePostStore((state) => state.posts);
  
  const posts = useMemo(
    () => allPosts.filter(post => post.author.id === user.id),
    [allPosts, user.id]
  );

  const likedPosts = useMemo(
    () => allPosts.filter(post => post.isLiked && post.author.id === user.id),
    [allPosts, user.id]
  );

  const mediaPosts = useMemo(
    () => posts.filter(post => post.images && post.images.length > 0),
    [posts]
  );

  return (
    <div className="w-full border-t">
      <div className="max-w-4xl mx-auto px-4">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-start h-[52px] p-0 bg-transparent rounded-none">
            <TabsTrigger 
              value="posts"
              className="relative h-[52px] px-6 font-medium data-[state=active]:bg-transparent rounded-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary data-[state=active]:after:opacity-100 after:opacity-0"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger 
              value="media"
              className="relative h-[52px] px-6 font-medium data-[state=active]:bg-transparent rounded-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary data-[state=active]:after:opacity-100 after:opacity-0"
            >
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="likes"
              className="relative h-[52px] px-6 font-medium data-[state=active]:bg-transparent rounded-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary data-[state=active]:after:opacity-100 after:opacity-0"
            >
              Likes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6 space-y-4">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No posts yet</p>
            ) : (
              posts.map(post => <PostCard key={post.id} post={post} />)
            )}
          </TabsContent>
          <TabsContent value="media" className="mt-6">
            {mediaPosts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No media posts yet</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {mediaPosts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square rounded-xl bg-muted relative group cursor-pointer overflow-hidden"
                  >
                    {post.images && post.images[0] && (
                      <img
                        src={post.images[0]}
                        alt="Post media"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                    <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="likes" className="mt-6 space-y-4">
            {likedPosts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No liked posts yet</p>
            ) : (
              likedPosts.map(post => <PostCard key={post.id} post={post} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 