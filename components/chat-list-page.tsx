"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Star, Share2, Trash2 } from "lucide-react"
import { ChatDetailModal } from "./chat-detail-modal"

interface ChatListPageProps {
  onBack: () => void
}

interface ChatItem {
  id: number
  date: string
  title: string
  artist: string
  reason: string
  encouragement: string
  thumbnail: string
  youtubeUrl: string
  isFavorite: boolean
}

export function ChatListPage({ onBack }: ChatListPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [chats, setChats] = useState<ChatItem[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null)
  const [showChatDetail, setShowChatDetail] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastChatElementRef = useRef<HTMLDivElement | null>(null)

  // 초기 데이터 및 무한 스크롤 데이터 생성 함수
  const generateChats = (pageNum: number, query = "") => {
    const newChats: ChatItem[] = []
    const startId = (pageNum - 1) * 5 + 1
    const endId = startId + 4

    const musicData = [
      {
        title: "Spring Day",
        artist: "BTS",
        youtubeUrl: "https://www.youtube.com/watch?v=xEeFrLSkMm8",
        reason: "그리움과 희망이 공존하는 감성적인 멜로디로, 힘든 시간을 견뎌내는 당신에게 위로와 용기를 전해줍니다.",
        encouragement:
          "추운 겨울이 지나면 따뜻한 봄이 오듯이, 지금의 어려움도 반드시 지나갈 거예요. 당신의 봄날이 곧 올 거라 믿어요!",
      },
      {
        title: "Through the Night",
        artist: "IU",
        youtubeUrl: "https://www.youtube.com/watch?v=BzYnNdJhZQw",
        reason:
          "잔잔하고 따뜻한 멜로디가 마음을 편안하게 해주며, 소중한 사람을 생각하는 마음을 아름답게 표현한 곡입니다.",
        encouragement: "오늘 하루도 수고 많으셨어요. 밤하늘의 별처럼 당신도 누군가에게 소중한 빛이 되고 있답니다.",
      },
      {
        title: "Dynamite",
        artist: "BTS",
        youtubeUrl: "https://www.youtube.com/watch?v=gdZLi9oWNZg",
        reason: "밝고 경쾌한 리듬으로 에너지를 충전해주는 곡입니다. 힘들고 지친 일상에 활력을 불어넣어 줍니다.",
        encouragement:
          "당신 안에 숨어있는 다이너마이트 같은 에너지를 발산해보세요! 오늘도 빛나는 하루 만들어가시길 응원합니다!",
      },
      {
        title: "LILAC",
        artist: "IU",
        youtubeUrl: "https://www.youtube.com/watch?v=v7bnOxV4jAc",
        reason: "성숙하고 세련된 멜로디로 인생의 새로운 시작을 응원하는 곡입니다.",
        encouragement: "새로운 시작은 언제나 설레고 두렵지만, 당신이라면 충분히 해낼 수 있어요!",
      },
      {
        title: "Life Goes On",
        artist: "BTS",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        reason: "어려운 시기에도 삶은 계속된다는 메시지를 담은 위로의 곡입니다.",
        encouragement: "힘든 시간이 와도 삶은 계속 흘러갑니다. 당신의 삶도 아름답게 계속될 거예요.",
      },
    ]

    for (let i = startId; i <= endId; i++) {
      if (i > 30) {
        setHasMore(false)
        break
      }

      const musicIndex = (i - 1) % musicData.length
      const music = musicData[musicIndex]

      const chat: ChatItem = {
        id: i,
        date: `2025-06-${15 - (i % 15)}`,
        title: music.title,
        artist: music.artist,
        reason: music.reason,
        encouragement: music.encouragement,
        thumbnail: `/placeholder.svg?height=80&width=80&text=Album${i}`,
        youtubeUrl: music.youtubeUrl,
        isFavorite: i % 3 === 0,
      }

      if (
        !query ||
        chat.title.toLowerCase().includes(query.toLowerCase()) ||
        chat.artist.toLowerCase().includes(query.toLowerCase())
      ) {
        newChats.push(chat)
      }
    }

    return newChats
  }

  // 초기 데이터 로드
  useEffect(() => {
    setLoading(true)
    const initialChats = generateChats(1, searchQuery)
    setChats(initialChats)
    setLoading(false)
  }, [])

  // 검색 기능
  const handleSearch = () => {
    setPage(1)
    setHasMore(true)
    setChats(generateChats(1, searchQuery))
  }

  // 무한 스크롤 구현
  useEffect(() => {
    if (loading) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => {
          const nextPage = prevPage + 1
          setLoading(true)

          setTimeout(() => {
            setChats((prevChats) => [...prevChats, ...generateChats(nextPage, searchQuery)])
            setLoading(false)
          }, 500)

          return nextPage
        })
      }
    })

    if (lastChatElementRef.current) {
      observer.current.observe(lastChatElementRef.current)
    }
  }, [loading, hasMore, searchQuery])

  // 채팅 클릭 핸들러
  const handleChatClick = (chat: ChatItem) => {
    setSelectedChat(chat)
    setShowChatDetail(true)
  }

  // 즐겨찾기 토글
  const toggleFavorite = (id: number) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === id ? { ...chat, isFavorite: !chat.isFavorite } : chat)),
    )
  }

  // 공유 기능
  const handleShare = (id: number) => {
    console.log(`공유: 채팅 ID ${id}`)
  }

  // 삭제 기능
  const handleDelete = (id: number) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6">
        <header className="flex justify-between items-center py-4 md:py-6">
          <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100 transition-colors duration-200">
            <ArrowLeft className="h-5 w-5 mr-2" />
            뒤로가기
          </Button>
          <div className="text-2xl font-bold text-black">모든 채팅 리스트</div>
          <div className="w-10"></div>
        </header>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 mb-6">
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="노래 제목 또는 가수 검색..."
            className="flex-1 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-full"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            className="bg-white hover:bg-gray-100 text-gray-800 rounded-full transition-all duration-300 ease-in-out hover:scale-105 transform"
          >
            <Search className="h-5 w-5" />
            <span className="ml-2">검색</span>
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 pb-8 space-y-4">
        {chats.map((chat, index) => (
          <Card
            key={chat.id}
            className="bg-white p-4 rounded-2xl hover:shadow-md transition-shadow duration-300 cursor-pointer"
            ref={index === chats.length - 1 ? lastChatElementRef : null}
            onClick={() => handleChatClick(chat)}
          >
            <div className="flex items-start gap-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <img
                  src={chat.thumbnail || "/placeholder.svg"}
                  alt={`${chat.title} thumbnail`}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800 text-base md:text-lg mb-1 truncate">
                  {chat.title} - {chat.artist}
                </div>
                <div className="text-xs text-gray-500 mb-2">{chat.date}</div>
                <div className="text-sm text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-1">
                  {chat.reason.substring(0, 100)}...
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 md:flex-row md:gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(chat.id)
                  }}
                  className={`rounded-full transition-all duration-200 hover:scale-110 w-8 h-8 md:w-10 md:h-10 ${
                    chat.isFavorite ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
                  }`}
                >
                  <Star className="h-4 w-4 md:h-5 md:w-5" fill={chat.isFavorite ? "currentColor" : "none"} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShare(chat.id)
                  }}
                  className="rounded-full text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110 w-8 h-8 md:w-10 md:h-10"
                >
                  <Share2 className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(chat.id)
                  }}
                  className="rounded-full text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110 w-8 h-8 md:w-10 md:h-10"
                >
                  <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="text-center py-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-500">불러오는 중...</p>
          </div>
        )}

        {/* No results */}
        {!loading && chats.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}

        {/* End of results */}
        {!hasMore && chats.length > 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">모든 채팅을 불러왔습니다.</p>
          </div>
        )}
      </div>

      {/* Chat Detail Modal */}
      {showChatDetail && selectedChat && (
        <ChatDetailModal chat={selectedChat} onClose={() => setShowChatDetail(false)} />
      )}
    </div>
  )
}
