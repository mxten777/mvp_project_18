export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'service_info' | 'contact_info';
  metadata?: {
    serviceType?: string;
    urgency?: 'low' | 'medium' | 'high';
    confidence?: number;
  };
}

export interface QuickReply {
  id: string;
  text: string;
  action: string;
}

export class AIChatbotService {
  private readonly responses: Record<string, { 
    text: string; 
    quickReplies?: QuickReply[];
    followUp?: string;
    serviceType?: string;
  }> = {
    greeting: {
      text: "안녕하세요! 바이칼 재가복지센터 AI 상담사 소피아입니다. 🤖✨\n\n어르신의 돌봄 서비스에 대해 궁금한 점이 있으시면 언제든 물어보세요!",
      quickReplies: [
        { id: 'services', text: '서비스 종류', action: 'show_services' },
        { id: 'cost', text: '비용 문의', action: 'ask_cost' },
        { id: 'urgent', text: '긴급 상담', action: 'urgent_consultation' },
        { id: 'application', text: '신청 방법', action: 'how_to_apply' }
      ]
    },
    
    services: {
      text: "저희가 제공하는 주요 서비스는 다음과 같습니다:\n\n🏠 **방문요양** - 일상생활 지원, 신체활동 도움\n👩‍⚕️ **방문간호** - 건강관리, 투약관리, 상처처치\n🛁 **방문목욕** - 전문 목욕 서비스\n🌅 **주야간보호** - 낮시간/야간 돌봄 서비스\n\n어떤 서비스에 대해 더 자세히 알고 싶으신가요?",
      quickReplies: [
        { id: 'visiting_care', text: '방문요양 상세', action: 'detail_visiting_care' },
        { id: 'visiting_nursing', text: '방문간호 상세', action: 'detail_visiting_nursing' },
        { id: 'cost_inquiry', text: '비용 문의', action: 'ask_cost' },
        { id: 'consultation', text: '상담 신청', action: 'book_consultation' }
      ]
    },

    visiting_care: {
      text: "🏠 **방문요양 서비스** 상세 안내\n\n✅ **신체활동 지원**\n- 목욕, 세면, 구강관리\n- 식사 보조, 체위 변경\n- 이동 및 보행 지원\n\n✅ **가사활동 지원**\n- 취사, 생필품 구매\n- 청소, 세탁\n- 약물 복용 관리\n\n📋 **이용 조건**: 장기요양 1~5등급\n⏰ **서비스 시간**: 월 30~60시간\n💰 **본인부담금**: 월 8만원~15만원",
      serviceType: 'visiting_care',
      quickReplies: [
        { id: 'cost_detail', text: '정확한 비용', action: 'cost_detail' },
        { id: 'application', text: '신청하기', action: 'apply_service' },
        { id: 'other_services', text: '다른 서비스', action: 'show_services' }
      ]
    },

    visiting_nursing: {
      text: "👩‍⚕️ **방문간호 서비스** 상세 안내\n\n✅ **건강관리**\n- 혈압, 혈당 측정\n- 상처 관리 및 드레싱\n- 욕창 예방 및 관리\n\n✅ **투약관리**\n- 복약 지도\n- 주사 및 수액 관리\n- 의료기기 사용법 교육\n\n📋 **이용 조건**: 의사 소견서 필요\n⏰ **서비스 시간**: 주 1~3회, 회당 30분~1시간\n💰 **본인부담금**: 회당 6,000원~12,000원",
      serviceType: 'visiting_nursing',
      quickReplies: [
        { id: 'nursing_cost', text: '비용 상세', action: 'nursing_cost' },
        { id: 'doctor_note', text: '소견서 문의', action: 'doctor_note' },
        { id: 'book_nursing', text: '간호 상담', action: 'book_nursing_consultation' }
      ]
    },

    cost_inquiry: {
      text: "💰 **서비스 비용 안내**\n\n🎯 **국가 지원**: 전체 비용의 **85~90%** 지원\n👤 **본인 부담**: 10~15%만 지불\n\n📊 **예상 비용 (월간)**\n• 방문요양: 8만원~15만원\n• 방문간호: 3만원~8만원\n• 방문목욕: 2만원~4만원\n• 주야간보호: 12만원~20만원\n\n💡 **추가 혜택**\n• 기초생활수급자: 무료\n• 차상위계층: 50% 추가 할인\n\n정확한 비용은 등급과 이용시간에 따라 달라집니다.",
      quickReplies: [
        { id: 'grade_check', text: '등급 확인', action: 'check_grade' },
        { id: 'cost_calculation', text: '비용 계산', action: 'calculate_cost' },
        { id: 'consultation', text: '상담 신청', action: 'book_consultation' }
      ]
    },

    urgent: {
      text: "🚨 **긴급 상담 접수**\n\n즉시 도움이 필요한 상황이시군요.\n전문 상담사가 **24시간 내** 연락드리겠습니다.\n\n📞 **긴급 연락처**\n• 대표번호: 02-1234-5678\n• 응급상황: 119 (응급실)\n• 야간상담: 02-1234-9999\n\n현재 상황을 간단히 알려주시면 더 신속한 도움을 드릴 수 있습니다.",
      quickReplies: [
        { id: 'emergency_call', text: '즉시 통화', action: 'emergency_call' },
        { id: 'describe_situation', text: '상황 설명', action: 'describe_emergency' },
        { id: 'location_info', text: '위치 정보', action: 'provide_location' }
      ]
    },

    application: {
      text: "📋 **서비스 신청 방법**\n\n**1단계: 등급 신청**\n• 국민건강보험공단 방문\n• 장기요양인정 신청서 제출\n• 의사 소견서 첨부\n\n**2단계: 등급 판정**\n• 방문조사 (약 1주일 후)\n• 등급 판정 (조사 후 1주일)\n\n**3단계: 서비스 선택**\n• 바이칼 재가복지센터 상담\n• 맞춤형 서비스 계획 수립\n• 계약 체결 및 서비스 시작\n\n💡 **전 과정 무료 상담** 지원해드립니다!",
      quickReplies: [
        { id: 'help_application', text: '신청 도움', action: 'help_with_application' },
        { id: 'required_documents', text: '필요 서류', action: 'show_documents' },
        { id: 'consultation', text: '상담 예약', action: 'book_consultation' }
      ]
    }
  };

