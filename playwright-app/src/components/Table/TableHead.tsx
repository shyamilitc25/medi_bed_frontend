import React from "react";
interface TableHeadProps<T> {
  columns: (keyof T)[];
  showAction?:boolean
}

const TableHead = <T,>({ columns,showAction }: TableHeadProps<T>) => {
  return (
    <thead className="bg-gray-200">
      <tr>
        {columns.map((column, index) => (
          <th key={index} className="px-4 py-2 text-left">{String(column).toLocaleUpperCase()}</th>
        ))}
        {showAction?
         <th key={"action"} className="px-4 py-2 text-left">ACTIONS</th>
         :null
        }
      </tr>
    </thead>
  );
};

export default TableHead;