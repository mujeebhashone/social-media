"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockChats, mockUser } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import { Send, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      content: messageInput.trim(),
      sender: mockUser,
      createdAt: new Date(),
    }

    selectedChat.messages.push(newMessage)
    selectedChat.lastMessage = {
      content: messageInput.trim(),
      createdAt: new Date(),
    }

    setMessageInput("")
  }

  const getOtherParticipant = (chatId: string) => {
    const chat = mockChats.find(c => c.id === chatId)
    return chat?.participants.find(p => p.id !== mockUser.id)
  }

  const filteredChats = mockChats.filter(chat => {
    const otherUser = getOtherParticipant(chat.id)
    if (!otherUser) return false
    
    return (
      otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      otherUser.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Chat List */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b space-y-4">
          <h2 className="font-semibold">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                onClick={() => setSelectedChat(chat)}
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

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden relative">
            <Image
              src={getOtherParticipant(selectedChat.id)?.avatar || ""}
              alt={getOtherParticipant(selectedChat.id)?.name || ""}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{getOtherParticipant(selectedChat.id)?.name}</h3>
            <p className="text-sm text-muted-foreground">
              @{getOtherParticipant(selectedChat.id)?.username}
            </p>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 max-w-[80%]",
                  message.sender.id === mockUser.id ? "ml-auto" : "mr-auto"
                )}
              >
                {message.sender.id !== mockUser.id && (
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
                    message.sender.id === mockUser.id
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
              handleSendMessage()
            }}
          >
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!messageInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 