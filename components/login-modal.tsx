"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Eye, EyeOff } from "lucide-react"
import { SignupModal } from "./signup-modal"
import { ProfileSetupModal } from "./profile-setup-modal"

interface LoginModalProps {
  onClose: () => void
}

export function LoginModal({ onClose }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [signupUserData, setSignupUserData] = useState(null)

  const handleLogin = () => {
    // Login logic to be implemented
    console.log("Login attempt:", { nickname, password })
  }

  const handleKakaoLogin = () => {
    // Kakao OAuth2.0 login logic to be implemented
    console.log("Kakao login")
  }

  const handleNaverLogin = () => {
    // Naver OAuth2.0 login logic to be implemented
    console.log("Naver login")
  }

  const handleSignup = () => {
    setShowSignupModal(true)
  }

  const handleSignupNext = (userData: any) => {
    setSignupUserData(userData)
    setShowSignupModal(false)
    setShowProfileSetup(true)
  }

  const handleProfileComplete = (profileData: any) => {
    console.log("Registration completed:", profileData)
    setShowProfileSetup(false)
    onClose()
    // Here you would typically send the data to your backend
  }

  const handleCloseSignup = () => {
    setShowSignupModal(false)
    setShowProfileSetup(false)
    setSignupUserData(null)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-out">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">로그인</h2>
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
          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <Input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full bg-gray-200 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg text-black hover:bg-gray-100 rounded-full"
          >
            로그인
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">또는</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleKakaoLogin}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-medium transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg flex items-center justify-center gap-3"
            >
              <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                <span className="text-yellow-400 text-xs font-bold">K</span>
              </div>
              카카오로 로그인
            </Button>

            <Button
              onClick={handleNaverLogin}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg flex items-center justify-center gap-3"
            >
              <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                <span className="text-green-500 text-xs font-bold">N</span>
              </div>
              네이버로 로그인
            </Button>
          </div>

          {/* Signup Link */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm">
              아직 계정이 없으신가요?{" "}
              <Button
                variant="link"
                onClick={handleSignup}
                className="text-purple-600 hover:text-purple-700 font-medium p-0 h-auto transition-colors duration-200"
              >
                회원가입
              </Button>
            </p>
          </div>
        </div>
      </div>
      {showSignupModal && <SignupModal onClose={handleCloseSignup} onNext={handleSignupNext} />}
      {showProfileSetup && signupUserData && (
        <ProfileSetupModal onClose={handleCloseSignup} onComplete={handleProfileComplete} userData={signupUserData} />
      )}
    </div>
  )
}
