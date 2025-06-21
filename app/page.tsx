"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Send } from "lucide-react"
import { LoginModal } from "@/components/login-modal"
import { MusicRecommendationPage } from "@/components/music-recommendation"
import { MyPage } from "@/components/my-page"

export default function ChatbotPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: "user" | "bot" }>>([])
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRecommendationPage, setShowRecommendationPage] = useState(false)
  const [showMyPage, setShowMyPage] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { id: Date.now(), text: message, sender: "user" }])
      setMessage("")

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "안녕하세요! Song For You에 오신 것을 환영합니다. 당신에게 어울리는 음악을 찾아드리기 위해 몇 가지 질문을 드릴게요.",
            sender: "bot",
          },
        ])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (showMyPage) {
    return <MyPage onBack={() => setShowMyPage(false)} />
  }

  if (showRecommendationPage) {
    return <MusicRecommendationPage onBack={() => setShowRecommendationPage(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6">
        <header className="flex justify-between items-center py-4 md:py-6">
          <div className="text-2xl font-bold text-black">Song For You</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-105 transform"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </Button>
            <Button
              className="hover:bg-purple-700 hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 transform bg-slate-600"
              size="icon"
              onClick={() => setShowMyPage(true)}
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </header>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 md:px-6">
        <div className="flex-1 bg-gray-200 rounded-lg mb-4 p-4 overflow-y-auto min-h-[400px] md:min-h-[500px]">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-center">
                안녕하세요!
                <br />
                {/*당신에게 어울리는 음악을 찾아드릴 AI Music 매니저입니다.*/}
                
                AI Music 매니저와 대화를 시작해보세요!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg bg-white text-black ${
                      msg.sender === "user" ? "text-black" : "text-gray-800 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="space-y-3 mb-4">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Button
              onClick={handleSendMessage}
              className="hover:bg-purple-700 hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 transform bg-slate-600"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="text-sm bg-white hover:bg-gray-50 hover:shadow-md border-purple-200 transition-all duration-300 ease-in-out hover:scale-105 transform w-full text-black"
              onClick={() => setShowRecommendationPage(true)}
            >
              대화 종료하고 음악 추천 받기
            </Button>
          </div>
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  )
}
