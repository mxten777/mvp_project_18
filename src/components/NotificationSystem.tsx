/**
 * 실시간 알림 시스템
 * 푸시 알림, 토스트 메시지, 알림 센터 통합
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  DocumentIcon,
  UserIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import {
  realtimeEngine,
  type RealtimeNotification
} from '../utils/realtimeEngine';

interface NotificationSystemProps {
  userId?: string;
  className?: string;
}

interface ToastNotification extends RealtimeNotification {
  isVisible: boolean;
  autoHide?: boolean;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  userId = 'demo-user',
  className = ''
}) => {
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([]);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // 실시간 엔진 이벤트 리스너
    realtimeEngine.on('notification', handleNewNotification);
    realtimeEngine.on('notification_read', handleNotificationRead);
    
    // 초기 알림 로드
    loadNotifications();
    
    // 데모 알림 생성
    generateDemoNotifications();

    return () => {
      // 이벤트 리스너 정리는 실제 구현에서 필요
    };
  }, []);

  const loadNotifications = () => {
    const allNotifications = realtimeEngine.getNotifications();
    setNotifications(allNotifications);
    updateUnreadCount(allNotifications);
  };

  const updateUnreadCount = (notificationList: RealtimeNotification[]) => {
    const unread = notificationList.filter(n => !n.isRead).length;
    setUnreadCount(unread);
  };

  const handleNewNotification = (notification: RealtimeNotification) => {
    setNotifications(prev => [notification, ...prev]);
    setUnreadCount(prev => prev + 1);
    
    // 토스트 표시
    showToast(notification);
  };

  const handleNotificationRead = (notification: RealtimeNotification) => {
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const showToast = (notification: RealtimeNotification) => {
    const toast: ToastNotification = {
      ...notification,
      isVisible: true,
      autoHide: notification.priority !== 'urgent'
    };

    setToasts(prev => [...prev, toast]);

    // 자동 숨김 (긴급하지 않은 경우)
    if (toast.autoHide) {
      setTimeout(() => {
        hideToast(toast.id);
      }, 5000);
    }
  };

  const hideToast = (toastId: string) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  };

  const markAsRead = (notificationId: string) => {
    realtimeEngine.markNotificationAsRead(notificationId);
  };

  const markAllAsRead = () => {
    realtimeEngine.markAllNotificationsAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const handleNotificationAction = (notification: RealtimeNotification, actionIndex: number) => {
    const action = notification.actions?.[actionIndex];
    if (action) {
      console.log('알림 액션 실행:', action.action);
      // 실제 액션 처리 로직
      markAsRead(notification.id);
    }
  };

  const generateDemoNotifications = () => {
    setTimeout(() => {
      realtimeEngine.createNotification({
        type: 'message',
        title: '새 메시지',
        message: '김담당자님이 메시지를 보냈습니다.',
        userId,
        priority: 'normal',
        actions: [
          { label: '확인', action: 'view_message', style: 'primary' },
          { label: '나중에', action: 'dismiss', style: 'secondary' }
        ]
      });
    }, 2000);

    setTimeout(() => {
      realtimeEngine.createNotification({
        type: 'call',
        title: '화상 통화 요청',
        message: '이상담사님이 화상 통화를 요청했습니다.',
        userId,
        priority: 'high',
        actions: [
          { label: '수락', action: 'accept_call', style: 'primary' },
          { label: '거절', action: 'decline_call', style: 'danger' }
        ]
      });
    }, 5000);

    setTimeout(() => {
      realtimeEngine.createNotification({
        type: 'system',
        title: '시스템 업데이트',
        message: '새로운 기능이 추가되었습니다. 확인해보세요!',
        userId,
        priority: 'low'
      });
    }, 8000);
  };

  const getNotificationIcon = (type: RealtimeNotification['type']) => {
    switch (type) {
      case 'message':
        return <ChatBubbleLeftIcon className="h-5 w-5" />;
      case 'call':
        return <PhoneIcon className="h-5 w-5" />;
      case 'document':
        return <DocumentIcon className="h-5 w-5" />;
      case 'system':
        return <InformationCircleIcon className="h-5 w-5" />;
      case 'emergency':
        return <ExclamationTriangleIcon className="h-5 w-5" />;
      default:
        return <BellIcon className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: RealtimeNotification['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'high':
        return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'normal':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'low':
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return `${Math.floor(diffInMinutes / 1440)}일 전`;
  };

  return (
    <>
      {/* 알림 벨 아이콘 */}
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
        >
          <BellIcon className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        {/* 알림 패널 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 flex flex-col"
            >
              {/* 헤더 */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    알림
                  </h3>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        모두 읽음
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 알림 목록 */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <BellIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>새로운 알림이 없습니다</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                          !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${getPriorityColor(notification.priority)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-2">
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                  <ClockIcon className="h-3 w-3 mr-1" />
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              {notification.message}
                            </p>
                            
                            {/* 액션 버튼들 */}
                            {notification.actions && notification.actions.length > 0 && (
                              <div className="flex space-x-2 mt-3">
                                {notification.actions.map((action, index) => (
                                  <button
                                    key={index}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleNotificationAction(notification, index);
                                    }}
                                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                                      action.style === 'primary'
                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                        : action.style === 'danger'
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                                    }`}
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 토스트 알림들 */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`max-w-sm bg-white dark:bg-gray-800 border-l-4 rounded-lg shadow-lg p-4 ${
                toast.priority === 'urgent' ? 'border-red-500' :
                toast.priority === 'high' ? 'border-orange-500' :
                toast.priority === 'normal' ? 'border-blue-500' : 'border-gray-500'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-1 rounded ${getPriorityColor(toast.priority)}`}>
                  {getNotificationIcon(toast.type)}
                </div>
                
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {toast.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {toast.message}
                  </p>
                  
                  {/* 토스트 액션 버튼들 */}
                  {toast.actions && (
                    <div className="flex space-x-2 mt-2">
                      {toast.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleNotificationAction(toast, index);
                            hideToast(toast.id);
                          }}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            action.style === 'primary'
                              ? 'bg-blue-500 text-white hover:bg-blue-600'
                              : action.style === 'danger'
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => hideToast(toast.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 배경 클릭 시 패널 닫기 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default NotificationSystem;