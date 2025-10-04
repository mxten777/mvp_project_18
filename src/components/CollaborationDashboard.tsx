/**
 * 실시간 협업 대시보드
 * 채팅, 화상통화, 문서협업, 알림 등을 통합 관리
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  BellIcon,
  UsersIcon,
  ShareIcon,
  ClockIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import RealtimeChat from './RealtimeChat';
import VideoCallSystem from './VideoCallSystem';
import NotificationSystem from './NotificationSystem';
import { realtimeEngine } from '../utils/realtimeEngine';

interface CollaborationDashboardProps {
  userId?: string;
  userName?: string;
  className?: string;
}

const CollaborationDashboard: React.FC<CollaborationDashboardProps> = ({
  userId = 'demo-user',
  userName = '사용자',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isConnected, setIsConnected] = useState(false);
  const [activeCall, setActiveCall] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [activeSessions, setActiveSessions] = useState<number>(0);

  const tabs = [
    { id: 'overview', label: '대시보드', icon: UsersIcon },
    { id: 'chat', label: '실시간 채팅', icon: ChatBubbleLeftRightIcon },
    { id: 'video', label: '화상 통화', icon: VideoCameraIcon },
    { id: 'documents', label: '문서 협업', icon: DocumentTextIcon },
    { id: 'notifications', label: '알림 센터', icon: BellIcon }
  ];

  const activities = [
    { 
      id: 1, 
      type: 'message', 
      user: '김담당자', 
      action: '새 메시지를 보냈습니다',
      time: '2분 전',
      icon: ChatBubbleLeftRightIcon,
      color: 'text-blue-500'
    },
    { 
      id: 2, 
      type: 'call', 
      user: '이상담사', 
      action: '화상 통화를 시작했습니다',
      time: '5분 전',
      icon: VideoCameraIcon,
      color: 'text-green-500'
    },
    { 
      id: 3, 
      type: 'document', 
      user: '박관리자', 
      action: '문서를 공유했습니다',
      time: '10분 전',
      icon: DocumentTextIcon,
      color: 'text-purple-500'
    },
    { 
      id: 4, 
      type: 'join', 
      user: '최직원', 
      action: '채팅방에 참여했습니다',
      time: '15분 전',
      icon: UsersIcon,
      color: 'text-orange-500'
    }
  ];

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      await realtimeEngine.connect(userId, userName);
      setIsConnected(true);
      
      // 실시간 데이터 업데이트 시뮬레이션
      setOnlineUsers(12);
      setTotalMessages(347);
      setActiveSessions(8);
      
      // 이벤트 리스너 등록
      realtimeEngine.on('user_count_changed', setOnlineUsers);
      realtimeEngine.on('message_count_changed', setTotalMessages);
      
    } catch (error) {
      console.error('대시보드 초기화 실패:', error);
    }
  };

  const startVideoCall = () => {
    setActiveCall('new-call');
    setActiveTab('video');
  };

  const endVideoCall = () => {
    setActiveCall(null);
    setActiveTab('overview');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">온라인 사용자</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{onlineUsers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">실시간 활성</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">총 메시지</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalMessages}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-green-600 dark:text-green-400">+23 오늘</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">활성 세션</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeSessions}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <ShareIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-blue-600 dark:text-blue-400">3개 화상통화</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">연결 상태</p>
              <p className={`text-2xl font-bold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? '연결됨' : '연결 중'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isConnected 
                ? 'bg-green-100 dark:bg-green-900/20' 
                : 'bg-red-100 dark:bg-red-900/20'
            }`}>
              <div className={`w-6 h-6 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">실시간 동기화</span>
          </div>
        </motion.div>
      </div>

      {/* 빠른 액션 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">빠른 작업</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab('chat')}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">채팅 시작</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">실시간 메시징</p>
              </div>
            </div>
          </button>

          <button
            onClick={startVideoCall}
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <VideoCameraIcon className="h-8 w-8 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">화상 통화</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">비디오 미팅</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">문서 협업</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">공동 편집</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">최근 활동</h3>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-gray-800`}>
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  <span className="font-semibold">{activity.user}</span>님이 {activity.action}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">실시간 문서 협업</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: '서비스 개선 제안서', collaborators: 3, lastEdited: '5분 전' },
            { title: '월간 보고서', collaborators: 2, lastEdited: '1시간 전' },
            { title: '고객 만족도 조사', collaborators: 5, lastEdited: '2시간 전' }
          ].map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">{doc.title}</h4>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <UsersIcon className="h-3 w-3 mr-1" />
                  {doc.collaborators}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                마지막 편집: {doc.lastEdited}
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                  편집하기
                </button>
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  공유
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors">
            + 새 문서 만들기
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              실시간 협업 센터
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              팀과 함께 실시간으로 소통하고 협업하세요
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationSystem userId={userId} />
            <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isConnected ? '온라인' : '오프라인'}
              </span>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'chat' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-[600px]">
                <RealtimeChat userId={userId} userName={userName} className="h-full" />
              </div>
            )}
            {activeTab === 'video' && (
              <div className="bg-gray-900 rounded-xl overflow-hidden h-[600px]">
                <VideoCallSystem 
                  callId={activeCall || undefined} 
                  onCallEnd={endVideoCall}
                  className="h-full"
                />
              </div>
            )}
            {activeTab === 'documents' && renderDocuments()}
            {activeTab === 'notifications' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">알림 설정</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  실시간 알림 시스템이 활성화되어 있습니다. 
                  상단의 알림 아이콘을 클릭하여 알림을 확인하세요.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CollaborationDashboard;