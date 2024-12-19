import { Button } from "../ui/button"
import { UserPlus } from "lucide-react"

const SUGGESTED_FRIENDS = [
  { name: "Jane Smith", mutualFriends: 5 },
  { name: "Alex Johnson", mutualFriends: 3 },
  { name: "Sarah Wilson", mutualFriends: 7 },
]

export function RightSidebar() {
  return (
    <div className="hidden lg:block w-80 space-y-4">
      <div className="bg-card p-4 rounded-xl border shadow-sm">
        <h2 className="font-semibold mb-4 text-card-foreground">Suggested Friends</h2>
        <div className="space-y-4">
          {SUGGESTED_FRIENDS.map((friend) => (
            <div key={friend.name} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/30" />
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground">{friend.name}</h3>
                <p className="text-sm text-muted-foreground">{friend.mutualFriends} mutual friends</p>
              </div>
              <Button size="sm" variant="ghost" className="hover:bg-primary/10">
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card p-4 rounded-xl border shadow-sm">
        <h2 className="font-semibold mb-4 text-card-foreground">Trending Topics</h2>
        <div className="space-y-3">
          {["#Technology", "#Travel", "#Food", "#Fashion"].map((topic) => (
            <div key={topic} className="text-sm">
              <p className="font-medium text-primary hover:underline cursor-pointer">
                {topic}
              </p>
              <p className="text-muted-foreground">1.5K posts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 