"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { User, Chat } from "@/types"

type Message = {
  id: string;
  content: string;
  sender: User;
  createdAt: Date;
}

interface ChatAreaProps {
  chat: Chat
  currentUser: User
  messageInput: string
  onMessageChange: (message: string) => void
  onSendMessage: () => void
}

export function ChatArea({
  chat,
  currentUser,
  messageInput,
  onMessageChange,
  onSendMessage,
}: ChatAreaProps) {
  const getOtherParticipant = () => {
    return chat.participants.find((p: User) => p.id !== currentUser.id)
  }

  const otherUser = getOtherParticipant()

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden relative">
          <Image
            src={otherUser?.avatar || ""}
            alt={otherUser?.name || ""}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{otherUser?.name}</h3>
          <p className="text-sm text-muted-foreground">
            @{otherUser?.username}
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chat.messages.map((message: Message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                message.sender.id === currentUser.id ? "ml-auto" : "mr-auto"
              )}
            >
              {message.sender.id !== currentUser.id && (
                <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
                  <Image
                    src={message.sender.avatar}
                    alt={message.sender.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div
                className={cn(
                  "rounded-2xl p-3",
                  message.sender.id === currentUser.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {formatDistanceToNow(message.createdAt, { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            onSendMessage()
          }}
        >
          <Input
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => onMessageChange(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!messageInput.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
} 