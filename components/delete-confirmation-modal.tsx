"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteConfirmationModalProps {
  onConfirm: () => void
  onCancel: () => void
  chatTitle: string
  chatArtist: string
}

export function DeleteConfirmationModal({ onConfirm, onCancel, chatTitle, chatArtist }: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-out">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">채팅 삭제 확인</h2>
          <p className="text-gray-600 mb-4">정말로 이 채팅을 삭제하시겠습니까?</p>
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="font-medium text-gray-800">
              "{chatTitle} - {chatArtist}"
            </p>
            <p className="text-sm text-gray-500 mt-1">삭제된 채팅은 복구할 수 없습니다.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-6 pt-0">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 py-3 hover:bg-gray-50 transition-all duration-300 ease-in-out hover:scale-105 transform"
          >
            취소
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 transition-all duration-300 ease-in-out hover:scale-105 transform hover:shadow-lg"
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  )
}
