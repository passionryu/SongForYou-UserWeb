"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, ThumbsUp, ThumbsDown, ExternalLink, Instagram, Share2, Trash2 } from "lucide-react"

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

interface ChatMessage {
  id: number
  text: string
  sender: "user" | "bot"
}

interface ChatDetailModalProps {
  chat: ChatItem
  onClose: () => void
}

export function ChatDetailModal({ chat, onClose }: ChatDetailModalProps) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  // 해당 채팅의 대화 내용 (시뮬레이션)
  const [chatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "안녕하세요! 오늘 기분이 어떠신가요?",
      sender: "bot",
    },
    {
      id: 2,
      text: "안녕하세요! 오늘은 조금 우울한 기분이에요. 힘든 일이 있었거든요.",
      sender: "user",
    },
    {
      id: 3,
      text: "힘든 일이 있으셨군요. 그런 날에는 마음을 위로해줄 수 있는 음악이 도움이 될 것 같아요. 어떤 장르의 음악을 평소에 좋아하시나요?",
      sender: "bot",
    },
    {
      id: 4,
      text: "평소에는 발라드나 잔잔한 음악을 좋아해요. 마음이 편안해지는 그런 음악이요.",
      sender: "user",
    },
    {
      id: 5,
      text: "좋은 선택이네요! 발라드는 정말 마음을 달래주는 힘이 있죠. 혹시 특별히 좋아하는 가수나 아티스트가 있으신가요?",
      sender: "bot",
    },
    {
      id: 6,
      text: "IU나 BTS 같은 아티스트들의 음악을 자주 들어요. 특히 감성적인 곡들을 좋아합니다.",
      sender: "user",
    },
    {
      id: 7,
      text: "훌륭한 취향이시네요! 그렇다면 당신의 현재 기분과 음악 취향을 고려해서 완벽한 곡을 추천해드릴게요. 잠시만 기다려주세요...",
      sender: "bot",
    },
    {
      id: 8,
      text: `완벽한 곡을 찾았어요! "${chat.title}" - ${chat.artist} 이 곡을 추천드립니다. ${chat.reason.substring(0, 100)}...`,
      sender: "bot",
    },
    {
      id: 9,
      text: "와, 정말 좋은 추천이네요! 이 곡 정말 좋아해요. 감사합니다!",
      sender: "user",
    },
    {
      id: 10,
      text: `${chat.encouragement}`,
      sender: "bot",
    },
  ])

  const handleLike = () => {
    setLiked(!liked)
    setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked(!disliked)
    setLiked(false)
  }

  const handleRemoveFromStorage = () => {
    alert(`"${chat.title} - ${chat.artist}"이(가) 보관함에서 제거되었습니다.`)
  }

  const handleYoutubeOpen = () => {
    window.open(chat.youtubeUrl, "_blank")
  }

  const handleInstagramShare = () => {
    console.log("인스타그램 스토리 공유")
  }

  const handleLinkShare = () => {
    console.log("링크 공유")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto transform transition-all duration-300 ease-out max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">채팅 상세보기</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors duration-200 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Music Information Section */}
          <div className="p-6 border-b border-gray-100">
            <Card className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  <img
                    src={chat.thumbnail || "/placeholder.svg"}
                    alt={`${chat.title} thumbnail`}
                    className="w-48 h-48 rounded-xl object-cover shadow-md mx-auto lg:mx-0"
                  />
                </div>

                {/* Music Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Title : {chat.title}</h3>
                    <p className="text-lg text-gray-700 mb-3">Artist : {chat.artist}</p>
                    <p className="text-sm text-gray-500 mb-4">추천 날짜 : {chat.date}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-medium">추천 사유 : </span>
                      {chat.reason}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-medium">응원 메시지 : </span>
                      {chat.encouragement || "오늘도 좋은 하루 되세요! 음악과 함께 힘내시길 바라요 🎵"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row lg:flex-col gap-4 lg:gap-3 w-full lg:w-28">
                  {/* 1번 묶음: 좋아요/싫어요/Youtube 이동 */}
                  <div className="flex flex-col gap-3 flex-1 lg:flex-none lg:w-full">
                    {/* 좋아요/싫어요 버튼 */}
                    <div className="flex gap-2 lg:gap-5 justify-center lg:justify-start">
                      <Button
                        variant="outline"
                        onClick={handleLike}
                        className={`w-12 h-12 p-0 rounded-xl transition-all duration-200 hover:scale-105 ${
                          liked ? "bg-blue-100 border-blue-300" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <ThumbsUp className={`h-5 w-5 ${liked ? "text-blue-600" : "text-gray-700"}`} />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleDislike}
                        className={`w-12 h-12 p-0 rounded-xl transition-all duration-200 hover:scale-105 ${
                          disliked ? "bg-red-100 border-red-300" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <ThumbsDown className={`h-5 w-5 ${disliked ? "text-red-600" : "text-gray-700"}`} />
                      </Button>
                    </div>

                    {/* Youtube 이동 버튼 */}
                    <Button
                      variant="outline"
                      onClick={handleYoutubeOpen}
                      className="w-full h-12 bg-white hover:bg-red-50 hover:border-red-300 rounded-xl transition-all duration-200 hover:scale-105 text-sm font-medium text-gray-700 hover:text-red-600 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Youtube
                    </Button>
                  </div>

                  {/* 2번 묶음: 공유 버튼들/보관함에서 제거 */}
                  <div className="flex flex-col gap-3 flex-1 lg:flex-none lg:w-full">
                    {/* 인스타그램/링크 공유 버튼 */}
                    <div className="flex gap-2 lg:gap-5 justify-center lg:justify-start">
                      <Button
                        variant="outline"
                        onClick={handleInstagramShare}
                        className="w-12 h-12 p-0 bg-white hover:bg-pink-50 hover:border-pink-300 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <Instagram className="h-5 w-5 text-gray-700" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleLinkShare}
                        className="w-12 h-12 p-0 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <Share2 className="h-5 w-5 text-gray-700" />
                      </Button>
                    </div>

                    {/* 보관함에서 제거 버튼 */}
                    <Button
                      variant="outline"
                      onClick={handleRemoveFromStorage}
                      className="w-full h-12 rounded-xl transition-all duration-200 hover:scale-105 text-sm font-medium bg-white hover:bg-red-50 hover:border-red-300 text-gray-700 hover:text-red-600 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      채팅기록 삭제
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Messages Section */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">AI 음악 매니저와의 대화 내용</h3>
            <div className="bg-gray-100 rounded-lg p-4 max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-xs md:max-w-md lg:max-w-lg">
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          msg.sender === "user" ? "bg-purple-600 text-white" : "bg-white text-gray-800 shadow-sm border"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div
                        className={`text-xs text-gray-500 mt-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                      >
                        {msg.sender === "user" ? "나" : "AI 음악 매니저"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
