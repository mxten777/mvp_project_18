/**
 * 실시간 통신 엔진
 * WebSocket, WebRTC, 푸시 알림 등 실시간 협업 기능 통합
 */

// 실시간 메시지 인터페이스
export interface RealtimeMessage {
  id: string;
  type: 'text' | 'image' | 'file' | 'video_call' | 'screen_share' | 'system';
  content: string;
  senderId: string;
  senderName: string;
  roomId: string;
  timestamp: string;
  metadata?: {
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    callId?: string;
    duration?: number;
    participants?: string[];
  };
  reactions?: Array<{ userId: string; emoji: string; timestamp: string }>;
  isEdited?: boolean;
  replyTo?: string;
}

// 채팅방 인터페이스
export interface ChatRoom {
  id: string;
  name: string;
  type: 'private' | 'group' | 'public' | 'support';
  participants: Array<{
    userId: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'moderator' | 'member';
    status: 'online' | 'away' | 'busy' | 'offline';
    lastSeen?: string;
  }>;
  lastMessage?: RealtimeMessage;
  unreadCount: number;
  createdAt: string;
  settings: {
    allowFileSharing: boolean;
    allowVideoCalls: boolean;
    allowScreenShare: boolean;
    isEncrypted: boolean;
  };
}

// 화상 통화 인터페이스
export interface VideoCall {
  id: string;
  roomId: string;
  initiator: string;
  participants: Array<{
    userId: string;
    name: string;
    stream?: MediaStream;
    isVideoEnabled: boolean;
    isAudioEnabled: boolean;
    isScreenSharing: boolean;
  }>;
  status: 'initiating' | 'ringing' | 'connected' | 'ended';
  startTime?: string;
  endTime?: string;
  quality: 'high' | 'medium' | 'low';
}

// 문서 협업 인터페이스
export interface CollaborativeDocument {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'markdown' | 'rich_text';
  collaborators: Array<{
    userId: string;
    name: string;
    cursor?: { line: number; column: number };
    selection?: { start: number; end: number };
    color: string;
  }>;
  version: number;
  lastModified: string;
  isLocked: boolean;
  permissions: {
    [userId: string]: 'read' | 'write' | 'admin';
  };
}

// 알림 인터페이스
export interface RealtimeNotification {
  id: string;
  type: 'message' | 'call' | 'document' | 'system' | 'emergency';
  title: string;
  message: string;
  userId: string;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  timestamp: string;
  actions?: Array<{
    label: string;
    action: string;
    style: 'primary' | 'secondary' | 'danger';
  }>;
  metadata?: Record<string, any>;
}

// 실시간 통신 엔진 클래스
export class RealtimeEngine {
  private static instance: RealtimeEngine;
  private socket: WebSocket | null = null;
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private localStream: MediaStream | null = null;
  private rooms: Map<string, ChatRoom> = new Map();
  private messages: Map<string, RealtimeMessage[]> = new Map();
  private documents: Map<string, CollaborativeDocument> = new Map();
  private notifications: RealtimeNotification[] = [];
  private eventListeners: Map<string, Function[]> = new Map();
  
  private currentUserId: string = '';
  private currentUserName: string = '';
  private isConnected: boolean = false;

  private constructor() {
    this.initializeEngine();
  }

  static getInstance(): RealtimeEngine {
    if (!RealtimeEngine.instance) {
      RealtimeEngine.instance = new RealtimeEngine();
    }
    return RealtimeEngine.instance;
  }

  /**
   * 엔진 초기화
   */
  private initializeEngine(): void {
    // 기본 채팅방 생성
    this.createDefaultRooms();
    
    // 서비스 워커 등록 (푸시 알림용)
    this.registerServiceWorker();
    
    // 브라우저 알림 권한 요청
    this.requestNotificationPermission();
  }

  /**
   * WebSocket 연결
   */
  async connect(userId: string, userName: string): Promise<void> {
    this.currentUserId = userId;
    this.currentUserName = userName;

    try {
      // 실제 환경에서는 WebSocket 서버 URL 사용
      const wsUrl = 'ws://localhost:8080/ws'; // 시뮬레이션을 위한 URL
      
      // WebSocket 연결 시뮬레이션
      this.isConnected = true;
      this.emit('connected', { userId, userName });
      
      // 모의 메시지 생성
      this.simulateRealtimeMessages();
      
    } catch (error) {
      console.error('WebSocket 연결 실패:', error);
      this.emit('connection_error', error);
    }
  }

