"use client"

import { useState } from "react"
import { mockChats, mockUser } from "@/lib/mock-data"
import { ChatList } from "@/components/messages/chat-list"
import { ChatArea } from "@/components/messages/chat-area"

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

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ChatList
        chats={mockChats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        currentUser={mockUser}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <ChatArea
        chat={selectedChat}
        currentUser={mockUser}
        messageInput={messageInput}
        onMessageChange={setMessageInput}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
} 