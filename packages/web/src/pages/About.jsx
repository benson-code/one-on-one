import React from 'react'
import { Heart, Shield, Users, Globe, Brain, MessageCircle, MapPin, Clock } from 'lucide-react'

function About() {
  const coreFeatures = [
    {
      icon: Brain,
      title: 'AI 驅動的醫療推薦',
      features: [
        '個人化匹配：我們的 AI 引擎根據您的醫療需求、預算和目的地偏好，精準推薦全球頂尖醫療機構。',
        '即時分析：利用自然語言處理（NLP）和醫療數據分析，確保推薦結果符合您的健康目標。',
        '多語言支持：支援超過 100 種語言，打破語言障礙，讓您輕鬆與醫療機構溝通。'
      ]
    },
    {
      icon: MapPin,
      title: '一站式行程規劃',
      features: [
        '醫療與旅遊整合：從醫療預約到航班、住宿安排，我們為您量身打造完整的旅遊體驗。',
        '即時更新：與全球旅遊 API（如 Amadeus）整合，提供最新的航班和酒店資訊。',
        '個人化行程：根據您的健康狀況和興趣，推薦適合的旅遊活動，平衡醫療與休閒。'
      ]
    },
    {
      icon: Shield,
      title: '安全支付與數據保護',
      features: [
        '跨境支付：支援 Stripe 和 PayPal，確保安全、快速的支付體驗。',
        '數據安全：遵循 HIPAA 和 GDPR 標準，採用端到端加密，保護您的醫療和個人數據。',
        '透明計費：提供清晰的費用明細，無隱藏收費，讓您安心計劃預算。'
      ]
    }
  ]

  const reasons = [
    {
      icon: Brain,
      title: 'AI 技術領先',
      description: '與 AI Singapore 和 Google for Startups Accelerator 合作，採用最先進的生成式 AI 和醫療數據分析技術。'
    },
    {
      icon: MapPin,
      title: '新加坡優勢',
      description: '位於全球醫療旅遊中心，與新加坡頂尖醫療機構（如 Mount Elizabeth Hospital）合作，提供高品質醫療資源。'
    },
    {
      icon: Users,
      title: '個人化體驗',
      description: '每位患者的健康需求和旅遊偏好都獨一無二，我們的 AI 確保為您量身定制解決方案。'
    },
    {
      icon: Globe,
      title: '全球網絡',
      description: '連接全球 250 家以上醫療機構，覆蓋亞洲、歐洲和北美，讓您選擇無限。'
    },
    {
      icon: Shield,
      title: '倫理與透明',
      description: '透過 IMDA 的 AI Verify Foundation 驗證，確保我們的 AI 模型公平、透明且符合倫理規範。'
    }
  ]

  const targetUsers = [
    {
      title: '國際患者',
      description: '尋求高品質、經濟實惠的醫療服務，並希望結合旅遊體驗的個人。',
      icon: Heart
    },
    {
      title: '醫療機構',
      description: '希望吸引國際患者、提升品牌曝光的診所和醫院。',
      icon: Building2
    },
    {
      title: '旅遊公司',
      description: '尋求 AI 技術整合，提供醫療旅遊套餐的合作夥伴。',
      icon: Plane
    },
    {
      title: '投資者',
      description: '對 AI 驅動的醫療旅遊創新有興趣的風險資本和加速器。',
      icon: TrendingUp
    }
  ]

  const testimonials = [
    {
      quote: '一對一醫療旅遊 AI 平台讓我的心臟手術之旅變得輕鬆無比！AI 推薦的醫療機構完美符合我的需求，聊天機器人還幫我安排了新加坡的旅遊行程，體驗超棒！',
      author: '李小姐',
      location: '台灣'
    },
    {
      quote: '作為一家醫療機構，我們透過平台吸引了更多國際患者，AI 技術讓我們的服務更高效，患者滿意度大幅提升。',
      author: 'Dr. Tan',
      location: '新加坡醫療集團'
    }
  ]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary-500/20 rounded-2xl">
              <Heart className="w-8 h-8 text-primary-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-500 to-blue-400 bg-clip-text text-transparent">
              一對一醫療旅遊 AI 平台
            </h1>
          </div>
          <p className="text-xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            您的全球健康夥伴
          </p>
        </div>

        {/* About Us Section */}
        <section className="mb-20">
          <div className="card p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">關於我們</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                歡迎體驗 <span className="text-primary-500 font-semibold">一對一醫療旅遊 AI 平台</span>，我們致力於為全球患者提供個人化、智慧化、安全的醫療旅遊解決方案。結合尖端的 AI 技術和新加坡領先的醫療旅遊生態，我們為您打造一站式平台，涵蓋醫療診斷、行程規劃、預約管理和支付服務，讓您的健康之旅無縫銜接、輕鬆無憂。
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="bg-dark-700/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary-400">我們的使命</h3>
                  <p className="text-dark-300 leading-relaxed">
                    讓每位患者都能輕鬆找到最適合的醫療機構，享受高品質的醫療服務，同時探索目的地的文化與美景。
                  </p>
                </div>
                <div className="bg-dark-700/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary-400">我們的願景</h3>
                  <p className="text-dark-300 leading-relaxed">
                    成為全球醫療旅遊的首選平台，透過 AI 驅動的個人化體驗，重新定義健康與旅遊的結合。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">核心功能</h2>
          <div className="grid gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary-500/20 rounded-xl">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <div className="space-y-4 ml-16">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-dark-300 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">為什麼選擇我們？</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="card p-6 group hover:border-primary-500/50 transition-all duration-300">
                <div className="p-3 bg-primary-500/20 rounded-xl w-fit mb-4 group-hover:bg-primary-500/30 transition-colors">
                  <reason.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                <p className="text-dark-300 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Target Users Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">適用對象</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {targetUsers.map((user, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="p-4 bg-primary-500/20 rounded-2xl w-fit mx-auto mb-4">
                  <user.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{user.title}</h3>
                <p className="text-dark-300 leading-relaxed">{user.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">使用者見證</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8 relative">
                <div className="absolute top-4 left-6 text-primary-500/30 text-6xl font-serif">"</div>
                <blockquote className="text-lg leading-relaxed mb-6 pt-8 italic">
                  {testimonial.quote}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-dark-400">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-20">
          <div className="card p-8 md:p-12 text-center bg-gradient-to-r from-primary-500/10 to-blue-500/10 border-primary-500/30">
            <h2 className="text-3xl font-bold mb-6">立即開始您的健康之旅</h2>
            <p className="text-lg text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              無論您是尋求專業醫療服務的患者，還是希望拓展業務的醫療機構，一對一醫療旅遊 AI 平台都是您的最佳選擇。立即註冊，體驗 AI 驅動的個人化醫療旅遊服務！
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-5 h-5 text-primary-500" />
                <span className="font-medium">免費試用：註冊即可獲得 30 天免費使用 AI 推薦和聊天機器人功能</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <MessageCircle className="w-5 h-5 text-primary-500" />
                <span className="font-medium">聯繫我們：透過平台內建聊天機器人或電子郵件聯繫</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Globe className="w-5 h-5 text-primary-500" />
                <span className="font-medium">參加活動：歡迎參加 SuperAI 2026（6 月 10-11 日）</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3">
                立即註冊
              </button>
              <button className="px-8 py-3 border border-primary-500 text-primary-500 rounded-xl hover:bg-primary-500 hover:text-white transition-colors">
                了解更多
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="card p-8 text-center">
            <h2 className="text-2xl font-bold mb-8">聯繫方式</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center gap-3">
                <Globe className="w-8 h-8 text-primary-500" />
                <div>
                  <div className="font-semibold">網站</div>
                  <div className="text-sm text-dark-400">www.onetoonehealth.ai</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <MessageCircle className="w-8 h-8 text-primary-500" />
                <div>
                  <div className="font-semibold">電子郵件</div>
                  <div className="text-sm text-dark-400">contact@onetoonehealth.ai</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Users className="w-8 h-8 text-primary-500" />
                <div>
                  <div className="font-semibold">社交媒體</div>
                  <div className="text-sm text-dark-400">@OneToOneHealthAI</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <MapPin className="w-8 h-8 text-primary-500" />
                <div>
                  <div className="font-semibold">辦公室</div>
                  <div className="text-sm text-dark-400">新加坡，濱海灣金融中心</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-dark-600">
              <p className="text-lg font-semibold text-primary-500">
                一對一醫療旅遊 AI 平台 – 您的健康，您的旅程，我們的承諾。
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// Missing icons for target users
const Building2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const Plane = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const TrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

export default About