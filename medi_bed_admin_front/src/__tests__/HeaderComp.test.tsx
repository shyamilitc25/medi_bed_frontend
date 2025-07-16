import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Layout/Header";

// Mock react-router-dom Link
vi.mock("react-router-dom", () => ({
    Link: ({
      to,
      children,
      ...props
    }: React.PropsWithChildren<{ to: string; [key: string]: unknown }>) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  }));

// Mock sidebarRouteList
vi.mock("../routes/routeList", () => ({
  __esModule: true,
  default: [
    { link: "/dashboard", name: "Dashboard" },
    { link: "/resources", name: "Resources" },
    { link: "/settings", name: "Settings" }
  ],
}));

// Mock useServerHealth
vi.mock("../hooks/usePolling", () => ({
  useServerHealth: vi.fn(() => "online"),
}));

// Set import.meta.env.VITE_API_URL
(globalThis as unknown as { import: { meta: { env: { VITE_API_URL: string } } } }).import = {
    meta: { env: { VITE_API_URL: "http://localhost:5000" } }
  };

// Helper to reset modules (for toggling mocks if needed)
beforeEach(() => {
  vi.clearAllMocks();
});

describe("Header", () => {
  it("renders logo and Admin text", () => {
    render(<Header />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("renders Logout link", () => {
    render(<Header />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Logout").closest("a")).toHaveAttribute("href", "/logout");
  });

 

 

  it("toggles mobile menu open and close", () => {
    render(<Header />);
    const burger = screen.getByRole("button", { name: "Mobile Header" });
    fireEvent.click(burger);
    expect(screen.getByText("Resources")).toBeInTheDocument();
    fireEvent.click(burger);
    // The menu should be closed, so Resources should not be visible
    expect(screen.queryByText("Resources")).not.toBeInTheDocument();
  });

  it("should not render sidebar links in desktop mode", () => {
    render(<Header />);
    // Since the mobile menu is not open, sidebar links should not be visible
    expect(screen.queryByText("Resources")).not.toBeInTheDocument();
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  
});