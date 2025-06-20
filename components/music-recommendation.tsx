"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, ThumbsUp, ThumbsDown, Instagram, Share2, ArrowLeft, ExternalLink } from "lucide-react"
import { LoginModal } from "@/components/login-modal"
import { MyPage } from "@/components/my-page"

interface MusicRecommendation {
  id: number
  title: string
  artist: string
  thumbnail: string
  reason: string
  encouragement: string
  youtubeUrl: string
  liked?: boolean
  disliked?: boolean
  saved?: boolean
}

interface MusicRecommendationPageProps {
  onBack: () => void
}

export function MusicRecommendationPage({ onBack }: MusicRecommendationPageProps) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showMyPage, setShowMyPage] = useState(false)
  const [recommendations, setRecommendations] = useState<MusicRecommendation[]>([
    {
      id: 1,
      title: "Spring Day",
      artist: "BTS",
      thumbnail: "https://i.scdn.co/image/ab67616d0000b273de2c90b6f7a8b9b8e0b6b6b6",
      youtubeUrl: "https://www.youtube.com/watch?v=xEeFrLSkMm8",
      reason:
        "추천 사유 : 그리움과 희망이 공존하는 감성적인 멜로디로, 힘든 시간을 견뎌내는 당신에게 위로와 용기를 전해줍니다. 계절의 변화처럼 모든 어려움도 지나간다는 메시지를 담고 있습니다.",
      encouragement:
        "응원 메시지 : 추운 겨울이 지나면 따뜻한 봄이 오듯이, 지금의 어려움도 반드시 지나갈 거예요. 당신의 봄날이 곧 올 거라 믿어요!",
    },
    {
      id: 2,
      title: "Through the Night",
      artist: "IU",
      thumbnail: "https://i.scdn.co/image/ab67616d0000b273f5e9e5e5e5e5e5e5e5e5e5e5",
      youtubeUrl: "https://www.youtube.com/watch?v=BzYnNdJhZQw",
      reason:
        "추천 사유 : 잔잔하고 따뜻한 멜로디가 마음을 편안하게 해주며, 소중한 사람을 생각하는 마음을 아름답게 표현한 곡입니다. 하루의 마무리에 듣기 좋은 힐링 음악입니다.",
      encouragement:
        "응원 메시지 : 오늘 하루도 수고 많으셨어요. 밤하늘의 별처럼 당신도 누군가에게 소중한 빛이 되고 있답니다. 편안한 밤 되세요!",
    },
    {
      id: 3,
      title: "Dynamite",
      artist: "BTS",
      thumbnail: "https://i.scdn.co/image/ab67616d0000b273c9b9b9b9b9b9b9b9b9b9b9b9",
      youtubeUrl: "https://www.youtube.com/watch?v=gdZLi9oWNZg",
      reason:
        "추천 사유 : 밝고 경쾌한 리듬으로 에너지를 충전해주는 곡입니다. 힘들고 지친 일상에 활력을 불어넣어 주며, 긍정적인 마인드로 하루를 시작할 수 있게 도와줍니다.",
      encouragement:
        "응원 메시지 : 당신 안에 숨어있는 다이너마이트 같은 에너지를 발산해보세요! 오늘도 빛나는 하루 만들어가시길 응원합니다!",
    },
    {
      id: 4,
      title: "Hotel Del Luna",
      artist: "IU",
      thumbnail: "https://i.scdn.co/image/ab67616d0000b273a1a1a1a1a1a1a1a1a1a1a1a1",
      youtubeUrl: "https://www.youtube.com/watch?v=v7bnOxV4jAc",
      reason:
        "추천 사유 : 몽환적이고 신비로운 분위기의 곡으로, 일상에서 벗어나 특별한 감정을 느끼고 싶을 때 완벽한 선택입니다. IU의 독특한 보컬이 매력적인 곡입니다.",
      encouragement:
        "응원 메시지 : 때로는 현실에서 벗어나 꿈같은 시간을 가져도 괜찮아요. 당신만의 특별한 순간을 만들어가세요!",
    },
    {
      id: 5,
      title: "Life Goes On",
      artist: "BTS",
      thumbnail: "https://i.scdn.co/image/ab67616d0000b273b1b1b1b1b1b1b1b1b1b1b1b1",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      reason:
        "추천 사유 : 어려운 시기에도 삶은 계속된다는 메시지를 담은 위로의 곡입니다. 잔잔한 멜로디와 따뜻한 가사로 마음의 평안을 찾을 수 있습니다.",
      encouragement:
        "응원 메시지 : 힘든 시간이 와도 삶은 계속 흘러갑니다. 당신의 삶도 아름답게 계속될 거예요. 오늘도 한 걸음씩 나아가세요!",
    },
  ])

  const handleLike = (id: number) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, liked: !rec.liked, disliked: false } : rec)),
    )
  }

  const handleDislike = (id: number) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, disliked: !rec.disliked, liked: false } : rec)),
    )
  }

  const handleSave = (id: number) => {
    setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, saved: !rec.saved } : rec)))

    // 저장 완료 알림
    const recommendation = recommendations.find((rec) => rec.id === id)
    if (recommendation && !recommendation.saved) {
      alert(`"${recommendation.title} - ${recommendation.artist}"이(가) 내 보관함에 저장되었습니다!`)
    } else {
      alert("보관함에서 제거되었습니다.")
    }
  }

  const handleYoutubeOpen = (youtubeUrl: string) => {
    window.open(youtubeUrl, "_blank")
  }

  const handleInstagramShare = () => {
    console.log("인스타그램 스토리 공유")
  }

  const handleLinkShare = () => {
    console.log("링크 공유")
  }

  if (showMyPage) {
    return <MyPage onBack={() => setShowMyPage(false)} />
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
              onClick={() => setShowMyPage(true)}
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </header>
      </div>

      {/* Music Recommendations */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 pb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">당신을 위한 음악 추천</h1>
          <p className="text-gray-600">AI Music 매니저가 당신과의 대화를 바탕으로 선별한 특별한 음악들입니다.</p>
        </div>

        <div className="space-y-6">
          {recommendations.map((rec) => (
            <Card
              key={rec.id}
              className="bg-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  <img
                    src={rec.thumbnail || "/placeholder.svg"}
                    alt={`${rec.title} thumbnail`}
                    className="w-48 h-48 rounded-xl object-cover shadow-md"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Title : {rec.title}</h3>
                    <p className="text-lg text-gray-700 mb-3">Artist : {rec.artist}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-700 leading-relaxed">{rec.reason}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{rec.encouragement}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row lg:flex-col gap-4 lg:gap-3 w-full lg:w-28">
                  {/* 1번 묶음: 좋아요/싫어요/Youtube 이동 */}
                  <div className="flex flex-col gap-3 flex-1 lg:flex-none lg:w-full">
                    {/* 좋아요/싫어요 버튼 - 정사각형, 가로 나열 */}
                    <div className="flex gap-2 lg:gap-5 justify-center lg:justify-start">
                      <Button
                        variant="outline"
                        onClick={() => handleLike(rec.id)}
                        className={`w-12 h-12 p-0 rounded-xl transition-all duration-200 hover:scale-105 ${
                          rec.liked ? "bg-blue-100 border-blue-300" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <ThumbsUp className={`h-5 w-5 ${rec.liked ? "text-blue-600" : "text-gray-700"}`} />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDislike(rec.id)}
                        className={`w-12 h-12 p-0 rounded-xl transition-all duration-200 hover:scale-105 ${
                          rec.disliked ? "bg-red-100 border-red-300" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <ThumbsDown className={`h-5 w-5 ${rec.disliked ? "text-red-600" : "text-gray-700"}`} />
                      </Button>
                    </div>

                    {/* Youtube 이동 버튼 - 가로로 긴 직사각형 */}
                    <Button
                      variant="outline"
                      onClick={() => handleYoutubeOpen(rec.youtubeUrl)}
                      className="w-full h-12 bg-white hover:bg-red-50 hover:border-red-300 rounded-xl transition-all duration-200 hover:scale-105 text-sm font-medium text-gray-700 hover:text-red-600 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Youtube로 이동
                    </Button>
                  </div>

                  {/* 2번 묶음: 공유 버튼들/보관함 저장 */}
                  <div className="flex flex-col gap-3 flex-1 lg:flex-none lg:w-full">
                    {/* 인스타그램/링크 공유 버튼 - 정사각형, 가로 나열 */}
                    <div className="flex gap-2 lg:gap-5 justify-center lg:justify-start">
                      <Button
                        variant="outline"
                        onClick={handleInstagramShare}
                        className="w-12 h-12 p-0 bg-white hover:bg-pink-50 hover:border-pink-300 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <Instagram className="h-5 w-5 text-gray-700" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleLinkShare}
                        className="w-12 h-12 p-0 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <Share2 className="h-5 w-5 text-gray-700" />
                      </Button>
                    </div>

                    {/* 보관함 저장 버튼 - 가로로 긴 직사각형 */}
                    <Button
                      variant="outline"
                      onClick={() => handleSave(rec.id)}
                      className={`w-full h-12 rounded-xl transition-all duration-200 hover:scale-105 text-sm font-medium ${
                        rec.saved
                          ? "bg-yellow-100 border-yellow-300 text-yellow-700"
                          : "bg-white hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      내 보관함에 저장
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  )
}
