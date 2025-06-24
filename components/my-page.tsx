"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, ArrowLeft, Settings, LogOut } from "lucide-react"
import { ChatListPage } from "./chat-list-page"
import { FavoriteChatListPage } from "./favorite-chat-list-page"
import { ProfileDetailModal } from "./profile-detail-modal"
import { DeveloperRequestModal } from "./developer-request-modal"
import { DeveloperChat } from "./developer-chat"
import { LoginModal } from "./login-modal"

interface MyPageProps {
  onBack: () => void
}

export function MyPage({ onBack }: MyPageProps) {
  const [userProfile, setUserProfile] = useState({
    nickname: "User",
    profileImage: "/placeholder.svg?height=150&width=150",
    favoriteGenres: ["발라드", "재즈"],
    musicRecommendationCount: 15,
    recommendationType: "평소 취향 대로 추천",
  })

  const [showAllChats, setShowAllChats] = useState(false)
  const [showFavoriteChats, setShowFavoriteChats] = useState(false)
  const [showProfileDetail, setShowProfileDetail] = useState(false)
  const [showDeveloperRequest, setShowDeveloperRequest] = useState(false)
  const [showDeveloperChat, setShowDeveloperChat] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleDeveloperRequest = () => {
    setShowDeveloperRequest(true)
  }

  const handleDeveloperChat = () => {
    setShowDeveloperChat(true)
  }

  const handleLogout = () => {
    alert("로그아웃이 정상적으로 진행되었습니다.")
    onBack() // 챗봇 페이지로 이동
  }

  const handleProfileSave = (profileData: any) => {
    setUserProfile((prev) => ({
      ...prev,
      nickname: profileData.nickname,
      favoriteGenres: profileData.favoriteGenres,
      recommendationType: profileData.recommendationType === "preference" ? "평소 취향 대로 추천" : "AI 추천",
    }))
    console.log("프로필 저장:", profileData)
  }

  const handleDeveloperRequestSubmit = (requestData: any) => {
    console.log("개발자 요구사항 제출:", requestData)
  }

  if (showDeveloperChat) {
    const developerUser = {
      id: 999,
      name: "개발자",
      profileImage: "/placeholder.svg?height=60&width=60&text=DEV",
      recentSong: {
        title: "Code & Coffee",
        artist: "Developer",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      isOnline: true,
    }
    return <DeveloperChat user={developerUser} onBack={() => setShowDeveloperChat(false)} />
  }

  if (showAllChats) {
    return <ChatListPage onBack={() => setShowAllChats(false)} />
  }

  if (showFavoriteChats) {
    return <FavoriteChatListPage onBack={() => setShowFavoriteChats(false)} />
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
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </header>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 pb-8 space-y-6">
        {/* Profile Section */}
        <Card
          className="bg-gray-200 p-8 rounded-2xl cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 transform"
          onClick={() => setShowProfileDetail(true)}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-yellow-100 flex items-center justify-center overflow-hidden">
                <img
                  src={userProfile.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 bg-white rounded-2xl p-6 text-center md:text-left">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 text-sm">닉네임 : </span>
                  <span className="font-medium text-gray-800">{userProfile.nickname}</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">좋아하는 장르 : </span>
                  <span className="font-medium text-gray-800">{userProfile.favoriteGenres.join(", ")}</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">음악 추천 사용 수 : </span>
                  <span className="font-medium text-gray-800">{userProfile.musicRecommendationCount}</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">음악 추천 방식 : </span>
                  <span className="font-medium text-gray-800">{userProfile.recommendationType}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chat Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* All Chats */}
          <Card
            className="bg-white p-6 rounded-2xl hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => setShowAllChats(true)}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">모든 채팅 리스트</h3>
            </div>
          </Card>

          {/* Favorite Chats */}
          <Card
            className="bg-white p-6 rounded-2xl hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => setShowFavoriteChats(true)}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">즐겨찾는 채팅 리스트</h3>
            </div>
          </Card>
        </div>

        {/* Developer Request */}
        <Card className="bg-white p-8 rounded-2xl hover:shadow-md transition-shadow duration-300">
          <div className="text-center">
            <Settings className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-4">개발자에게 요구하는 페이지</h3>
            <p className="text-gray-600 mb-6">서비스 개선을 위한 의견이나 요청사항을 전달해주세요.</p>
            <div className="flex flex-row gap-3">
              <Button
                onClick={handleDeveloperRequest}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg"
              >
                요청사항 작성하기
              </Button>
              <Button
                onClick={handleDeveloperChat}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg"
              >
                개발자와 채팅
              </Button>
            </div>
          </div>
        </Card>

        {/* Logout Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 ease-in-out hover:scale-105 transform px-8 py-3"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Modals */}
      {showProfileDetail && (
        <ProfileDetailModal onClose={() => setShowProfileDetail(false)} onSave={handleProfileSave} />
      )}
      {showDeveloperRequest && (
        <DeveloperRequestModal onClose={() => setShowDeveloperRequest(false)} onSubmit={handleDeveloperRequestSubmit} />
      )}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  )
}
