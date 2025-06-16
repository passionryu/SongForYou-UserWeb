"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface DeveloperRequestModalProps {
  onClose: () => void
  onSubmit: (requestData: any) => void
}

export function DeveloperRequestModal({ onClose, onSubmit }: DeveloperRequestModalProps) {
  const [requestType, setRequestType] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const requestTypes = [
    { value: "feature", label: "기능 추가 요청" },
    { value: "improvement", label: "서비스 개선" },
    { value: "bug", label: "오류 발견" },
    { value: "other", label: "기타" },
  ]

  const handleSubmit = async () => {
    if (!requestType || !content.trim()) {
      alert("요구사항 유형과 내용을 모두 입력해주세요.")
      return
    }

    setIsSubmitting(true)

    // 제출 시뮬레이션
    setTimeout(() => {
      onSubmit({
        type: requestType,
        content: content.trim(),
        timestamp: new Date().toISOString(),
      })
      setIsSubmitting(false)
      onClose()
      alert("요구사항이 성공적으로 제출되었습니다!")
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-out">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">개발자에게 요구사항 전달</h2>
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
          {/* Request Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">요구사항 선택</label>
            <Select value={requestType} onValueChange={setRequestType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="요구사항 유형을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {requestTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">상세 내용</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="요구사항에 대해 자세히 설명해주세요..."
              className="w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              maxLength={1000}
            />
            <div className="text-right text-sm text-gray-500 mt-2">{content.length}/1000</div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !requestType || !content.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                제출 중...
              </div>
            ) : (
              "제출하기"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