  private readonly fallbackResponses = [
    "죄송합니다. 정확히 이해하지 못했어요. 다시 한 번 말씀해 주시겠어요? 🤔",
    "더 구체적으로 설명해 주시면 더 나은 답변을 드릴 수 있어요! 😊",
    "전문 상담사와 연결해 드릴까요? 더 정확한 정보를 제공받으실 수 있어요. 📞"
  ];

  generateResponse(userMessage: string, context?: any): {
    message: ChatMessage;
    quickReplies?: QuickReply[];
  } {
    const messageId = Date.now().toString();
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    // 키워드 기반 응답 매칭
    let responseKey = this.matchKeyword(normalizedMessage);
    let response = this.responses[responseKey];
    
    if (!response) {
      // 폴백 응답
      const fallbackText = this.fallbackResponses[
        Math.floor(Math.random() * this.fallbackResponses.length)
      ];
      
      return {
        message: {
          id: messageId,
          content: fallbackText,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
          metadata: { confidence: 0.3 }
        },
        quickReplies: [
          { id: 'services', text: '서비스 안내', action: 'show_services' },
          { id: 'consultation', text: '상담사 연결', action: 'book_consultation' },
          { id: 'help', text: '도움말', action: 'show_help' }
        ]
      };
    }

    // 응답 메시지 생성
    const chatMessage: ChatMessage = {
      id: messageId,
      content: response.text,
      sender: 'bot',
      timestamp: new Date(),
      type: response.serviceType ? 'service_info' : 'text',
      metadata: {
        serviceType: response.serviceType,
        confidence: 0.9,
        urgency: this.detectUrgency(normalizedMessage)
      }
    };

    return {
      message: chatMessage,
      quickReplies: response.quickReplies
    };
  }

  private matchKeyword(message: string): string {
    const keywordMap: Record<string, string[]> = {
      greeting: ['안녕', '처음', '시작', '도움', '상담'],
      services: ['서비스', '종류', '무엇', '뭐', '어떤'],
      visiting_care: ['방문요양', '요양', '일상생활', '신체활동', '가사'],
      visiting_nursing: ['방문간호', '간호', '건강', '투약', '상처', '혈압'],
      cost_inquiry: ['비용', '가격', '돈', '얼마', '부담금', '지원'],
      urgent: ['긴급', '응급', '급해', '빨리', '즉시', '지금'],
      application: ['신청', '방법', '절차', '어떻게', '등급']
    };

    for (const [key, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return key;
      }
    }

    return '';
  }

  private detectUrgency(message: string): 'low' | 'medium' | 'high' {
    const highUrgencyWords = ['긴급', '응급', '급해', '빨리', '즉시', '지금', '아파'];
    const mediumUrgencyWords = ['빠른', '상담', '문의', '도움'];
    
    if (highUrgencyWords.some(word => message.includes(word))) {
      return 'high';
    }
    if (mediumUrgencyWords.some(word => message.includes(word))) {
      return 'medium';
    }
    return 'low';
  }

  handleQuickReply(action: string): {
    message: ChatMessage;
    quickReplies?: QuickReply[];
  } {
    const actionMap: Record<string, string> = {
      show_services: 'services',
      ask_cost: 'cost_inquiry',
      urgent_consultation: 'urgent',
      how_to_apply: 'application',
      detail_visiting_care: 'visiting_care',
      detail_visiting_nursing: 'visiting_nursing',
      book_consultation: 'consultation_booking'
    };

    const responseKey = actionMap[action] || 'greeting';
    const response = this.responses[responseKey];

    if (!response) {
      return this.generateResponse('상담사 연결');
    }

    return {
      message: {
        id: Date.now().toString(),
        content: response.text,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      },
      quickReplies: response.quickReplies
    };
  }
}