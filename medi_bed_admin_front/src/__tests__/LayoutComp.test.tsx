import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Layout from "../components/Layout/Layout";

// Mock Header and Sidebar components
vi.mock("../components/Layout/Header", () => ({
  __esModule: true,
  default: () => <header data-testid="header">Header</header>,
}));
vi.mock("../components/Layout/Sidebar", () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) => (
    <aside data-testid="sidebar">{isOpen ? "Sidebar Open" : "Sidebar Closed"}</aside>
  ),
}));

describe("Layout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Header, Sidebar, pageTitle and children", () => {
    render(
      <Layout pageTitle="Test Title">
        <div data-testid="content">Content Goes Here</div>
      </Layout>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("always renders sidebar as closed", () => {
    render(
      <Layout pageTitle="Test Title">
        <div>Child Content</div>
      </Layout>
    );
    expect(screen.getByTestId("sidebar")).toHaveTextContent("Sidebar Closed");
  });
});