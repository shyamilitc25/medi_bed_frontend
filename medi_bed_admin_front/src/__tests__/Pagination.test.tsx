import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/PaginationComp";

describe("Pagination", () => {
  it("renders current and total pages", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={() => {}}
        loading={false}
      />
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("calls onPageChange with previous page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChange}
        loading={false}
      />
    );
    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with next page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChange}
        loading={false}
      />
    );
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
        loading={false}
      />
    );
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={() => {}}
        loading={false}
      />
    );
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("does not render buttons or text when loading is true", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={() => {}}
        loading={true}
      />
    );
    expect(screen.queryByRole("button", { name: /previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /next/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Page/)).not.toBeInTheDocument();
  });

  it("does not call onPageChange for previous when on first page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChange}
        loading={false}
      />
    );
    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("does not call onPageChange for next when on last page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChange}
        loading={false}
      />
    );
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });
});