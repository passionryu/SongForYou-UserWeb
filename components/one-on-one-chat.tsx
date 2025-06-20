"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send } from "lucide-react"

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

interface OneOnOneChatProps {
  user: OnlineUser
  onBack: () => void
}

interface ChatMessage {
  id: number
  text: string
  sender: "me" | "other"
  timestamp: string
}

export function OneOnOneChat({ user, onBack }: OneOnOneChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: `안녕하세요! ${user.name}님과의 채팅을 시작합니다.`,
      sender: "other",
      timestamp: "오후 2:30",
    },
    {
      id: 2,
      text: "안녕하세요! 반가워요 😊",
      sender: "me",
      timestamp: "오후 2:31",
    },
    {
      id: 3,
      text: `최근에 ${user.recentSong.title} 추천받으셨더라구요! 어떠셨나요?`,
      sender: "other",
      timestamp: "오후 2:32",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length + 1,
        text: message,
        sender: "me",
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      }
      setMessages((prev) => [...prev, newMessage])
      setMessage("")

      // Simulate other user response
      setTimeout(() => {
        const responses = [
          "정말 좋은 곡이었어요!",
          "저도 그 노래 좋아해요 ✨",
          "음악 취향이 비슷하네요!",
          "다른 추천곡도 있나요?",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const responseMessage: ChatMessage = {
          id: messages.length + 2,
          text: randomResponse,
          sender: "other",
          timestamp: new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        }
        setMessages((prev) => [...prev, responseMessage])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6">
        <header className="flex items-center gap-4 py-4 md:py-6 bg-white rounded-b-2xl shadow-sm">
          <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100 transition-colors duration-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.profileImage || "/placeholder.svg"}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-green-400"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <div className="font-semibold text-gray-800">{user.name}</div>
              <div className="text-sm text-green-600">온라인</div>
            </div>
          </div>
        </header>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 md:px-6">
        <div className="flex-1 bg-gray-200 rounded-lg mb-4 p-4 overflow-y-auto min-h-[400px] md:min-h-[500px]">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-xs md:max-w-md lg:max-w-lg">
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      msg.sender === "me" ? "bg-purple-600 text-white" : "bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${msg.sender === "me" ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-3 mb-4">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`${user.name}님에게 메시지를 보내세요...`}
              className="flex-1 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Button
              onClick={handleSendMessage}
              className="hover:bg-purple-700 hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 transform bg-purple-600"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
