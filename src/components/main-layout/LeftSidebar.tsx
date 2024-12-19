"use client"

import { Home, MessageCircle, User } from 'lucide-react'
import { Button } from "../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function LeftSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:block w-64 space-y-2">
      <Link href="/">
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          data-active={pathname === "/"}
        >
          <Home className="mr-2 h-5 w-5" />
          Home
        </Button>
      </Link>
      <Link href="/profile">
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          data-active={pathname === "/profile"}
        >
          <User className="mr-2 h-5 w-5" />
          Profile
        </Button>
      </Link>
      <Link href="/messages">
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          data-active={pathname === "/messages"}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Messages
        </Button>
      </Link>
    </div>
  )
} 