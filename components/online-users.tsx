"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

interface OnlineUser {
  id: number
  name: string
  profileImage: string
  recentSong: {
    title: string
    artist: string
    url: string
  }
  isOnline: boolean
}

interface OnlineUsersProps {
  onUserChatClick: (user: OnlineUser) => void
}

export function OnlineUsers({ onUserChatClick }: OnlineUsersProps) {
  const [onlineUsers] = useState<OnlineUser[]>([
    {
      id: 1,
      name: "김민수",
      profileImage: "/placeholder.svg?height=60&width=60&text=김민수",
      recentSong: {
        title: "Spring Day",
        artist: "BTS",
        url: "https://www.youtube.com/watch?v=xEeFrLSkMm8",
      },
      isOnline: true,
    },
    {
      id: 2,
      name: "이지은",
      profileImage: "/placeholder.svg?height=60&width=60&text=이지은",
      recentSong: {
        title: "Through the Night",
        artist: "IU",
        url: "https://www.youtube.com/watch?v=BzYnNdJhZQw",
      },
      isOnline: true,
    },
    {
      id: 3,
      name: "박서준",
      profileImage: "/placeholder.svg?height=60&width=60&text=박서준",
      recentSong: {
        title: "Dynamite",
        artist: "BTS",
        url: "https://www.youtube.com/watch?v=gdZLi9oWNZg",
      },
      isOnline: true,
    },
    {
      id: 4,
      name: "최유진",
      profileImage: "/placeholder.svg?height=60&width=60&text=최유진",
      recentSong: {
        title: "LILAC",
        artist: "IU",
        url: "https://www.youtube.com/watch?v=v7bnOxV4jAc",
      },
      isOnline: true,
    },
  ])

  const handleSongClick = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 md:px-6 mb-4">
      {/* 제목을 Card 밖으로 이동 */}
      { /*<h3 className="text-sm font-medium text-gray-700 mb-2">현재 접속중인 유저들</h3>*/}
      <Card className="bg-white p-4 rounded-2xl shadow-sm">
        {/* Card 내부에서 제목과 mb-3 제거 */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {onlineUsers.map((user) => (
            <div key={user.id} className="flex-shrink-0 text-center min-w-[80px]">
              {/* Profile Image */}
              <div className="relative mb-2">
                <button
                  onClick={() => onUserChatClick(user)}
                  className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-green-400 hover:border-green-500 transition-all duration-200 hover:scale-110 transform"
                >
                  <img
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </button>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* User name */}
              <div className="text-xs font-medium text-gray-800 mb-1 truncate">{user.name}</div>

              {/* Recent song */}
              <button
                onClick={() => handleSongClick(user.recentSong.url)}
                className="group text-xs text-gray-600 hover:text-purple-600 transition-colors duration-200 max-w-[80px]"
              >
                <div className="truncate font-medium">{user.recentSong.title}</div>
                <div className="truncate text-gray-500 group-hover:text-purple-500 flex items-center justify-center gap-1">
                  {user.recentSong.artist}
                  <ExternalLink className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
