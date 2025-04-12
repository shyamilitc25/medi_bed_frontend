import React from "react";
import { IActionButton } from "../../interface/interface";
import Button from "../FormFields/ButtonComp";

interface TableBodyProps<T extends { _id?: string }> {
  data: T[];
  columns: (keyof T)[];
  showAction?: boolean;
  actionButtons?: IActionButton[];
}

const TableBody = <T extends { _id?: string }>({
  data,
  columns,
  showAction = false,
  actionButtons = [],
}: TableBodyProps<T>) => {
  // Helper to render various data types safely
  const renderCell = (value: unknown): React.ReactNode => {
    if (typeof value === "string" || typeof value === "number") return value;
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value instanceof Date) return value.toLocaleString();
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object" && value !== null)
      return JSON.stringify(value);
    return "-";
  };

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex} className="border-b">
          {columns.map((column, colIndex) => (
            <td key={colIndex} className="px-4 py-2">
              {renderCell(row[column])}
            </td>
          ))}
          {showAction && actionButtons ? (
            <td className="px-4 py-2 flex space-x-2">
              {actionButtons.map((button, btnIndex) => (
                <Button variant={button.variant} key={btnIndex} data-testid={`${button.testId}${btnIndex}Input`} onClick={() => button.onClick(row._id || "")}>{button.name}</Button>
              
              ))}
            </td>
          ) : null}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
