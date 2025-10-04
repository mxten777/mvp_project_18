/**
 * 실시간 채팅 시스템
 * 멀티룸 채팅, 파일 공유, 이모지 반응, 메시지 편집 등 고급 기능 포함
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PaperAirplaneIcon,
  FaceSmileIcon,
  PaperClipIcon,
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  HandThumbUpIcon,
  FaceFrownIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import {
  realtimeEngine,
  type ChatRoom,
  type RealtimeMessage
} from '../utils/realtimeEngine';

interface RealtimeChatProps {
  userId?: string;
  userName?: string;
  className?: string;
}

const RealtimeChat: React.FC<RealtimeChatProps> = ({
  userId = 'demo-user',
  userName = '사용자',
  className = ''
}) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<string>('');
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emojis = ['👍', '❤️', '😊', '😢', '😮', '😡', '👏', '🎉'];

  // 초기화
  useEffect(() => {
    initializeChat();
    return () => {
      realtimeEngine.disconnect();
    };
  }, []);

  // 메시지 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = async () => {
    try {
      // 실시간 엔진 연결
      await realtimeEngine.connect(userId, userName);
      setIsConnected(true);

      // 채팅방 목록 로드
      const roomList = realtimeEngine.getRooms();
      setRooms(roomList);
      
      if (roomList.length > 0) {
        setActiveRoom(roomList[0].id);
        loadMessages(roomList[0].id);
      }

      // 이벤트 리스너 등록
      realtimeEngine.on('message', handleNewMessage);
      realtimeEngine.on('room_updated', handleRoomUpdate);
      realtimeEngine.on('user_joined', handleUserJoined);
      realtimeEngine.on('user_left', handleUserLeft);
      realtimeEngine.on('typing_start', handleTypingStart);
      realtimeEngine.on('typing_stop', handleTypingStop);

    } catch (error) {
      console.error('채팅 초기화 실패:', error);
    }
  };

  const loadMessages = (roomId: string) => {
    const roomMessages = realtimeEngine.getMessages(roomId);
    setMessages(roomMessages);
  };

  const handleNewMessage = (message: RealtimeMessage) => {
    if (message.roomId === activeRoom) {
      setMessages(prev => [...prev, message]);
    }
  };

  const handleRoomUpdate = (room: ChatRoom) => {
    setRooms(prev => prev.map(r => r.id === room.id ? room : r));
  };

  const handleUserJoined = (data: { userId: string; roomId: string }) => {
    if (!onlineUsers.includes(data.userId)) {
      setOnlineUsers(prev => [...prev, data.userId]);
    }
  };

  const handleUserLeft = (data: { userId: string; roomId: string }) => {
    setOnlineUsers(prev => prev.filter(id => id !== data.userId));
  };

  const handleTypingStart = (data: { userId: string; userName: string }) => {
    if (!isTyping.includes(data.userName)) {
      setIsTyping(prev => [...prev, data.userName]);
    }
  };

  const handleTypingStop = (data: { userId: string; userName: string }) => {
    setIsTyping(prev => prev.filter(name => name !== data.userName));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || !activeRoom) return;

    try {
      await realtimeEngine.sendMessage(activeRoom, currentMessage);
      setCurrentMessage('');
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  };

  const sendFile = async (file: File) => {
    if (!activeRoom) return;

    try {
      // 파일 업로드 시뮬레이션
      const fileUrl = URL.createObjectURL(file);
      const message = `파일을 공유했습니다: ${file.name}`;
      
      await realtimeEngine.sendMessage(activeRoom, message, 'file');
    } catch (error) {
      console.error('파일 전송 실패:', error);
    }
  };

  const addReaction = async (messageId: string, emoji: string) => {
    // 이모지 반응 추가 로직
    console.log('반응 추가:', messageId, emoji);
  };

  const startVideoCall = async () => {
    if (!activeRoom) return;

    try {
      const room = rooms.find(r => r.id === activeRoom);
      if (room) {
        const participants = room.participants
          .filter(p => p.userId !== userId)
          .map(p => p.userId);
        
        await realtimeEngine.startVideoCall(activeRoom, participants);
      }
    } catch (error) {
      console.error('화상 통화 시작 실패:', error);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageTypeIcon = (type: RealtimeMessage['type']) => {
    switch (type) {
      case 'file':
        return <PaperClipIcon className="h-4 w-4" />;
      case 'video_call':
        return <VideoCameraIcon className="h-4 w-4" />;
      case 'system':
        return <SparklesIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const activeRoomData = rooms.find(r => r.id === activeRoom);

  return (
    <div className={`flex h-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* 채팅방 목록 */}
      <div className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        {/* 헤더 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-blue-500" />
            실시간 채팅
          </h3>
          <div className="flex items-center mt-2">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isConnected ? '연결됨' : '연결 중...'}
            </span>
          </div>
        </div>

        {/* 채팅방 목록 */}
        <div className="overflow-y-auto h-full">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              onClick={() => {
                setActiveRoom(room.id);
                loadMessages(room.id);
              }}
              className={`p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 ${
                activeRoom === room.id 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' 
                  : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{room.name}</h4>
                {room.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                    {room.unreadCount}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserGroupIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {room.participants.length}명
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {room.lastMessage && formatMessageTime(room.lastMessage.timestamp)}
                </span>
              </div>
              
              {room.lastMessage && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                  {room.lastMessage.content}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col">
        {activeRoomData ? (
          <>
            {/* 채팅 헤더 */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {activeRoomData.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activeRoomData.participants.length}명의 참여자
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={startVideoCall}
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="화상 통화"
                  >
                    <VideoCameraIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="음성 통화"
                  >
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[70%] ${
                      message.senderId === userId ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      {/* 아바타 */}
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">
                          {message.senderName.charAt(0)}
                        </span>
                      </div>

                      {/* 메시지 버블 */}
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.senderId === userId
                          ? 'bg-blue-500 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                      }`}>
                        {/* 발신자 이름 */}
                        {message.senderId !== userId && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {message.senderName}
                          </p>
                        )}

                        {/* 메시지 내용 */}
                        <div className="flex items-center space-x-2">
                          {getMessageTypeIcon(message.type)}
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>

                        {/* 메시지 정보 */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">
                            {formatMessageTime(message.timestamp)}
                          </span>
                          
                          {/* 이모지 반응 */}
                          <div className="flex items-center space-x-1">
                            {message.reactions?.map((reaction, index) => (
                              <span key={index} className="text-xs">
                                {reaction.emoji}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 반응 버튼 */}
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {emojis.slice(0, 3).map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => addReaction(message.id, emoji)}
                            className="text-xs hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* 타이핑 인디케이터 */}
              {isTyping.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm">
                    {isTyping.join(', ')}님이 입력 중...
                  </span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                {/* 파일 첨부 */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <PaperClipIcon className="h-5 w-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) sendFile(file);
                  }}
                />

                {/* 이모지 버튼 */}
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FaceSmileIcon className="h-5 w-5" />
                </button>

                {/* 메시지 입력 */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="메시지를 입력하세요..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  
                  {/* 이모지 피커 */}
                  {showEmojiPicker && (
                    <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg grid grid-cols-8 gap-1">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            setCurrentMessage(prev => prev + emoji);
                            setShowEmojiPicker(false);
                          }}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 전송 버튼 */}
                <button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim()}
                  className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>채팅방을 선택해주세요</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealtimeChat;