"use client"

import ClientLayout from "@/components/main-layout/ClientLayout"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileInfo } from "@/components/profile/profile-info"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { mockUser } from "@/lib/mock-data"
import { useUserStore } from "@/store/use-user-store"
import { useEffect } from "react"

export default function ProfilePage() {
  const setUser = useUserStore((state) => state.setUser)
  const currentUser = useUserStore((state) => state.currentUser)

  useEffect(() => {
    if (!currentUser) {
      setUser(mockUser)
    }
  }, [currentUser, setUser])

  if (!currentUser) return null

  return (
    <ClientLayout>
      <div className="space-y-6">
        <ProfileHeader user={currentUser} isCurrentUser={true} />
        <ProfileInfo user={currentUser} />
        <ProfileTabs user={currentUser} />
      </div>
    </ClientLayout>
  )
} 