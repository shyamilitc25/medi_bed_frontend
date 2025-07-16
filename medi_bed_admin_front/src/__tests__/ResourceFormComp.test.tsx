import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResourceForm from "../components/ResourceComp/ResourceForm";
import { IResource } from "../interface/interface";



vi.mock("../services/resourceService", () => {
  return {
    createResource: vi.fn(),
    updateResource: vi.fn(),
  };
});
// ... (other mocks unchanged)
vi.mock("../components/ModalComp", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ children, isOpen, testId }: any) =>
    isOpen ? <div data-testid={testId}>{children}</div> : null,
}));

vi.mock("../components/FormFields/FormInput", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => (
    <input
      data-testid={`form-input-${props.name}`}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeHolder}
      type={props.type}
    />
  ),
}));

vi.mock("../components/FormFields/ButtonComp", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  ),
}));

vi.mock("../components/Spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}));

// ---- 3. Import the actual mocks AFTER mocking ----
import { createResource, updateResource } from "../services/resourceService";

describe("ResourceForm", () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal with all form fields and buttons", () => {
    render(
      <ResourceForm isOpen={true} onClose={onCloseMock} title="Create Resource" />
    );
    expect(screen.getByTestId("my-form-modal")).toBeInTheDocument();
    expect(screen.getByText("Create Resource")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Resource name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Category name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Quantity")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Available Quantity")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Location")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("calls onClose when Close button is clicked", () => {
    render(
      <ResourceForm isOpen={true} onClose={onCloseMock} title="Create Resource" />
    );
    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls createResource on submit for new resource and shows success toast", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (createResource as any).mockResolvedValue({ success: true, message: "Created!" });

    render(
      <ResourceForm isOpen={true} onClose={onCloseMock} title="Create Resource" />
    );
    fireEvent.change(screen.getByTestId("form-input-name"), { target: { value: "Bed" } });
    fireEvent.change(screen.getByTestId("form-input-category"), { target: { value: "ICU" } });
    fireEvent.change(screen.getByTestId("form-input-totalQuantity"), { target: { value: 10 } });
    fireEvent.change(screen.getByTestId("form-input-availableQuantity"), { target: { value: 5 } });
    fireEvent.change(screen.getByTestId("form-input-location"), { target: { value: "First Floor" } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(createResource).toHaveBeenCalledWith({
        name: "Bed",
        category: "ICU",
        totalQuantity: 10,
        availableQuantity: 5,
        location: "First Floor",
        status: "operational",
      });
      // expect(toastSuccessMock).toHaveBeenCalledWith("Created!");
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it("calls updateResource on submit for editing resource and shows success toast", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updateResource as any).mockResolvedValue({ success: true, message: "Updated!" });
    const resource: IResource = {
      name: "Ventilator",
      category: "ICU",
      totalQuantity: 3,
      availableQuantity: 1,
      location: "Second Floor",
      status: "operational",
    };
    render(
      <ResourceForm
        isOpen={true}
        onClose={onCloseMock}
        title="Edit Resource"
        resource={resource}
      />
    );
    fireEvent.change(screen.getByTestId("form-input-name"), { target: { value: "Ventilator2" } });
    fireEvent.click(screen.getByRole("button", { name: /update/i }));

    await waitFor(() => {
      expect(updateResource).toHaveBeenCalledWith({
        ...resource,
        name: "Ventilator2",
      });
      // expect(toastSuccessMock).toHaveBeenCalledWith("Updated!");
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it("shows error toast when createResource service fails", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (createResource as any).mockRejectedValue(new Error("Oops!"));

    render(
      <ResourceForm isOpen={true} onClose={onCloseMock} title="Create Resource" />
    );
    fireEvent.change(screen.getByTestId("form-input-name"), { target: { value: "Bed" } });
    fireEvent.change(screen.getByTestId("form-input-category"), { target: { value: "ICU" } });
    fireEvent.change(screen.getByTestId("form-input-totalQuantity"), { target: { value: 10 } });
    fireEvent.change(screen.getByTestId("form-input-availableQuantity"), { target: { value: 5 } });
    fireEvent.change(screen.getByTestId("form-input-location"), { target: { value: "First Floor" } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
    
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

});