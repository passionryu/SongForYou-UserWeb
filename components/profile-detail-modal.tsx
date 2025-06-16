"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Upload, User } from "lucide-react"

interface ProfileDetailModalProps {
  onClose: () => void
  onSave: (profileData: any) => void
}

const musicGenres = [
  "K-Pop",
  "팝",
  "록",
  "힙합",
  "R&B",
  "재즈",
  "클래식",
  "일렉트로닉",
  "인디",
  "발라드",
  "트로트",
  "포크",
  "펑크",
  "레게",
  "컨트리",
  "블루스",
  "메탈",
  "라틴",
  "월드뮤직",
  "뉴에이지",
]

export function ProfileDetailModal({ onClose, onSave }: ProfileDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    profileImage: "/placeholder.svg?height=150&width=150",
    name: "김철수",
    nickname: "User",
    favoriteGenres: ["발라드", "재즈"],
    recommendationType: "preference" as "preference" | "ai",
    joinDate: "2024-01-15",
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({ ...prev, profileImage: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenreToggle = (genre: string) => {
    setProfileData((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter((g) => g !== genre)
        : [...prev.favoriteGenres, genre],
    }))
  }

  const handleSave = () => {
    onSave(profileData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // 원래 데이터로 복원하는 로직 추가 가능
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">프로필 정보</h2>
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
        <div className="p-6 space-y-6">
          {/* Profile Image */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-4">프로필 이미지</label>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
                {profileData.profileImage ? (
                  <img
                    src={profileData.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-gray-400" />
                )}
              </div>
              {isEditing && (
                <label htmlFor="profile-upload" className="cursor-pointer">
                  <Button variant="outline" className="hover:bg-gray-50 transition-colors duration-200" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      이미지 변경
                    </span>
                  </Button>
                </label>
              )}
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
            <Input
              value={profileData.name}
              onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">닉네임</label>
            <Input
              value={profileData.nickname}
              onChange={(e) => setProfileData((prev) => ({ ...prev, nickname: e.target.value }))}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Favorite Genres */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">좋아하는 음악 장르</label>
            <div className="grid grid-cols-3 gap-2">
              {musicGenres.map((genre) => (
                <Button
                  key={genre}
                  variant="outline"
                  size="sm"
                  onClick={() => isEditing && handleGenreToggle(genre)}
                  disabled={!isEditing}
                  className={`text-xs transition-all duration-200 ${
                    isEditing ? "hover:scale-105" : ""
                  } cursor-${isEditing ? "pointer" : "default"} ${
                    profileData.favoriteGenres.includes(genre)
                      ? "bg-purple-100 border-purple-300 text-purple-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {genre}
                </Button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">선택된 장르: {profileData.favoriteGenres.length}개</p>
          </div>

          {/* Recommendation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">음악 추천 방식</label>
            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={() => isEditing && setProfileData((prev) => ({ ...prev, recommendationType: "preference" }))}
                disabled={!isEditing}
                className={`w-full p-4 text-left transition-all duration-200 ${
                  isEditing ? "hover:scale-105" : ""
                } cursor-${isEditing ? "pointer" : "default"} ${
                  profileData.recommendationType === "preference"
                    ? "bg-purple-100 border-purple-300 text-purple-700"
                    : "hover:bg-gray-50"
                }`}
              >
                <div>
                  <div className="font-medium">평소 취향대로 추천</div>
                  <div className="text-sm text-gray-600 mt-1">선택한 장르와 기존 취향을 바탕으로 추천받기</div>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => isEditing && setProfileData((prev) => ({ ...prev, recommendationType: "ai" }))}
                disabled={!isEditing}
                className={`w-full p-4 text-left transition-all duration-200 ${
                  isEditing ? "hover:scale-105" : ""
                } cursor-${isEditing ? "pointer" : "default"} ${
                  profileData.recommendationType === "ai"
                    ? "bg-purple-100 border-purple-300 text-purple-700"
                    : "hover:bg-gray-50"
                }`}
              >
                <div>
                  <div className="font-medium">AI 추천</div>
                  <div className="text-sm text-gray-600 mt-1">AI가 대화를 분석해서 새로운 음악 발견하기</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Join Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">회원가입 날짜</label>
            <Input
              value={profileData.joinDate}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg"
              >
                정보 수정
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 py-3 hover:bg-gray-50 transition-all duration-300 ease-in-out hover:scale-105 transform"
                >
                  취소
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg"
                >
                  저장
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
