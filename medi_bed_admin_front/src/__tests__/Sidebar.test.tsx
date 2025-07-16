import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from "../components/Layout/Sidebar";

// Mock react-router-dom Link
vi.mock("react-router-dom", () => ({
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock sidebarRouteList
vi.mock("../routes/routeList.tsx", () => ({
  sidebarRouteList: [
    { link: "/dashboard", name: "Dashboard" },
    { link: "/resources", name: "Resources" },
    { link: "/settings", name: "Settings" },
  ],
}));

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders all routes from sidebarRouteList", () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("Home link should have correct href", () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
  });

  it("Route links should have correct hrefs", () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText("Dashboard").closest("a")).toHaveAttribute(
      "href",
      "/dashboard"
    );
    expect(screen.getByText("Resources").closest("a")).toHaveAttribute(
      "href",
      "/resources"
    );
    expect(screen.getByText("Settings").closest("a")).toHaveAttribute(
      "href",
      "/settings"
    );
  });

  it("should be visible when isOpen is true", () => {
    render(<Sidebar isOpen={true} />);
    const sidebarDiv = screen.getByRole("navigation").parentElement;
    // Visible sidebar should NOT have -translate-x-full
    expect(sidebarDiv?.className).toContain("translate-x-0");
    expect(sidebarDiv?.className).not.toContain("-translate-x-full");
  });

  it("should be hidden (translated) when isOpen is false", () => {
    render(<Sidebar isOpen={false} />);
    const sidebarDiv = screen.getByRole("navigation").parentElement;
    // Hidden sidebar should have -translate-x-full
    expect(sidebarDiv?.className).toContain("-translate-x-full");
  });

  it("nav should have tabIndex -1", () => {
    render(<Sidebar isOpen={true} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("tabIndex", "-1");
  });

 
});