  /**
   * 연결 해제
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    // 모든 피어 연결 종료
    this.peerConnections.forEach((pc) => {
      pc.close();
    });
    this.peerConnections.clear();

    // 로컬 스트림 종료
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    this.isConnected = false;
    this.emit('disconnected');
  }

  /**
   * 메시지 전송
   */
  async sendMessage(roomId: string, content: string, type: RealtimeMessage['type'] = 'text'): Promise<RealtimeMessage> {
    const message: RealtimeMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      content,
      senderId: this.currentUserId,
      senderName: this.currentUserName,
      roomId,
      timestamp: new Date().toISOString()
    };

    // 메시지 저장
    const roomMessages = this.messages.get(roomId) || [];
    roomMessages.push(message);
    this.messages.set(roomId, roomMessages);

    // 채팅방 정보 업데이트
    const room = this.rooms.get(roomId);
    if (room) {
      room.lastMessage = message;
      room.participants.forEach(participant => {
        if (participant.userId !== this.currentUserId) {
          participant.status = 'online'; // 시뮬레이션
        }
      });
    }

    // 실시간 전송 시뮬레이션
    setTimeout(() => {
      this.emit('message', message);
      this.emit('room_updated', room);
    }, 100);

    return message;
  }

  /**
   * 화상 통화 시작
   */
  async startVideoCall(roomId: string, participants: string[]): Promise<VideoCall> {
    const callId = `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // 로컬 미디어 스트림 획득
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      const videoCall: VideoCall = {
        id: callId,
        roomId,
        initiator: this.currentUserId,
        participants: [
          {
            userId: this.currentUserId,
            name: this.currentUserName,
            stream: this.localStream,
            isVideoEnabled: true,
            isAudioEnabled: true,
            isScreenSharing: false
          },
          ...participants.map(userId => ({
            userId,
            name: `User ${userId}`,
            isVideoEnabled: true,
            isAudioEnabled: true,
            isScreenSharing: false
          }))
        ],
        status: 'initiating',
        quality: 'high'
      };

      // WebRTC 피어 연결 설정
      for (const participantId of participants) {
        await this.createPeerConnection(participantId, callId);
      }

      // 통화 시작 알림
      this.emit('call_started', videoCall);
      
      return videoCall;

    } catch (error) {
      console.error('화상 통화 시작 실패:', error);
      throw error;
    }
  }

  /**
   * 화면 공유 시작
   */
  async startScreenShare(): Promise<MediaStream> {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });

      this.emit('screen_share_started', screenStream);
      return screenStream;

    } catch (error) {
      console.error('화면 공유 시작 실패:', error);
      throw error;
    }
  }

  /**
   * 문서 협업 시작
   */
  async createDocument(title: string, type: CollaborativeDocument['type'] = 'text'): Promise<CollaborativeDocument> {
    const document: CollaborativeDocument = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      content: '',
      type,
      collaborators: [{
        userId: this.currentUserId,
        name: this.currentUserName,
        color: this.generateUserColor(this.currentUserId)
      }],
      version: 1,
      lastModified: new Date().toISOString(),
      isLocked: false,
      permissions: {
        [this.currentUserId]: 'admin'
      }
    };

    this.documents.set(document.id, document);
    this.emit('document_created', document);
    
    return document;
  }

  /**
   * 문서 업데이트
   */
  async updateDocument(documentId: string, content: string, cursor?: { line: number; column: number }): Promise<void> {
    const document = this.documents.get(documentId);
    if (!document) return;

    document.content = content;
    document.version++;
    document.lastModified = new Date().toISOString();

    // 커서 위치 업데이트
    const collaborator = document.collaborators.find(c => c.userId === this.currentUserId);
    if (collaborator && cursor) {
      collaborator.cursor = cursor;
    }

    this.documents.set(documentId, document);
    this.emit('document_updated', document);
  }

  /**
   * 알림 생성
   */
  createNotification(notification: Omit<RealtimeNotification, 'id' | 'timestamp' | 'isRead'>): RealtimeNotification {
    const newNotification: RealtimeNotification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    this.notifications.unshift(newNotification);
    
    // 최대 100개까지만 보관
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100);
    }

    this.emit('notification', newNotification);
    
    // 브라우저 알림 표시
    this.showBrowserNotification(newNotification);
    
    return newNotification;
  }

  /**
   * 이벤트 리스너 등록
   */
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  /**
   * 이벤트 발생
   */
  private emit(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event) || [];
    listeners.forEach(callback => callback(data));
  }

  // === 유틸리티 메서드들 ===

  private createDefaultRooms(): void {
    const defaultRooms: ChatRoom[] = [
      {
        id: 'general',
        name: '일반 채팅',
        type: 'public',
        participants: [
          {
            userId: 'system',
            name: '시스템',
            role: 'admin',
            status: 'online'
          }
        ],
        unreadCount: 0,
        createdAt: new Date().toISOString(),
        settings: {
          allowFileSharing: true,
          allowVideoCalls: true,
          allowScreenShare: true,
          isEncrypted: false
        }
      },
      {
        id: 'support',
        name: '고객 지원',
        type: 'support',
        participants: [
          {
            userId: 'support',
            name: '지원팀',
            role: 'admin',
            status: 'online'
          }
        ],
        unreadCount: 0,
        createdAt: new Date().toISOString(),
        settings: {
          allowFileSharing: true,
          allowVideoCalls: true,
          allowScreenShare: true,
          isEncrypted: true
        }
      }
    ];

    defaultRooms.forEach(room => {
      this.rooms.set(room.id, room);
    });
  }

  private async createPeerConnection(participantId: string, callId: string): Promise<RTCPeerConnection> {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };

    const peerConnection = new RTCPeerConnection(configuration);
    
    // 로컬 스트림 추가
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, this.localStream!);
      });
    }

    // 원격 스트림 처리
    peerConnection.ontrack = (event) => {
      this.emit('remote_stream', {
        participantId,
        stream: event.streams[0]
      });
    };

    this.peerConnections.set(participantId, peerConnection);
    return peerConnection;
  }

  private simulateRealtimeMessages(): void {
    // 시뮬레이션을 위한 모의 메시지들
    setTimeout(() => {
      this.createNotification({
        type: 'system',
        title: '시스템 알림',
        message: '실시간 통신 시스템이 활성화되었습니다.',
        userId: this.currentUserId,
        priority: 'normal'
      });
    }, 2000);

    setTimeout(() => {
      const welcomeMessage: RealtimeMessage = {
        id: 'welcome_msg',
        type: 'system',
        content: '실시간 채팅 시스템에 오신 것을 환영합니다! 🎉',
        senderId: 'system',
        senderName: '시스템',
        roomId: 'general',
        timestamp: new Date().toISOString()
      };
      
      const roomMessages = this.messages.get('general') || [];
      roomMessages.push(welcomeMessage);
      this.messages.set('general', roomMessages);
      
      this.emit('message', welcomeMessage);
    }, 3000);
  }

  private generateUserColor(userId: string): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'
    ];
    const index = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  }

  private async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        // 서비스 워커 등록 시뮬레이션
        console.log('서비스 워커가 등록되었습니다.');
      } catch (error) {
        console.error('서비스 워커 등록 실패:', error);
      }
    }
  }

  private async requestNotificationPermission(): Promise<void> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      console.log('알림 권한:', permission);
    }
  }

  private showBrowserNotification(notification: RealtimeNotification): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }
  }

  // === 퍼블릭 게터 메서드들 ===

  getRooms(): ChatRoom[] {
    return Array.from(this.rooms.values());
  }

  getRoom(roomId: string): ChatRoom | undefined {
    return this.rooms.get(roomId);
  }

  getMessages(roomId: string): RealtimeMessage[] {
    return this.messages.get(roomId) || [];
  }

  getDocuments(): CollaborativeDocument[] {
    return Array.from(this.documents.values());
  }

  getDocument(documentId: string): CollaborativeDocument | undefined {
    return this.documents.get(documentId);
  }

  getNotifications(): RealtimeNotification[] {
    return this.notifications;
  }

  getUnreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  isEngineConnected(): boolean {
    return this.isConnected;
  }

  getCurrentUser(): { id: string; name: string } {
    return {
      id: this.currentUserId,
      name: this.currentUserName
    };
  }

  // 알림 읽음 처리
  markNotificationAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.emit('notification_read', notification);
    }
  }

  // 모든 알림 읽음 처리
  markAllNotificationsAsRead(): void {
    this.notifications.forEach(notification => {
      notification.isRead = true;
    });
    this.emit('all_notifications_read');
  }
}

// 전역 실시간 엔진 인스턴스
export const realtimeEngine = RealtimeEngine.getInstance();

// 편의 함수들
export const connectRealtime = (userId: string, userName: string) =>
  realtimeEngine.connect(userId, userName);

export const sendRealtimeMessage = (roomId: string, content: string, type?: RealtimeMessage['type']) =>
  realtimeEngine.sendMessage(roomId, content, type);

export const startVideoCall = (roomId: string, participants: string[]) =>
  realtimeEngine.startVideoCall(roomId, participants);

export const createCollaborativeDocument = (title: string, type?: CollaborativeDocument['type']) =>
  realtimeEngine.createDocument(title, type);

export const createRealtimeNotification = (notification: Omit<RealtimeNotification, 'id' | 'timestamp' | 'isRead'>) =>
  realtimeEngine.createNotification(notification);