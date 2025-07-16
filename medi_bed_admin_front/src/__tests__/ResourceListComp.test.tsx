import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResourceList from "../components/ResourceComp/ResourceList";

// Mock dependencies
const mockGetResources = vi.fn();
const mockDeleteResource = vi.fn();

vi.mock("../services/resourceService", () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getResources: (...args: any[]) => mockGetResources(...args),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteResource: (...args: any[]) => mockDeleteResource(...args),
}));


vi.mock("../components/Table/TableComp", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => (
    <table data-testid="table">
      <tbody>
        
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        props.data.map((row: any, idx: number) => (
          <tr key={row._id || idx}>
            <td>{row.name}</td>
            <td>
              <button onClick={() => props.actionButtons[0].onClick(row._id)} data-testid={`edit-${row._id}`}>Edit</button>
              <button onClick={() => props.actionButtons[1].onClick(row._id)} data-testid={`delete-${row._id}`}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}));

vi.mock("../components/PaginationComp", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ currentPage, totalPages, onPageChange }: any) => (
    <div data-testid="pagination">
      <button
        data-testid="prev-page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >Prev</button>
      <span data-testid="page-info">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        data-testid="next-page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >Next</button>
    </div>
  )
}));

vi.mock("../components/ResourceComp/ResourceForm", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) =>
    props.isOpen ? (
      <div data-testid="edit-modal">{props.title}</div>
    ) : null,
}));

const FAKE_RESOURCES = [
  {
    _id: "1",
    name: "Ventilator",
    category: "ICU",
    availableQuantity: 2,
    totalQuantity: 5,
    status: "operational",
    location: "Floor 1"
  },
  {
    _id: "2",
    name: "Bed",
    category: "General",
    availableQuantity: 10,
    totalQuantity: 20,
    status: "operational",
    location: "Floor 2"
  }
];

beforeEach(() => {
  vi.clearAllMocks();
  mockGetResources.mockResolvedValue({ data: FAKE_RESOURCES, pageCount: 3 });
  mockDeleteResource.mockResolvedValue({ success: true, message: "Deleted!" });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("ResourceList", () => {
  it("renders table, pagination, and no modal by default", async () => {
    render(<ResourceList />);
    await waitFor(() => {
      expect(screen.getByTestId("table")).toBeInTheDocument();
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
      expect(screen.queryByTestId("edit-modal")).not.toBeInTheDocument();
    });
    expect(mockGetResources).toHaveBeenCalledWith(1, 5);
  });

  it("opens edit modal with correct resource when Edit is clicked", async () => {
    render(<ResourceList />);
    await waitFor(() => expect(screen.getByTestId("edit-1")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("edit-1"));
    expect(screen.getByTestId("edit-modal")).toHaveTextContent("Edit Resources");
  });

  it("calls deleteResource and shows success toast on successful delete", async () => {
    render(<ResourceList />);
    await waitFor(() => expect(screen.getByTestId("delete-1")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("delete-1"));

    // Wait for async delete and fetch
    await waitFor(() => {
      expect(mockDeleteResource).toHaveBeenCalledWith("1");
    ;
      expect(mockGetResources).toHaveBeenCalledTimes(2); // Initial + refresh after delete
    });
  });

  

  

  it("changes page when next/prev buttons are clicked", async () => {
    render(<ResourceList />);
    await waitFor(() => expect(screen.getByTestId("pagination")).toBeInTheDocument());
    const next = screen.getByTestId("next-page");
    fireEvent.click(next);
    await waitFor(() => {
      expect(mockGetResources).toHaveBeenCalledWith(2, 5);
      expect(screen.getByTestId("page-info")).toHaveTextContent("Page 2 of 3");
    });

    const prev = screen.getByTestId("prev-page");
    fireEvent.click(prev);
    await waitFor(() => {
      expect(mockGetResources).toHaveBeenCalledWith(1, 5);
      expect(screen.getByTestId("page-info")).toHaveTextContent("Page 1 of 3");
    });
  });
});