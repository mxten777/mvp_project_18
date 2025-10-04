/**
 * 화상 통화 시스템
 * WebRTC 기반 멀티파티 화상 통화, 화면 공유, 채팅 통합
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  VideoCameraIcon,
  VideoCameraSlashIcon,
  MicrophoneIcon,
  PhoneXMarkIcon,
  ComputerDesktopIcon,
  ChatBubbleLeftIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon
} from '@heroicons/react/24/outline';
import {
  realtimeEngine,
  type VideoCall
} from '../utils/realtimeEngine';

interface VideoCallSystemProps {
  callId?: string;
  onCallEnd?: () => void;
  className?: string;
}

interface Participant {
  userId: string;
  name: string;
  stream?: MediaStream;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
}

const VideoCallSystem: React.FC<VideoCallSystemProps> = ({
  callId,
  onCallEnd,
  className = ''
}) => {
  const [currentCall, setCurrentCall] = useState<VideoCall | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const callContainerRef = useRef<HTMLDivElement>(null);

  // 통화 시간 카운터
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  // 로컬 미디어 스트림 초기화
  useEffect(() => {
    initializeLocalStream();
    return () => {
      cleanup();
    };
  }, []);

  const initializeLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      setLocalStream(stream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // 모의 참여자 추가
      const mockParticipants: Participant[] = [
        {
          userId: 'current-user',
          name: '나',
          stream,
          isVideoEnabled: true,
          isAudioEnabled: true,
          isScreenSharing: false
        },
        {
          userId: 'participant-1',
          name: '김담당자',
          isVideoEnabled: true,
          isAudioEnabled: true,
          isScreenSharing: false
        },
        {
          userId: 'participant-2',
          name: '이상담사',
          isVideoEnabled: true,
          isAudioEnabled: false,
          isScreenSharing: false
        }
      ];

      setParticipants(mockParticipants);
      setCallStatus('connected');

    } catch (error) {
      console.error('미디어 스트림 초기화 실패:', error);
      setCallStatus('ended');
    }
  };

  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
        
        // 참여자 목록 업데이트
        setParticipants(prev => prev.map(p => 
          p.userId === 'current-user' 
            ? { ...p, isVideoEnabled: videoTrack.enabled }
            : p
        ));
      }
    }
  }, [localStream]);

  const toggleAudio = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
        
        // 참여자 목록 업데이트
        setParticipants(prev => prev.map(p => 
          p.userId === 'current-user' 
            ? { ...p, isAudioEnabled: audioTrack.enabled }
            : p
        ));
      }
    }
  }, [localStream]);

  const toggleScreenShare = useCallback(async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });

        // 화면 공유 스트림으로 교체
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }

        setIsScreenSharing(true);
        
        // 화면 공유 종료 감지
        screenStream.getVideoTracks()[0].addEventListener('ended', () => {
          setIsScreenSharing(false);
          if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
          }
        });

      } else {
        // 원래 비디오 스트림으로 복원
        if (localVideoRef.current && localStream) {
          localVideoRef.current.srcObject = localStream;
        }
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('화면 공유 전환 실패:', error);
    }
  }, [isScreenSharing, localStream]);

  const endCall = useCallback(() => {
    setCallStatus('ended');
    cleanup();
    onCallEnd?.();
  }, [onCallEnd]);

  const cleanup = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setLocalStream(null);
    setParticipants([]);
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      callContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const formatCallDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getParticipantGridClass = () => {
    const count = participants.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count <= 4) return 'grid-cols-2 grid-rows-2';
    if (count <= 6) return 'grid-cols-3 grid-rows-2';
    return 'grid-cols-3 grid-rows-3';
  };

  if (callStatus === 'ended') {
    return (
      <div className={`flex items-center justify-center h-full bg-gray-900 text-white ${className}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">📞</div>
          <h3 className="text-2xl font-bold mb-2">통화가 종료되었습니다</h3>
          <p className="text-gray-400 mb-4">
            통화 시간: {formatCallDuration(callDuration)}
          </p>
          <button
            onClick={onCallEnd}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={callContainerRef}
      className={`relative h-full bg-gray-900 text-white overflow-hidden ${className}`}
    >
      {/* 통화 헤더 */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {callStatus === 'connecting' ? '연결 중...' : '연결됨'}
              </span>
            </div>
            {callStatus === 'connected' && (
              <div className="text-sm text-gray-300">
                {formatCallDuration(callDuration)}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon className="h-5 w-5" />
              ) : (
                <ArrowsPointingOutIcon className="h-5 w-5" />
              )}
            </button>
            
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
            >
              <ChatBubbleLeftIcon className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-1 bg-black/50 rounded-lg px-3 py-2">
              <UsersIcon className="h-4 w-4" />
              <span className="text-sm">{participants.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 비디오 그리드 */}
      <div className={`grid gap-2 p-4 h-full ${getParticipantGridClass()}`}>
        {participants.map((participant, index) => (
          <motion.div
            key={participant.userId}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-gray-800 rounded-lg overflow-hidden group"
          >
            {/* 비디오 스트림 */}
            {participant.userId === 'current-user' ? (
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover ${!participant.isVideoEnabled ? 'hidden' : ''}`}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-4xl font-bold">
                  {participant.name.charAt(0)}
                </div>
              </div>
            )}

            {/* 비디오 꺼짐 상태 */}
            {!participant.isVideoEnabled && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold">
                      {participant.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{participant.name}</p>
                </div>
              </div>
            )}

            {/* 참여자 정보 오버레이 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{participant.name}</span>
                <div className="flex items-center space-x-2">
                  {!participant.isAudioEnabled && (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <SpeakerXMarkIcon className="h-4 w-4" />
                    </div>
                  )}
                  {participant.isScreenSharing && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <ComputerDesktopIcon className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 화면 공유 인디케이터 */}
            {participant.isScreenSharing && (
              <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                화면 공유 중
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 통화 컨트롤 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-6">
        <div className="flex items-center justify-center space-x-4">
          {/* 마이크 토글 */}
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full transition-colors ${
              isAudioEnabled 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            <MicrophoneIcon className="h-6 w-6" />
          </button>

          {/* 비디오 토글 */}
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full transition-colors ${
              isVideoEnabled 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isVideoEnabled ? (
              <VideoCameraIcon className="h-6 w-6" />
            ) : (
              <VideoCameraSlashIcon className="h-6 w-6" />
            )}
          </button>

          {/* 화면 공유 토글 */}
          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-full transition-colors ${
              isScreenSharing 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <ComputerDesktopIcon className="h-6 w-6" />
          </button>

          {/* 통화 종료 */}
          <button
            onClick={endCall}
            className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
          >
            <PhoneXMarkIcon className="h-6 w-6" />
          </button>

          {/* 설정 */}
          <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
            <Cog6ToothIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* 사이드 채팅 */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-80 h-full bg-gray-800 border-l border-gray-700 z-30"
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">채팅</h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* 채팅 메시지들 */}
              <div className="text-sm text-gray-400 text-center">
                화상 통화 중 채팅이 시작되었습니다
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="메시지 입력..."
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition-colors">
                  전송
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 연결 중 로딩 */}
      {callStatus === 'connecting' && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-40">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg">통화 연결 중...</p>
            <p className="text-sm text-gray-400 mt-2">잠시만 기다려주세요</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallSystem;