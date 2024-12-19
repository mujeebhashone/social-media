"use client"

import { Settings, Camera } from "lucide-react"
import { Button } from "../ui/button"
import { User } from "@/types"
import { useUserStore } from "@/store/use-user-store"
import Image from "next/image"
import { useRef, useState } from "react"
import { EditProfileModal } from "./edit-profile-modal"

interface ProfileHeaderProps {
  user: User;
  isCurrentUser?: boolean;
}

export function ProfileHeader({ user, isCurrentUser }: ProfileHeaderProps) {
  const updateUser = useUserStore((state) => state.updateUser)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleProfilePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateUser({ coverImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditProfile = () => {
    setIsEditModalOpen(true)
  }

  const handleSaveProfile = (userData: Partial<User>) => {
    updateUser(userData)
  }

  return (
    <>
      <div className="relative mb-[120px]">
        {/* Banner */}
        <div className="h-[200px] w-full bg-primary relative">
          <div className="absolute inset-0">
            {user.coverImage && (
              <Image
                src={user.coverImage}
                alt="Cover"
                fill
                className="object-cover"
              />
            )}
          </div>
          {isCurrentUser && (
            <div className="absolute inset-0 hover:bg-black/20 transition-colors">
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverPhotoSelect}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-4 right-4 z-10"
                onClick={() => coverInputRef.current?.click()}
              >
                <Camera className="w-4 h-4 mr-2" />
                Change Cover
              </Button>
            </div>
          )}
        </div>
        
        {/* Profile Info Container */}
        <div className="absolute left-0 right-0 -bottom-[72px]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-end justify-between relative">
              {/* Profile Picture and Name */}
              <div className="flex items-end gap-4">
                <div 
                  className="w-[150px] h-[150px] rounded-full ring-[6px] ring-background bg-black relative z-20 overflow-hidden group"
                  style={{ transform: 'translateY(20px)' }}
                >
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                  {isCurrentUser && (
                    <>
                      <input
                        type="file"
                        ref={profileInputRef}
                        onChange={handleProfilePhotoSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => profileInputRef.current?.click()}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Change
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                <div className="mb-3 z-10">
                  <h1 className="text-[23px] font-bold text-card-foreground leading-7">
                    {user.name}
                  </h1>
                  <p className="text-[15px] text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>

              {/* Edit Profile Button */}
              {isCurrentUser && (
                <div className="mb-3 z-10">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-9 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
                    onClick={handleEditProfile}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isCurrentUser && (
        <EditProfileModal
          user={user}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </>
  )
} 