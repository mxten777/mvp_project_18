/**
 * 보안 인증 시스템
 * 사용자 인증, 권한 관리, 세션 관리
 */

import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { 
  generateSessionToken, 
  validateToken, 
  logSecurityEvent, 
  encryptData, 
  decryptData,
  rateLimiter 
} from '../utils/security';

// 사용자 정보 인터페이스
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'caregiver' | 'admin' | 'family';
  permissions: string[];
  lastLogin: string;
  isVerified: boolean;
}

// 인증 컨텍스트 인터페이스
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  checkPermission: (permission: string) => boolean;
  requestPermission: (permission: string) => Promise<boolean>;
}

// 회원가입 데이터 인터페이스
interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'user' | 'caregiver' | 'family';
}

// 인증 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 로컬 스토리지 키
const STORAGE_KEYS = {
  USER: 'auth_user',
  TOKEN: 'auth_token',
  PERMISSIONS: 'user_permissions',
  SESSION: 'session_data'
};

/**
 * 인증 프로바이더 컴포넌트
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 인증 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * 인증 상태 확인
   */
  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const encryptedUser = localStorage.getItem(STORAGE_KEYS.USER);

      if (token && encryptedUser && validateToken(token)) {
        const userData = JSON.parse(decryptData(encryptedUser));
        setUser(userData);
        
        logSecurityEvent({
          level: 'info',
          action: 'session_restored',
          userId: userData.id
        });
      } else {
        // 유효하지 않은 토큰이나 사용자 데이터 정리
        clearAuthData();
      }
    } catch (error) {
      console.error('인증 상태 확인 실패:', error);
      clearAuthData();
      
      logSecurityEvent({
        level: 'error',
        action: 'auth_check_failed',
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 로그인 처리
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    const clientIp = await getClientIP();
    
    // 레이트 리미팅 체크
    if (!rateLimiter.isAllowed(`login_${email}_${clientIp}`, 5, 15 * 60 * 1000)) {
      logSecurityEvent({
        level: 'warning',
        action: 'login_rate_limited',
        details: { email, ip: clientIp }
      });
      throw new Error('너무 많은 로그인 시도입니다. 15분 후 다시 시도해주세요.');
    }

    try {
      setIsLoading(true);
      
      // 실제 서버 인증 대신 모의 인증 (개발용)
      const mockUser = await mockAuthenticate(email, password);
      
      if (mockUser) {
        const token = generateSessionToken();
        const encryptedUser = encryptData(JSON.stringify(mockUser));
        
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, encryptedUser);
        localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(mockUser.permissions));
        
        setUser(mockUser);
        
        // 성공적인 로그인 로그
        logSecurityEvent({
          level: 'info',
          action: 'login_success',
          userId: mockUser.id,
          ip: clientIp
        });
        
        // 레이트 리미터 리셋
        rateLimiter.reset(`login_${email}_${clientIp}`);
        
        return true;
      } else {
        // 실패한 로그인 로그
        logSecurityEvent({
          level: 'warning',
          action: 'login_failed',
          details: { email, ip: clientIp }
        });
        
        return false;
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      
      logSecurityEvent({
        level: 'error',
        action: 'login_error',
        details: { 
          email, 
          ip: clientIp,
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 로그아웃 처리
   */
  const logout = () => {
    const userId = user?.id;
    
    clearAuthData();
    setUser(null);
    
    logSecurityEvent({
      level: 'info',
      action: 'logout',
      userId
    });
  };

  /**
   * 회원가입 처리
   */
  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // 실제 서버 등록 대신 모의 등록 (개발용)
      const newUser = await mockRegister(userData);
      
      if (newUser) {
        logSecurityEvent({
          level: 'info',
          action: 'user_registered',
          userId: newUser.id,
          details: { email: userData.email, role: userData.role }
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('회원가입 실패:', error);
      
      logSecurityEvent({
        level: 'error',
        action: 'registration_failed',
        details: { 
          email: userData.email,
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 프로필 업데이트
   */
  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      const updatedUser = { ...user, ...userData };
      const encryptedUser = encryptData(JSON.stringify(updatedUser));
      
      localStorage.setItem(STORAGE_KEYS.USER, encryptedUser);
      setUser(updatedUser);
      
      logSecurityEvent({
        level: 'info',
        action: 'profile_updated',
        userId: user.id,
        details: { updatedFields: Object.keys(userData) }
      });
      
      return true;
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      
      logSecurityEvent({
        level: 'error',
        action: 'profile_update_failed',
        userId: user?.id,
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
      
      return false;
    }
  };

  /**
   * 권한 확인
   */
  const checkPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  /**
   * 권한 요청
   */
  const requestPermission = async (permission: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // 실제 서버에서 권한 요청 처리
      // 여기서는 모의 처리
      const granted = await mockRequestPermission(user.id, permission);
      
      if (granted) {
        const updatedPermissions = [...user.permissions, permission];
        const updatedUser = { ...user, permissions: updatedPermissions };
        
        const encryptedUser = encryptData(JSON.stringify(updatedUser));
        localStorage.setItem(STORAGE_KEYS.USER, encryptedUser);
        localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(updatedPermissions));
        
        setUser(updatedUser);
        
        logSecurityEvent({
          level: 'info',
          action: 'permission_granted',
          userId: user.id,
          details: { permission }
        });
      }
      
      return granted;
    } catch (error) {
      console.error('권한 요청 실패:', error);
      
      logSecurityEvent({
        level: 'error',
        action: 'permission_request_failed',
        userId: user?.id,
        details: { 
          permission,
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      });
      
      return false;
    }
  };

  /**
   * 인증 데이터 정리
   */
  const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.PERMISSIONS);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updateProfile,
    checkPermission,
    requestPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * 인증 훅
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * 모의 인증 함수 (개발용)
 */
async function mockAuthenticate(email: string, password: string): Promise<User | null> {
  // 개발용 테스트 계정
  const testAccounts = [
    {
      email: 'admin@test.com',
      password: 'admin123!',
      user: {
        id: '1',
        email: 'admin@test.com',
        name: '관리자',
        role: 'admin' as const,
        permissions: ['read', 'write', 'delete', 'admin'],
        lastLogin: new Date().toISOString(),
        isVerified: true
      }
    },
    {
      email: 'caregiver@test.com',
      password: 'care123!',
      user: {
        id: '2',
        email: 'caregiver@test.com',
        name: '김요양사',
        role: 'caregiver' as const,
        permissions: ['read', 'write', 'care_access'],
        lastLogin: new Date().toISOString(),
        isVerified: true
      }
    },
    {
      email: 'user@test.com',
      password: 'user123!',
      user: {
        id: '3',
        email: 'user@test.com',
        name: '홍길동',
        role: 'user' as const,
        permissions: ['read'],
        lastLogin: new Date().toISOString(),
        isVerified: true
      }
    }
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const account = testAccounts.find(acc => acc.email === email && acc.password === password);
      resolve(account ? { ...account.user, lastLogin: new Date().toISOString() } : null);
    }, 1000); // 실제 서버 요청 시뮬레이션
  });
}

/**
 * 모의 회원가입 함수 (개발용)
 */
async function mockRegister(userData: RegisterData): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        permissions: userData.role === 'admin' ? ['read', 'write', 'delete', 'admin'] : ['read'],
        lastLogin: new Date().toISOString(),
        isVerified: false
      };
      resolve(newUser);
    }, 1000);
  });
}

/**
 * 모의 권한 요청 함수 (개발용)
 */
async function mockRequestPermission(userId: string, permission: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 간단한 권한 승인 로직 (실제로는 관리자 승인 필요)
      const grantablePermissions = ['read', 'write', 'care_access'];
      resolve(grantablePermissions.includes(permission));
    }, 500);
  });
}

/**
 * 클라이언트 IP 가져오기 (간단한 구현)
 */
async function getClientIP(): Promise<string> {
  try {
    // 실제 운영에서는 서버에서 IP를 제공받아야 함
    return 'localhost';
  } catch {
    return 'unknown';
  }
}