"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Music } from "lucide-react"
import { ProfileSetupModal } from "./profile-setup-modal"

interface LoginModalProps {
  onClose: () => void
}

export function LoginModal({ onClose }: LoginModalProps) {
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [kakaoUserData, setKakaoUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleKakaoLogin = async () => {
    setIsLoading(true)

    try {
      // 카카오 OAuth2.0 로그인 로직
      // 실제 구현 시에는 카카오 SDK를 사용하거나 서버 API를 호출
      console.log("카카오 로그인 시작...")

      // 시뮬레이션을 위한 딜레이
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 카카오 로그인 성공 시 받아올 사용자 데이터 (예시)
      const userData = {
        id: "kakao_123456789",
        nickname: "카카오사용자",
        email: "user@kakao.com",
        profileImage: null,
        provider: "kakao",
      }

      setKakaoUserData(userData)
      setShowProfileSetup(true)
    } catch (error) {
      console.error("카카오 로그인 실패:", error)
      // 에러 처리 로직
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileComplete = (profileData: any) => {
    console.log("프로필 설정 완료:", profileData)
    setShowProfileSetup(false)
    onClose()
    // 여기서 최종 사용자 데이터를 서버에 저장하거나 상태 관리
  }

  const handleCloseProfileSetup = () => {
    setShowProfileSetup(false)
    setKakaoUserData(null)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-out overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-8 text-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 hover:bg-white/20 transition-colors duration-200 rounded-full text-white"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Music className="h-8 w-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Song For You</h2>
            <p className="text-white/90 text-sm">음악과 함께하는 특별한 여행을 시작해보세요</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">간편하게 시작하기</h3>
              <p className="text-gray-600 text-sm">
                카카오 계정으로 3초만에 가입하고
                <br />
                AI 음악 추천을 받아보세요
              </p>
            </div>

            {/* 카카오 로그인 버튼 */}
            <Button
              onClick={handleKakaoLogin}
              disabled={isLoading}
              className="w-full bg-[#FEE500] hover:bg-[#FFEB3B] text-[#3C1E1E] py-4 rounded-2xl font-semibold text-base transition-all duration-300 ease-in-out hover:scale-[1.02] transform hover:shadow-lg flex items-center justify-center gap-3 border-0"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#3C1E1E]/30 border-t-[#3C1E1E] rounded-full animate-spin" />
                  로그인 중...
                </>
              ) : (
                <>
                  <div className="w-6 h-6 bg-[#3C1E1E] rounded-md flex items-center justify-center">
                    <span className="text-[#FEE500] text-sm font-bold">K</span>
                  </div>
                  카카오로 시작하기
                </>
              )}
            </Button>

            {/* 부가 정보 */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                로그인 시 <span className="text-gray-700 font-medium">서비스 이용약관</span> 및{" "}
                <span className="text-gray-700 font-medium">개인정보처리방침</span>에<br />
                동의한 것으로 간주됩니다
              </p>
            </div>

            {/* 특징 포인트 */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>AI 기반 개인 맞춤 음악 추천</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>다른 사용자와 음악 취향 공유</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>실시간 음악 채팅 서비스</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 프로필 설정 모달 */}
      {showProfileSetup && kakaoUserData && (
        <ProfileSetupModal
          onClose={handleCloseProfileSetup}
          onComplete={handleProfileComplete}
          userData={kakaoUserData}
        />
      )}
    </>
  )
}
