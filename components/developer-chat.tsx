"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Code } from "lucide-react"

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

interface DeveloperChatProps {
  user: OnlineUser
  onBack: () => void
}

interface ChatMessage {
  id: number
  text: string
  sender: "me" | "developer"
  timestamp: string
}

export function DeveloperChat({ user, onBack }: DeveloperChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "안녕하세요! Song For You 개발자입니다. 궁금한 점이나 개선사항이 있으시면 언제든 말씀해주세요! 😊",
      sender: "developer",
      timestamp: "오후 2:30",
    }
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

      // Simulate developer response
      setTimeout(() => {
        const responses = [
          "좋은 의견 감사합니다! 검토해보겠습니다.",
          "해당 기능은 다음 업데이트에 반영하도록 하겠습니다.",
          "더 자세한 내용을 알려주시면 도움이 될 것 같아요.",
          "사용자 경험 개선을 위해 노력하고 있습니다!",
          "버그 신고 감사합니다. 빠르게 수정하겠습니다.",
          "새로운 아이디어네요! 팀과 논의해보겠습니다.",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const responseMessage: ChatMessage = {
          id: messages.length + 2,
          text: randomResponse,
          sender: "developer",
          timestamp: new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        }
        setMessages((prev) => [...prev, responseMessage])
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleQuickMessage = (quickMessage: string) => {
    setMessage(quickMessage)
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
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center border-2 border-blue-400">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <div className="font-semibold text-gray-800">개발자</div>
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
                      msg.sender === "me" ? "bg-purple-600 text-white" : "bg-blue-600 text-white shadow-sm"
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
              placeholder="개발자에게 메시지를 보내세요..."
              className="flex-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              onClick={handleSendMessage}
              className="hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 transform bg-blue-600"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickMessage("Song For You는 무슨 서비스야?")}
              className="text-xs bg-white hover:bg-gray-50"
            >
              🎵 서비스 소개
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickMessage("서비스 사용법을 알려줘!")}
              className="text-xs bg-white hover:bg-gray-50"
            >
              📖 사용법 문의
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickMessage("본 서비스의 개발자가 누구야?")}
              className="text-xs bg-white hover:bg-gray-50"
            >
              👨‍💻 개발자 정보
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
