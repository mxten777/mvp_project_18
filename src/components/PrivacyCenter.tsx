/**
 * 개인정보 보호 정책 및 동의 관리 컴포넌트
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle,
  Download,
  Trash2,
  Settings,
  FileText,
  UserCheck
} from 'lucide-react';
import { logSecurityEvent } from '../utils/security';

interface PrivacyData {
  id: string;
  type: 'essential' | 'analytics' | 'marketing' | 'personalization';
  title: string;
  description: string;
  isRequired: boolean;
  isGranted: boolean;
  grantedAt?: string;
  expiresAt?: string;
}

export default function PrivacyCenter() {
  const [activeTab, setActiveTab] = useState<'consents' | 'activities' | 'rights'>('consents');
  const [showDataExport, setShowDataExport] = useState(false);
  const [showDataDeletion, setShowDataDeletion] = useState(false);

  useEffect(() => {
    logSecurityEvent({
      level: 'info',
      action: 'privacy_center_accessed'
    });
  }, []);

  const handleDataExport = () => {
    setShowDataExport(false);
    alert('데이터 내보내기가 완료되었습니다.');
  };

  const handleDataDeletion = () => {
    setShowDataDeletion(false);
    alert('데이터 삭제 요청이 접수되었습니다.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-500" />
          개인정보보호 센터
        </h1>
        <p className="text-gray-600">
          개인정보 처리 현황을 확인하고 권리를 행사할 수 있습니다.
        </p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'consents', label: '동의 관리', icon: UserCheck },
            { id: 'activities', label: '처리 현황', icon: FileText },
            { id: 'rights', label: '권리 행사', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as 'consents' | 'activities' | 'rights')}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                ${activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'consents' && (
          <motion.div
            key="consents"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-blue-900">동의 관리 안내</h3>
              </div>
              <p className="text-blue-800 text-sm">
                동의를 철회하시면 해당 서비스 이용이 제한될 수 있습니다.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'activities' && (
          <motion.div
            key="activities"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-900">개인정보 처리 현황</h2>
            <p className="text-gray-600">처리 중인 개인정보 현황입니다.</p>
          </motion.div>
        )}

        {activeTab === 'rights' && (
          <motion.div
            key="rights"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-gray-900">개인정보 자기결정권 행사</h2>

            <div className="grid gap-6">
              {/* 데이터 내보내기 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <Download className="w-6 h-6 text-blue-500 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">데이터 내보내기</h3>
                    <p className="text-gray-600 mb-4">
                      본인의 개인정보 처리 현황과 저장된 데이터를 다운로드받을 수 있습니다.
                    </p>
                    <button
                      onClick={() => setShowDataExport(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      데이터 내보내기
                    </button>
                  </div>
                </div>
              </div>

              {/* 데이터 삭제 */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <Trash2 className="w-6 h-6 text-red-500 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">데이터 삭제 요청</h3>
                    <p className="text-gray-600 mb-4">
                      본인의 개인정보 삭제를 요청할 수 있습니다.
                    </p>
                    <button
                      onClick={() => setShowDataDeletion(true)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      삭제 요청
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 데이터 내보내기 확인 모달 */}
      <AnimatePresence>
        {showDataExport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold mb-4">데이터 내보내기</h3>
              <p className="text-gray-600 mb-6">
                개인정보 처리 현황과 저장된 데이터를 다운로드하시겠습니까?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDataExport(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDataExport}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  다운로드
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 데이터 삭제 확인 모달 */}
      <AnimatePresence>
        {showDataDeletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-red-900">데이터 삭제 요청</h3>
              </div>
              <p className="text-gray-600 mb-6">
                이 작업은 되돌릴 수 없습니다. 모든 개인정보가 삭제됩니다.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDataDeletion(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDataDeletion}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  삭제 요청
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}