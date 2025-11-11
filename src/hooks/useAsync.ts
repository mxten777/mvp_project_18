import { useState, useEffect, useCallback } from 'react';
import type React from 'react';

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * 데이터 페칭 훅
 * @description API 호출을 위한 재사용 가능한 훅
 * @param fetchFn - 데이터를 가져오는 함수
 * @param dependencies - 의존성 배열
 * @returns { data, loading, error, refetch }
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useFetch(
 *   () => fetch('/api/users').then(res => res.json()),
 *   []
 * );
 * ```
 */
export function useFetch<T>(
  fetchFn: () => Promise<T>,
  dependencies: React.DependencyList = []
): FetchState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const executeFetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await fetchFn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  }, [fetchFn]);

  useEffect(() => {
    executeFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    ...state,
    refetch: executeFetch,
  };
}

/**
 * 비동기 작업 훅
 * @description 비동기 작업의 상태를 관리
 * @returns { execute, loading, error, data }
 * @example
 * ```tsx
 * const { execute, loading, error } = useAsync();
 * const handleSubmit = async () => {
 *   await execute(() => submitForm(data));
 * };
 * ```
 */
export function useAsync<T = unknown>() {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    
    try {
      const data = await asyncFn();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      setState({ data: null, loading: false, error: err });
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * 디바운스된 값 훅
 * @description 값의 변경을 지연시켜 불필요한 업데이트 방지
 * @param value - 디바운스할 값
 * @param delay - 지연 시간 (ms)
 * @returns 디바운스된 값
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   // API 호출
 *   searchAPI(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 이전 값 추적 훅
 * @description 컴포넌트의 이전 렌더링 값을 기억
 * @param value - 추적할 값
 * @returns 이전 값
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const [current, setCurrent] = useState<T>(value);
  const [previous, setPrevious] = useState<T | undefined>();

  useEffect(() => {
    if (value !== current) {
      setPrevious(current);
      setCurrent(value);
    }
  }, [value, current]);

  return previous;
}

/**
 * 토글 훅
 * @description boolean 상태를 토글하는 간편한 훅
 * @param initialValue - 초기값 (기본: false)
 * @returns [value, toggle, setTrue, setFalse]
 * @example
 * ```tsx
 * const [isOpen, toggle, open, close] = useToggle();
 * ```
 */
export function useToggle(initialValue = false): [
  boolean,
  () => void,
  () => void,
  () => void
] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse];
}
