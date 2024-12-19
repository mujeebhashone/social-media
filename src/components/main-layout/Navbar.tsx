import { Bell, MessageCircle, Search, User } from 'lucide-react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ThemeToggle } from '../theme/theme-toggle'
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-background to-background/80 backdrop-blur-sm border-b z-50">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              SocialApp
            </h1>
          </Link>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 w-[300px] bg-muted/50 focus:bg-muted"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="hover:bg-muted/50">
            <Bell className="h-5 w-5" />
          </Button>
          <Link href="/messages">
            <Button variant="ghost" size="icon" className="hover:bg-muted/50">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="hover:bg-muted/50">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
} 