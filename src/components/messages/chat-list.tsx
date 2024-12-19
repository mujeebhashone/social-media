"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { User, Chat } from "@/types"

interface ChatListProps {
  chats: Chat[]
  selectedChat: Chat
  onSelectChat: (chat: Chat) => void
  currentUser: User
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ChatList({
  chats,
  selectedChat,
  onSelectChat,
  currentUser,
  searchQuery,
  onSearchChange,
}: ChatListProps) {
  const getOtherParticipant = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId)
    return chat?.participants.find(p => p.id !== currentUser.id)
  }

  const filteredChats = chats.filter(chat => {
    const otherUser = getOtherParticipant(chat.id)
    if (!otherUser) return false
    
    return (
      otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      otherUser.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="w-80 border-r flex flex-col">
      <div className="p-4 border-b space-y-4">
        <h2 className="font-semibold">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredChats.map((chat) => {
          const otherUser = getOtherParticipant(chat.id)
          if (!otherUser) return null

          return (
            <button
              key={chat.id}
              className={cn(
                "w-full p-4 flex gap-3 hover:bg-muted/50 transition-colors",
                selectedChat.id === chat.id && "bg-muted"
              )}
              onClick={() => onSelectChat(chat)}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
                <Image
                  src={otherUser.avatar}
                  alt={otherUser.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{otherUser.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(chat.lastMessage.createdAt, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage.content}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {chat.unreadCount}
                </div>
              )}
            </button>
          )
        })}
      </ScrollArea>
    </div>
  )
} 