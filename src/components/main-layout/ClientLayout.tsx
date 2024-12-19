import React from 'react'
import { Navbar } from './Navbar'
import { LeftSidebar } from './LeftSidebar'
import { RightSidebar } from './RightSidebar'


const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <div className="pt-16 max-w-7xl mx-auto">
        <div className="flex gap-4 p-4">
          <LeftSidebar />

          {/* Main Feed */}
          <div className="flex-1 space-y-4">
            {/* <CreatePost /> */}
            
            {/* Posts Feed */}
            <div className="space-y-4">
              {children}
            </div>
          </div>

          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default ClientLayout