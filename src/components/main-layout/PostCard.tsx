"use client"

import { Heart, MessageCircle, Share2, MoreHorizontal, Play } from "lucide-react"
import { Button } from "../ui/button"
import { Post } from "@/types"
import { usePostStore } from "@/store/use-post-store"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const toggleLike = usePostStore((state) => state.toggleLike)
  const removePost = usePostStore((state) => state.removePost)

  // Helper function to safely get array length
  const getLength = (arr: Array<string> | undefined) => arr?.length || 0

  // Calculate total media count
  const totalMediaCount = getLength(post.images) + getLength(post.videos)

  return (
    <div className="bg-card p-4 rounded-xl border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author.username}`}>
            <div className="w-10 h-10 rounded-full overflow-hidden relative">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <div>
            <Link href={`/profile/${post.author.username}`}>
              <h3 className="font-semibold hover:underline">{post.author.name}</h3>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
              {post.feeling && (
                <span>• feeling {post.feeling.emoji} {post.feeling.text}</span>
              )}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => removePost(post.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="mb-4 text-card-foreground">{post.content}</p>

      {totalMediaCount > 0 && (
        <div className={cn(
          "grid gap-2 mb-4",
          totalMediaCount === 1 && "grid-cols-1",
          totalMediaCount === 2 && "grid-cols-2",
          totalMediaCount >= 3 && "grid-cols-2",
        )}>
          {post.images?.map((image, index) => (
            <div 
              key={`image-${index}`}
              className={cn(
                "relative rounded-lg overflow-hidden bg-muted aspect-video",
                totalMediaCount === 3 && index === 0 && "col-span-2"
              )}
            >
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
          
          {post.videos?.map((video, index) => {
            const videoIndex = getLength(post.images) + index
            return (
              <div 
                key={`video-${index}`}
                className={cn(
                  "relative rounded-lg overflow-hidden bg-muted aspect-video",
                  totalMediaCount === 3 && videoIndex === 0 && "col-span-2"
                )}
              >
                <video
                  src={video}
                  className="w-full h-full object-cover"
                  controls
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {post.link && (
        <div className="mb-4 bg-muted rounded-lg p-4">
          <div className="flex gap-4">
            {post.link.image && (
              <div className="w-24 h-24 relative rounded overflow-hidden shrink-0">
                <Image
                  src={post.link.image}
                  alt={post.link.title || "Link preview"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-medium">{post.link.title || "Link Preview"}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.link.description || post.link.url}
              </p>
              <a 
                href={post.link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline mt-1 block"
              >
                {post.link.url}
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:bg-primary/10 hover:text-primary"
          onClick={() => toggleLike(post.id)}
        >
          <Heart
            className={`mr-2 h-4 w-4 ${post.isLiked ? "fill-primary text-primary" : ""}`}
          />
          {post.likes} Like{post.likes !== 1 ? "s" : ""}
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 hover:bg-primary/10">
          <MessageCircle className="mr-2 h-4 w-4" />
          {post.comments} Comment{post.comments !== 1 ? "s" : ""}
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 hover:bg-primary/10">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
} 