"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Star, Share2, Trash2 } from "lucide-react"

interface ChatListPageProps {
  onBack: () => void
}

interface ChatItem {
  id: number
  date: string
  title: string
  artist: string
  reason: string
  thumbnail: string
  isFavorite: boolean
}

export function ChatListPage({ onBack }: ChatListPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [chats, setChats] = useState<ChatItem[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastChatElementRef = useRef<HTMLDivElement | null>(null)

  // 초기 데이터 및 무한 스크롤 데이터 생성 함수
  const generateChats = (pageNum: number, query = "") => {
    const newChats: ChatItem[] = []
    const startId = (pageNum - 1) * 5 + 1
    const endId = startId + 4

    for (let i = startId; i <= endId; i++) {
      if (i > 30) {
        // 최대 30개 아이템으로 제한
        setHasMore(false)
        break
      }

      const chat: ChatItem = {
        id: i,
        date: `2025-06-${15 - (i % 15)}`,
        title: "Love Song",
        artist: "Kenny",
        reason: "행복한 하루를 보냈을 당신에게 오늘 하루 더욱 아름다운 마무리를 선물하고싶어요. 이 노래를...",
        thumbnail: `/placeholder.svg?height=80&width=80&text=Album${i}`,
        isFavorite: i % 3 === 0, // 3의 배수 ID는 즐겨찾기 상태
      }

      // 검색어가 있으면 필터링
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
          }, 500) // 로딩 시뮬레이션

          return nextPage
        })
      }
    })

    if (lastChatElementRef.current) {
      observer.current.observe(lastChatElementRef.current)
    }
  }, [loading, hasMore, searchQuery])

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
          <div className="w-10"></div> {/* 균형을 위한 빈 공간 */}
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
            className="bg-white p-4 rounded-2xl hover:shadow-md transition-shadow duration-300"
            ref={index === chats.length - 1 ? lastChatElementRef : null}
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
                {/* Title and Artist - 한 줄로 표시 */}
                <div className="font-semibold text-gray-800 text-base md:text-lg mb-1 truncate">
                  {chat.title} - {chat.artist}
                </div>

                {/* Date - 더 작고 자연스럽게 */}
                <div className="text-xs text-gray-500 mb-2">{chat.date}</div>

                {/* Reason - 모바일에서 2줄까지 표시 */}
                <div className="text-sm text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-1">{chat.reason}</div>
              </div>

              {/* Action Buttons - 세로 배치로 변경 */}
              <div className="flex flex-col gap-2 md:flex-row md:gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(chat.id)}
                  className={`rounded-full transition-all duration-200 hover:scale-110 w-8 h-8 md:w-10 md:h-10 ${
                    chat.isFavorite ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
                  }`}
                >
                  <Star className="h-4 w-4 md:h-5 md:w-5" fill={chat.isFavorite ? "currentColor" : "none"} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare(chat.id)}
                  className="rounded-full text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110 w-8 h-8 md:w-10 md:h-10"
                >
                  <Share2 className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(chat.id)}
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
    </div>
  )
}
