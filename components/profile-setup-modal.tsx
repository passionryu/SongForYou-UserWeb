"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Upload, User } from "lucide-react"

interface ProfileSetupModalProps {
  onClose: () => void
  onComplete: (profileData: any) => void
  userData: any
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

export function ProfileSetupModal({ onClose, onComplete, userData }: ProfileSetupModalProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [recommendationType, setRecommendationType] = useState<"preference" | "ai" | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const handleSkip = () => {
    onComplete({ ...userData, profileCompleted: false })
  }

  const handleSave = () => {
    const profileData = {
      ...userData,
      profileImage,
      favoriteGenres: selectedGenres,
      recommendationType,
      profileCompleted: true,
    }
    onComplete(profileData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">프로필 설정</h2>
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
                {profileImage ? (
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <label htmlFor="profile-upload" className="cursor-pointer">
                <Button variant="outline" className="hover:bg-gray-50 transition-colors duration-200" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    이미지 업로드
                  </span>
                </Button>
              </label>
              <input id="profile-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          </div>

          {/* Music Genres */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">좋아하는 음악 장르 (다중 선택 가능)</label>
            <div className="grid grid-cols-3 gap-2">
              {musicGenres.map((genre) => (
                <Button
                  key={genre}
                  variant="outline"
                  size="sm"
                  onClick={() => handleGenreToggle(genre)}
                  className={`text-xs transition-all duration-200 hover:scale-105 ${
                    selectedGenres.includes(genre)
                      ? "bg-purple-100 border-purple-300 text-purple-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {genre}
                </Button>
              ))}
            </div>
            {selectedGenres.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">선택된 장르: {selectedGenres.length}개</p>
            )}
          </div>

          {/* Recommendation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">음악 추천 방식을 선택해주세요</label>
            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={() => setRecommendationType("preference")}
                className={`w-full p-4 text-left transition-all duration-200 hover:scale-105 ${
                  recommendationType === "preference"
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
                onClick={() => setRecommendationType("ai")}
                className={`w-full p-4 text-left transition-all duration-200 hover:scale-105 ${
                  recommendationType === "ai" ? "bg-purple-100 border-purple-300 text-purple-700" : "hover:bg-gray-50"
                }`}
              >
                <div>
                  <div className="font-medium">AI 추천</div>
                  <div className="text-sm text-gray-600 mt-1">AI가 대화를 분석해서 새로운 음악 발견하기</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1 py-3 hover:bg-gray-50 transition-all duration-300 ease-in-out hover:scale-105 transform"
            >
              건너뛰기
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg"
            >
              저장하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
