import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { usePageProgress } from '../usePageProgress';
import { useLocation } from 'react-router-dom';

// Mock useLocation so the hook always receives a predictable pathname.
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

const mockedUseLocation = vi.mocked(useLocation);

describe('usePageProgress', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockedUseLocation.mockReturnValue({ pathname: '/testing' } as ReturnType<typeof useLocation>);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('steps progress through expected milestones and clears loading state', () => {
    const { result } = renderHook(() => usePageProgress());

    expect(result.current.progress).toBe(0);
    expect(result.current.isLoading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current.progress).toBe(25);

    act(() => {
      vi.advanceTimersByTime(70);
    });
    expect(result.current.progress).toBe(50);

    act(() => {
      vi.advanceTimersByTime(80);
    });
    expect(result.current.progress).toBe(75);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.progress).toBe(95);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.progress).toBe(100);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.progress).toBe(0);
    expect(result.current.isLoading).toBe(false);
  });
});
