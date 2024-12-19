"use client"

import { ImageIcon, Link2, Smile, Video, X, Play } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { useUserStore } from "@/store/use-user-store"
import { usePostStore } from "@/store/use-post-store"
import { useState, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


type MediaType = {
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
}

type LinkPreview = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
}

type Feeling = {
  emoji: string;
  text: string;
}

const FEELINGS: Feeling[] = [
  { emoji: "😊", text: "happy" },
  { emoji: "🥰", text: "loved" },
  { emoji: "😢", text: "sad" },
  { emoji: "😴", text: "sleepy" },
  { emoji: "😎", text: "cool" },
  { emoji: "🤔", text: "thinking" },
  { emoji: "😋", text: "hungry" },
  { emoji: "😤", text: "determined" },
  { emoji: "🎮", text: "gaming" },
  { emoji: "📚", text: "studying" },
  { emoji: "💼", text: "working" },
  { emoji: "🎵", text: "listening to music" },
]

export function CreatePost() {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaType[]>([])
  const [linkInput, setLinkInput] = useState("")
  const [linkPreview, setLinkPreview] = useState<LinkPreview | null>(null)
  const [showFeelingModal, setShowFeelingModal] = useState(false)
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const [showLinkInput, setShowLinkInput] = useState(false)

  const currentUser = useUserStore((state) => state.currentUser)
  const addPost = usePostStore((state) => state.addPost)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newMedia: MediaType[] = []
    let loadedCount = 0
    const totalFiles = Math.min(files.length, 4 - selectedMedia.length)

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i]
      const reader = new FileReader()

      reader.onloadend = () => {
        newMedia.push({
          url: reader.result as string,
          type: 'image'
        })
        loadedCount++

        if (loadedCount === totalFiles) {
          setSelectedMedia(prev => [...prev, ...newMedia].slice(0, 4))
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleVideoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || selectedMedia.length >= 4) return

    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert("Video size should be less than 100MB")
      return
    }

    const videoReader = new FileReader()
    videoReader.onloadend = () => {
      // Create video element for thumbnail generation
      const video = document.createElement('video')
      video.src = videoReader.result as string
      
      video.onloadeddata = () => {
        // Create canvas to capture thumbnail
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        
        // Draw the first frame as thumbnail
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        const thumbnail = canvas.toDataURL('image/jpeg')
        
        setSelectedMedia(prev => [...prev, {
          url: videoReader.result as string,
          type: 'video',
          thumbnail
        }])
      }
    }

    videoReader.readAsDataURL(file)
  }

  const removeMedia = (index: number) => {
    setSelectedMedia(prev => prev.filter((_, i) => i !== index))
  }

  const handleLinkAdd = () => {
    if (!linkInput.trim()) return
    
    // Basic URL validation
    try {
      new URL(linkInput)
    } catch {
      alert("Please enter a valid URL")
      return
    }

    // In a real app, you would fetch link preview data from an API
    // For now, we'll create a simple preview
    setLinkPreview({
      url: linkInput,
      title: "Link Preview",
      description: linkInput,
    })
    setLinkInput("")
    setShowLinkInput(false)
  }

  const removeLink = () => {
    setLinkPreview(null)
    setShowLinkInput(false)
  }

  const handleFeelingSelect = (feeling: Feeling) => {
    setSelectedFeeling(feeling)
    setShowFeelingModal(false)
    setContent(prev => {
      const baseContent = selectedFeeling 
        ? prev.replace(`feeling ${selectedFeeling.emoji} ${selectedFeeling.text}`, "").trim()
        : prev
      return `${baseContent} feeling ${feeling.emoji} ${feeling.text}`.trim()
    })
  }

  const handleSubmit = async () => {
    if ((!content.trim() && selectedMedia.length === 0 && !linkPreview) || !currentUser || isSubmitting) return

    setIsSubmitting(true)
    try {
      const newPost = {
        id: Date.now().toString(),
        content: content.trim(),
        author: currentUser,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        createdAt: new Date(),
        images: selectedMedia.filter(m => m.type === 'image').map(m => m.url),
        videos: selectedMedia.filter(m => m.type === 'video').map(m => m.url),
        link: linkPreview || undefined,
        feeling: selectedFeeling || undefined,
      }
      
      addPost(newPost)
      setContent("")
      setSelectedMedia([])
      setLinkPreview(null)
      setSelectedFeeling(null)
    } catch (error) {
      console.error("Failed to create post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!currentUser) return null

  return (
    <>
      <div className="bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-4">
            <Input 
              placeholder={selectedFeeling 
                ? `What's on your mind? Feeling ${selectedFeeling.emoji} ${selectedFeeling.text}` 
                : "What's on your mind?"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-muted/50 focus:bg-muted min-h-[80px] py-2 px-3"
            />

            {selectedMedia.length > 0 && (
              <div className={cn(
                "grid gap-2",
                selectedMedia.length === 1 && "grid-cols-1",
                selectedMedia.length === 2 && "grid-cols-2",
                selectedMedia.length >= 3 && "grid-cols-2",
              )}>
                {selectedMedia.map((media, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "relative rounded-lg overflow-hidden bg-muted aspect-video",
                      selectedMedia.length === 3 && index === 0 && "col-span-2"
                    )}
                  >
                    {media.type === 'image' ? (
                      <Image
                        src={media.url}
                        alt={`Selected media ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <>
                        <Image
                          src={media.thumbnail || ''}
                          alt={`Video thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 h-7 w-7"
                      onClick={() => removeMedia(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {showLinkInput && !linkPreview && (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a link..."
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="bg-muted/50 focus:bg-muted"
                />
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleLinkAdd}
                  disabled={!linkInput.trim()}
                >
                  Add
                </Button>
              </div>
            )}

            {linkPreview && (
              <div className="relative bg-muted rounded-lg p-4">
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={removeLink}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="flex gap-4">
                  {linkPreview.image && (
                    <div className="w-24 h-24 relative rounded overflow-hidden shrink-0">
                      <Image
                        src={linkPreview.image}
                        alt={linkPreview.title || "Link preview"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{linkPreview.title || "Link Preview"}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {linkPreview.description || linkPreview.url}
                    </p>
                    <a 
                      href={linkPreview.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-1 block"
                    >
                      {linkPreview.url}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              multiple
              className="hidden"
            />
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideoSelect}
              accept="video/*"
              className="hidden"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10"
              onClick={() => imageInputRef.current?.click()}
              disabled={selectedMedia.length >= 4}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Photo
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10"
              onClick={() => videoInputRef.current?.click()}
              disabled={selectedMedia.length >= 4}
            >
              <Video className="mr-2 h-4 w-4" />
              Video
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10"
              onClick={() => setShowLinkInput(true)}
              disabled={linkPreview !== null || showLinkInput}
            >
              <Link2 className="mr-2 h-4 w-4" />
              Link
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10"
              onClick={() => setShowFeelingModal(true)}
            >
              <Smile className="mr-2 h-4 w-4" />
              Feeling
            </Button>
          </div>
          <Button 
            size="sm" 
            onClick={handleSubmit}
            disabled={(!content.trim() && selectedMedia.length === 0 && !linkPreview) || isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>

      {/* Feeling Modal */}
      <Dialog open={showFeelingModal} onOpenChange={setShowFeelingModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>How are you feeling?</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-2 py-4">
            {FEELINGS.map((feeling) => (
              <Button
                key={feeling.text}
                variant="ghost"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleFeelingSelect(feeling)}
              >
                <span className="text-2xl">{feeling.emoji}</span>
                <span className="text-xs capitalize">{feeling.text}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 