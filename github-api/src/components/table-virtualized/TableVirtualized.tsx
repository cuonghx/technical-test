import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { IUser } from "@/models/users/IUser";
import { Avatar } from "../shared/Avatar";

export function ReactTableVirtualized({ items }: { items: IUser[] }) {
  const columns = React.useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "login",
        header: () => "Username",
        cell: (info) => {
          const item = info.row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="rounded-full w-12 h-12 border border-gray-300">
                  <Avatar avatar_url={item.avatar_url} alt={item.login} />
                </div>
              </div>
              <div>
                <div className="font-bold"> {item.login}</div>
              </div>
            </div>
          );
        },

        size: 300,
        minSize: 300,
      },

      {
        accessorKey: "type",
        header: () => "Type",

        cell: (info) => {
          const item = info.row.original;
          return <span className="badge badge-ghost">{item.type}</span>;
        },
        size: 200,
        minSize: 200,
      },
      {
        accessorKey: "score",
        header: () => "Score",

        cell: (info) => {
          const item = info.row.original;
          return <div className="text-base">{item.score.toFixed(2)}</div>;
        },
        size: 50,
      },
    ],
    []
  );
  const data = items;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // debugTable: true,
  });
  const { rows } = table.getRowModel();
  const parentRef = React.useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 20,
  });
  if (data.length === 0) return <></>;
  return (
    <div ref={parentRef} className="vi-container">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                      className="bg-base-200 py-2 text-base"
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const row = rows[virtualRow.index] as Row<IUser>;
              return (
                <tr
                  key={row.id}
                  style={{
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                  className="border-0"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
