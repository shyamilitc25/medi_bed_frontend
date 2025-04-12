import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../components/Table/TableComp";
import { IUser } from "../interface/interface";

const mockData: IUser[] = [
  {
    _id: '1',
    name:"shyamili",
    email:"shyamili@gmail.com",
    age:10

  }  
];

const userColumns: (keyof IUser)[] = ['name', 'email', 'age'];

const mockOnBookHandle = jest.fn();

describe('Table Component', () => {
  it('renders table with data', () => {
    render(
      <Table
        columns={userColumns}
        data={mockData}
        showAction={true}
        actionButtons={[{ name: 'Book Appointment', onClick: mockOnBookHandle }]} loading={false}      />
    );

    expect(screen.getByText('shyamili')).toBeInTheDocument();
    expect(screen.getByText('shyamili@gmail.com')).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it('calls onBookHandle when action button is clicked', () => {
    render(
      <Table
        columns={userColumns}
        data={mockData}
        showAction={true}
        actionButtons={[{ name: 'Book Appointment', onClick: mockOnBookHandle }]} loading={false}      />
    );

    fireEvent.click(screen.getByText('Book Appointment'));
    expect(mockOnBookHandle).toHaveBeenCalledWith('1');
  });
  it('check spinner is showing of loading attribute is true', () => {
    render(
      <Table
        columns={userColumns}
        data={mockData}
        showAction={true}
        actionButtons={[{ name: 'Book Appointment', onClick: mockOnBookHandle }]} loading={true}      />
    );
    expect(screen.getByTestId('spinnerComponent')).toBeInTheDocument();
    // Check if mock data is not present
  expect(screen.queryByText('shyamili')).not.toBeInTheDocument();
  expect(screen.queryByText('shyamili@gmail.com')).not.toBeInTheDocument();
  expect(screen.queryByText('10')).not.toBeInTheDocument();
  });
});