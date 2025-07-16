import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { useServerHealth } from "../hooks/usePolling"; // Adjust the import path as needed

vi.mock("axios");

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe("useServerHealth", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'online' when server responds with 200", async () => {

    mockedAxios.get = vi.fn().mockResolvedValue({ status: 200 });

    const { result } = renderHook(() =>
      useServerHealth("http://test/health", 5000)
    );

    // Initial call is async, so advance timers and flush promises
    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    expect(result.current).toBe("online");
  });

  it("returns 'offline' when server responds with non-200", async () => {

    mockedAxios.get = vi.fn().mockResolvedValue({ status: 500 });

    const { result } = renderHook(() =>
      useServerHealth("http://test/health", 5000)
    );

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    expect(result.current).toBe("offline");
  });

  it("returns 'offline' on axios error", async () => {

    mockedAxios.get = vi.fn().mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() =>
      useServerHealth("http://test/health", 5000)
    );

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    expect(result.current).toBe("offline");
  });

  it("polls at the given interval", async () => {
  
    mockedAxios.get = vi.fn().mockResolvedValue({ status: 200 });

    renderHook(() => useServerHealth("http://test/health", 2000));

    await act(async () => {
      // Initial call
      vi.runOnlyPendingTimers();
    });

    // After 2 seconds, check is called again
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(3);
  });

  it("cleans up interval on unmount", async () => {

    mockedAxios.get = vi.fn().mockResolvedValue({ status: 200 });

    const { unmount } = renderHook(() =>
      useServerHealth("http://test/health", 1000)
    );

    unmount();

    // After unmount, even if timer advances, no further requests should be made
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1); // Only initial call
  });
});