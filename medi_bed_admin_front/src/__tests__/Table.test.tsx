import React from "react";
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from "../components/Table/TableComp";
import { IUser } from "../interface/interface";


const userColumns: (keyof IUser)[] = ['name', 'email', 'age'];

describe('Table Component - Additional Cases', () => {


  test('renders multiple action buttons and handles clicks', () => {
    const onA = vi.fn(), onB = vi.fn();
    const data = [{ _id: '1', name: 'A', email: 'a@a.com', age: 1 }];
    render(
      <Table
        columns={userColumns}
        data={data}
        showAction={true}
        actionButtons={[
          { name: 'ActionA', onClick: onA },
          { name: 'ActionB', onClick: onB }
        ]}
        loading={false}
      />
    );
    fireEvent.click(screen.getByText('ActionA'));
    fireEvent.click(screen.getByText('ActionB'));
    expect(onA).toHaveBeenCalledWith('1');
    expect(onB).toHaveBeenCalledWith('1');
  });

  test('renders custom column values', () => {
    const data = [{ _id: '2', name: 'B', email: '', age: 5 }];
    render(
      <Table columns={userColumns} data={data} showAction={false} actionButtons={[]} loading={false} />
    );
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});