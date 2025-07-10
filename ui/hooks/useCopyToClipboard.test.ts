import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import copyToClipboard from 'copy-to-clipboard';
import { COPY_OPTIONS } from '../../shared/constants/copy';
import { useCopyToClipboard } from './useCopyToClipboard';

jest.mock('copy-to-clipboard');
const mockCopyToClipboard = jest.mocked(copyToClipboard);

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('copies text and expires after timeout', () => {
    const delay = 1000;
    const { result } = renderHook(() => useCopyToClipboard(delay));
    const [, handleCopy] = result.current;

    act(() => handleCopy('test'));
    expect(mockCopyToClipboard).toHaveBeenNthCalledWith(1, 'test', COPY_OPTIONS);
    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(delay + 1);
    });
    
    expect(mockCopyToClipboard).toHaveBeenCalledTimes(2);
    expect(mockCopyToClipboard).toHaveBeenNthCalledWith(2, ' ', COPY_OPTIONS);
    expect(result.current).toBe(false);
  });

  it('copies text and does not expire after timeout', () => {
    const delay = 1000;
    const { result } = renderHook(() =>
      useCopyToClipboard(delay, { expireClipboard: false }),
    );
    
    const [, handleCopy] = result.current;

     act(() => handleCopy('test'));
     expect(mockCopyToClipboard).toHaveBeenNthCalledWith(1, 'test', COPY_OPTIONS);
     expect(result.current).toBe(true);

     act(() => {
       jest.advanceTimersByTime(delay + 1);
     });

     expect(mockCopyToClipboard).toHaveBeenCalledTimes(1);
     expect(result.current).toBe(false);  
   });

   it('resets copied state when invoked', () => {
     const delay = 1000;
     const { result } = renderHook(() => useCopyToClipboard(delay));
     
     const [, handleCopy, reset] = result.current;

      act(() => handleCopy('test'));
      expect(mockCopyToClipboard).toHaveBeenNthCalledWith(1, 'test', COPY_OPTIONS);
      expect(result.current).toBe(true);

      act(reset);

      expect(result.current).toBe(false);

      act(() =>{
        jest.advanceTimersByTime(delay +1)
       })
      
       expect(mockCopyToClipboard).toHaveBeenCalledTimes(1); 
       expect(result.current).toBe(false);  
   });
});
