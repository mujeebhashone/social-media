import { Link, MapPin, Twitter } from "lucide-react"
import { User } from "@/types"

interface ProfileInfoProps {
  user: User;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-3">
        <p className="text-[15px] text-card-foreground leading-5">
          {user.bio}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-[14px]">
          {user.location && (
            <span className="flex items-center hover:text-primary/90 transition-colors">
              <MapPin className="w-[18px] h-[18px] mr-1" />
              {user.location}
            </span>
          )}
          {user.website && (
            <a 
              href={user.website}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary/90 transition-colors"
            >
              <Link className="w-[18px] h-[18px] mr-1" />
              {user.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {user.twitter && (
            <a 
              href={`https://twitter.com/${user.twitter}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary/90 transition-colors"
            >
              <Twitter className="w-[18px] h-[18px] mr-1" />
              @{user.twitter}
            </a>
          )}
        </div>
        <div className="flex gap-5 text-[14px] mt-1">
          <span>
            <strong className="text-card-foreground font-medium">
              {user.followingCount.toLocaleString()}
            </strong>{" "}
            <span className="text-muted-foreground">Following</span>
          </span>
          <span>
            <strong className="text-card-foreground font-medium">
              {user.followersCount.toLocaleString()}
            </strong>{" "}
            <span className="text-muted-foreground">Followers</span>
          </span>
        </div>
      </div>
    </div>
  )
} 