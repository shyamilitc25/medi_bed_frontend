import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { ReactNode } from "react";
import { IActionButton } from "../../interface/interface";
import LoadingSpinner from "../Spinner";

interface TableProps<T extends { _id?: string; [key: string]: ReactNode }> {
  columns: (keyof T)[];
  data: T[];
  showAction?: boolean;
  actionButtons?: IActionButton[];
  loading: boolean;
}

const Table = <T extends { _id?: string }>({
  columns,
  data,
  showAction = false,
  actionButtons = [],
  loading = false,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="min-w-full bg-white">
          <TableHead columns={columns} showAction={showAction} />
          <TableBody
            columns={columns}
            data={data}
            showAction={showAction}
            actionButtons={actionButtons}
          />
        </table>
      )}
    </div>
  );
};

export default Table;
