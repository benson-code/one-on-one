import React, { useEffect, useState } from 'react'
import { Heart, Shield, Users, Globe, Brain, MessageCircle, MapPin, Clock, Star, Award, CheckCircle, ArrowRight } from 'lucide-react'

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

  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setIsVisible(true)
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
          entry.target.classList.add('animate-fade-in')
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section with Enhanced Animation */}
        <div className={`text-center mb-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl animate-pulse delay-700"></div>
              <div className="absolute top-10 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="inline-flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-3xl border border-primary-500/20 backdrop-blur-sm">
              <div className="relative p-4 bg-gradient-to-br from-primary-500/30 to-blue-500/30 rounded-2xl">
                <Heart className="w-10 h-10 text-white drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                  ONEonone
                </h1>
                <p className="text-lg md:text-xl text-primary-200 font-medium">醫療旅遊 AI 平台</p>
              </div>
            </div>
            
            <p className="text-2xl md:text-3xl text-white mb-6 max-w-4xl mx-auto leading-relaxed font-light">
              🌟 您的 <span className="text-primary-200 font-semibold">全球健康夥伴</span>
            </p>
            <p className="text-lg text-dark-200 max-w-2xl mx-auto leading-relaxed">
              結合最先進的 AI 技術，為您打造個人化、智慧化的醫療旅遊體驗
            </p>
            
            {/* Stats section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-2xl p-6 border border-primary-500/30 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">250+</div>
                <div className="text-primary-300">合作醫療機構</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-green-300">支援語言</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">30天</div>
                <div className="text-purple-300">免費試用</div>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <section id="about" data-section className="mb-24">
          <div className="relative">
            {/* Section background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-blue-500/5 rounded-3xl blur-3xl"></div>
            
            <div className="relative bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-xl rounded-3xl p-8 md:p-16 border border-primary-500/20 shadow-2xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">關於我們</h2>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-xl md:text-2xl leading-relaxed mb-8 text-center text-dark-200 font-light">
                  歡迎體驗 <span className="text-primary-200 font-semibold">ONEonone 醫療旅遊 AI 平台</span>，我們致力於為全球患者提供個人化、智慧化、安全的醫療旅遊解決方案。
                </p>
                
                <div className="text-center mb-12">
                  <p className="text-lg text-dark-200 max-w-4xl mx-auto leading-relaxed">
                    結合尖端的 AI 技術和新加坡領先的醫療旅遊生態，我們為您打造一站式平台，涵蓋醫療診斷、行程規劃、預約管理和支付服務，讓您的健康之旅無縫銜接、輕鬆無憂。
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mt-16">
                  <div className="group relative bg-gradient-to-br from-primary-500/10 to-blue-500/10 rounded-2xl p-8 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-500 hover:scale-105">
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Heart className="w-12 h-12 text-primary-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-primary-200 flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary-400" />
                      </div>
                      我們的使命
                    </h3>
                    <p className="text-dark-200 leading-relaxed text-lg">
                      讓每位患者都能輕鬆找到最適合的醫療機構，享受高品質的醫療服務，同時探索目的地的文化與美景。
                    </p>
                    <div className="mt-6 flex items-center text-primary-400 font-medium">
                      <span>了解更多</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  
                  <div className="group relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:scale-105">
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Globe className="w-12 h-12 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-blue-300 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-blue-400" />
                      </div>
                      我們的願景
                    </h3>
                    <p className="text-dark-200 leading-relaxed text-lg">
                      成為全球醫療旅遊的首選平台，透過 AI 驅動的個人化體驗，重新定義健康與旅遊的結合。
                    </p>
                    <div className="mt-6 flex items-center text-blue-400 font-medium">
                      <span>探索願景</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section id="features" data-section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">核心功能</h2>
            <p className="text-xl text-dark-200 max-w-3xl mx-auto leading-relaxed">
              三大核心功能模組，為您提供完整的醫療旅遊解決方案
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full mt-8"></div>
          </div>
          
          <div className="space-y-12">
            {coreFeatures.map((feature, index) => (
              <div key={index} className={`group relative transition-all duration-700 hover:scale-[1.02] ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Feature card with enhanced styling */}
                <div className="relative bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary-500/20 shadow-2xl overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 md:flex md:items-center md:gap-12">
                    <div className="md:flex-1">
                      <div className="flex items-center gap-6 mb-8">
                        <div className="relative p-4 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-2xl border border-primary-500/30 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="w-10 h-10 text-primary-400" />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div>
                          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{feature.title}</h3>
                          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {feature.features.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 bg-dark-700/30 rounded-xl border border-dark-600/50 hover:border-primary-500/30 transition-colors group/item">
                            <div className="relative mt-1">
                              <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"></div>
                              <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full animate-ping opacity-20"></div>
                            </div>
                            <p className="text-dark-200 leading-relaxed text-lg group-hover/item:text-white transition-colors">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Feature number indicator */}
                    <div className="hidden md:block">
                      <div className="text-8xl font-bold text-primary-500/10 group-hover:text-primary-500/20 transition-colors duration-500">
                        0{index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="advantages" data-section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">為什麼選擇我們？</h2>
            <p className="text-xl text-dark-200 max-w-3xl mx-auto leading-relaxed">
              五大核心優勢，讓您的醫療旅遊體驗更加完美
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full mt-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="group relative">
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100"></div>
                
                <div className="relative bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-xl rounded-3xl p-8 border border-dark-600/50 group-hover:border-primary-500/50 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl">
                  {/* Icon with enhanced styling */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary-500/30">
                      <reason.icon className="w-8 h-8 text-primary-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-200 transition-colors">{reason.title}</h3>
                  <p className="text-dark-200 leading-relaxed group-hover:text-dark-200 transition-colors">{reason.description}</p>
                  
                  {/* Read more indicator */}
                  <div className="mt-6 flex items-center text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-medium">深入了解</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                  
                  {/* Card number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-primary-500/5 group-hover:text-primary-500/10 transition-colors duration-500">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Target Users Section */}
        <section id="users" data-section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">適用對象</h2>
            <p className="text-xl text-dark-200 max-w-3xl mx-auto leading-relaxed">
              為不同的用戶群體提供專業服務，滿足多元化需求
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full mt-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {targetUsers.map((user, index) => {
              const colors = [
                { from: 'from-primary-500/20', to: 'to-blue-500/20', border: 'border-primary-500/30', text: 'text-primary-200' },
                { from: 'from-green-500/20', to: 'to-emerald-500/20', border: 'border-green-500/30', text: 'text-green-300' },
                { from: 'from-purple-500/20', to: 'to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-300' },
                { from: 'from-orange-500/20', to: 'to-red-500/20', border: 'border-orange-500/30', text: 'text-orange-300' }
              ][index]
              
              return (
                <div key={index} className="group relative">
                  {/* Hover background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100 blur-xl`}></div>
                  
                  <div className={`relative bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-xl rounded-3xl p-8 border ${colors.border} transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl text-center`}>
                    {/* Icon with enhanced styling */}
                    <div className="relative mb-6 mx-auto w-fit">
                      <div className={`w-20 h-20 bg-gradient-to-br ${colors.from} ${colors.to} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border ${colors.border} shadow-lg`}>
                        <user.icon className={`w-10 h-10 ${colors.text}`} />
                      </div>
                      {/* Status indicator */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-4 text-white transition-colors`}>{user.title}</h3>
                    <p className="text-dark-200 leading-relaxed group-hover:text-dark-200 transition-colors text-lg">{user.description}</p>
                    
                    {/* Learn more link */}
                    <div className={`mt-6 inline-flex items-center ${colors.text} opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 font-medium`}>
                      <span>了解服務</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" data-section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">用戶見證</h2>
            <p className="text-xl text-dark-200 max-w-3xl mx-auto leading-relaxed">
              真實用戶的使用回饋，見證我們的服務品質
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full mt-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => {
              const isCustomer = index === 0
              const colors = isCustomer 
                ? { bg: 'from-primary-500/10 to-blue-500/10', border: 'border-primary-500/30', accent: 'text-primary-400' }
                : { bg: 'from-green-500/10 to-emerald-500/10', border: 'border-green-500/30', accent: 'text-green-400' }
              
              return (
                <div key={index} className="group relative">
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100 blur-xl`}></div>
                  
                  <div className={`relative bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-xl rounded-3xl p-10 border ${colors.border} transition-all duration-500 hover:scale-105 shadow-2xl`}>
                    {/* Quote mark */}
                    <div className={`absolute top-6 left-8 ${colors.accent} text-8xl font-serif opacity-20 group-hover:opacity-40 transition-opacity`}>“</div>
                    
                    {/* Rating stars */}
                    <div className="flex gap-1 mb-6 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 fill-current ${colors.accent}`} />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl leading-relaxed mb-8 relative z-10 text-white font-light italic">
                      {testimonial.quote}
                    </blockquote>
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center border ${colors.border} group-hover:scale-110 transition-transform`}>
                        <Users className={`w-8 h-8 ${colors.accent}`} />
                      </div>
                      <div>
                        <div className="font-bold text-xl text-white">{testimonial.author}</div>
                        <div className={`text-lg ${colors.accent} font-medium`}>{testimonial.location}</div>
                        <div className="text-dark-300 text-sm">驗證用戶</div>
                      </div>
                    </div>
                    
                    {/* User type badge */}
                    <div className={`absolute top-6 right-6 px-3 py-1 bg-gradient-to-r ${colors.bg} rounded-full border ${colors.border} text-sm font-medium ${colors.accent}`}>
                      {isCustomer ? '患者用戶' : '醫療機構'}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="cta" data-section className="mb-24">
          <div className="relative">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-3xl blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl animate-pulse delay-1000"></div>
            
            <div className="relative bg-gradient-to-br from-dark-800/90 to-dark-700/90 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-primary-500/30 shadow-2xl text-center overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    立即開始您的健康之旅
                  </h2>
                </div>
                
                <p className="text-xl md:text-2xl text-dark-200 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                  無論您是尋求專業醫療服務的患者，還是希望拓展業務的醫療機構，<span className="text-primary-200 font-semibold">ONEonone AI 平台</span>都是您的最佳選擇。
                </p>
                
                {/* Feature highlights */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="group bg-gradient-to-br from-primary-500/10 to-blue-500/10 rounded-2xl p-6 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:scale-105">
                    <Clock className="w-8 h-8 text-primary-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white mb-2">🎁 30天免費試用</h3>
                    <p className="text-dark-200 text-sm leading-relaxed group-hover:text-dark-200 transition-colors">
                      註冊即可獲得完整 AI 推薦和智能聊天機器人功能
                    </p>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
                    <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white mb-2">📞 24/7 專業支援</h3>
                    <p className="text-dark-200 text-sm leading-relaxed group-hover:text-dark-200 transition-colors">
                      內建聊天機器人和專業團隊隨時為您服務
                    </p>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                    <Globe className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white mb-2">🌍 全球領先技術</h3>
                    <p className="text-dark-200 text-sm leading-relaxed group-hover:text-dark-200 transition-colors">
                      與 AI Singapore 合作，採用最新 AI 技術
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <button className="group relative bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border border-primary-400/50">
                    <span className="relative z-10 flex items-center gap-3">
                      立即開始免費試用
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  
                  <button className="group px-12 py-4 border-2 border-primary-500 text-primary-400 rounded-2xl hover:bg-primary-500 hover:text-white transition-all duration-300 font-bold hover:scale-105 shadow-lg hover:shadow-2xl">
                    <span className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5" />
                      聯繫專業顧問
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
                
                {/* Event promotion */}
                <div className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/30">
                  <p className="text-orange-300 font-medium flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 fill-current" />
                    特別邀請：歡迎參加 SuperAI 2026 大會 (6月 10-11 日)
                    <Star className="w-5 h-5 fill-current" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" data-section>
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-blue-500/5 rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-primary-500/20 shadow-2xl text-center">
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">聯繫我們</h2>
                <p className="text-xl text-dark-200 max-w-2xl mx-auto leading-relaxed">
                  隨時聯繫我們的專業團隊，開始您的醫療旅遊之旅
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full mt-8"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {[
                  { icon: Globe, title: '官方網站', info: 'www.onetoonehealth.ai', color: 'primary' },
                  { icon: MessageCircle, title: '電子郵件', info: 'contact@onetoonehealth.ai', color: 'green' },
                  { icon: Users, title: '社交媒體', info: '@OneToOneHealthAI', color: 'purple' },
                  { icon: MapPin, title: '總部位置', info: '新加坡濱海灣金融中心', color: 'blue' }
                ].map((contact, index) => {
                  const colors = {
                    primary: { bg: 'from-primary-500/20 to-blue-500/20', border: 'border-primary-500/30', text: 'text-primary-400', icon: 'text-primary-400' },
                    green: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', text: 'text-green-400', icon: 'text-green-400' },
                    purple: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-400', icon: 'text-purple-400' },
                    blue: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', text: 'text-blue-400', icon: 'text-blue-400' }
                  }[contact.color]
                  
                  return (
                    <div key={index} className="group">
                      <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border ${colors.border} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}>
                        <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border ${colors.border}`}>
                          <contact.icon className={`w-8 h-8 ${colors.icon}`} />
                        </div>
                        <h3 className={`font-bold text-white mb-2 ${colors.text}`}>{contact.title}</h3>
                        <p className="text-dark-200 text-sm leading-relaxed group-hover:text-dark-200 transition-colors break-all">{contact.info}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Company motto with enhanced styling */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-r from-dark-800/80 to-dark-700/80 backdrop-blur-xl rounded-2xl p-8 border border-primary-500/30">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Heart className="w-8 h-8 text-red-400 animate-pulse" />
                    <h3 className="text-2xl md:text-3xl font-bold text-primary-200">
                      ONEonone 醫療旅遊 AI 平台
                    </h3>
                    <Heart className="w-8 h-8 text-red-400 animate-pulse" />
                  </div>
                  <p className="text-xl text-dark-200 font-light italic">
                    您的健康，您的旅程，我們的承諾 ❤️
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="flex justify-center gap-2 mt-6">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 animate-pulse`} style={{animationDelay: `${i * 200}ms`}}></div>
                    ))}
                  </div>
                </div>
              </div>
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