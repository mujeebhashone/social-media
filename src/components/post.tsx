'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PostProps {
  user: {
    name: string
    image: string
    username: string
  }
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
}

export function Post({ user, content, image, timestamp, likes, comments }: PostProps) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-muted-foreground">@{user.username} · {timestamp}</div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-4">
        <p className="text-sm">{content}</p>
        {image && (
          <img
            src={image}
            alt="Post content"
            className="mt-3 rounded-lg w-full object-cover max-h-96"
          />
        )}
      </div>
      <div className="flex justify-between mt-4 pt-4 border-t">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Heart className="h-5 w-5 mr-1" />
          {likes}
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <MessageCircle className="h-5 w-5 mr-1" />
          {comments}
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Share2 className="h-5 w-5 mr-1" />
          Share
        </Button>
      </div>
    </Card>
  )
}
