import React, { PropsWithChildren } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Dashboard from "../pages/Dashboard";

// Mock Layout component


vi.mock("../components/Layout/Layout", () => ({
  __esModule: true,
  default: (props: PropsWithChildren<{ pageTitle: string }>) => (
    <div data-testid="layout">
      <span data-testid="page-title">{props.pageTitle}</span>
      {props.children}
    </div>
  ),
}));

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Layout with correct title and dashboard content", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByTestId("page-title")).toHaveTextContent("Dashboard");
    expect(screen.getByText("dashboard")).toBeInTheDocument();
  });
});