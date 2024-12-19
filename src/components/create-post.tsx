'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, SmileIcon, VideoIcon } from "lucide-react"

export function CreatePost() {
  return (
    <Card className="p-4">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <Textarea
            className="resize-none"
            placeholder="What's on your mind?"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-5 w-5 text-blue-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <VideoIcon className="h-5 w-5 text-green-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <SmileIcon className="h-5 w-5 text-yellow-500" />
              </Button>
            </div>
            <Button>Post</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
