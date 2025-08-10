import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import { renderPageButtons } from "./helpers";
import "./table.scss";

const Table = ({
  columns,
  endpoint,
  clickable = false,
  onRowClick,
  paramsMapper,
  headerButtons,
}) => {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [loading, setLoading] = useState(false);

  // debounce effect (500ms)
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedFilter(globalFilter);
    }, 500);
    return () => clearTimeout(delay);
  }, [globalFilter]);

  // filtre değiştiğinde sayfayı sıfırla
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedFilter]);

  // veri çekme
  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const defaultParams = {
          page: pagination.pageIndex + 1,
          size: pagination.pageSize,
          ...(debouncedFilter ? { keyword: debouncedFilter } : {}),
        };

        const params =
          typeof paramsMapper === "function"
            ? paramsMapper(defaultParams)
            : defaultParams;

        const res = await Axios.get(endpoint, { params });

        const items = Array.isArray(res?.data?.result?.results)
          ? res.data.result.results
          : [];

        const total = Number.isFinite(res?.data?.result?.total)
          ? res.data.result.total
          : items.length;

        setData(items);
        setRowCount(total);
      } catch (error) {
        console.error("Veri alınamadı:", error);
        setData([]);
        setRowCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, pagination.pageIndex, pagination.pageSize, debouncedFilter]);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount:
      Number.isFinite(rowCount) && pagination.pageSize > 0
        ? Math.ceil(rowCount / pagination.pageSize)
        : 0,
    state: {
      pagination,
      globalFilter,
      sorting,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  const totalPages = table.getPageCount();

  const columnCount = useMemo(() => columns.length, [columns]);

  return (
    <div className="data-table-container">
      <div className="row">
        <div className="col-md-4">
          <div className="form_group">
            <input
              type="text"
              placeholder="Ara..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="form_control"
            />
          </div>
        </div>
        {headerButtons && (
          <div
            className="col-md-8 d-flex align-items-center justify-content-start justify-content-md-end my-3 my-md-0"
            style={{ gap: "12px" }}
          >
            {headerButtons}
          </div>
        )}
      </div>

      <div className="table-responsive">
        {loading ? (
          <table className="data-table">
            <thead>
              <tr>
                {Array.from({ length: columnCount }).map((_, i) => (
                  <th key={i}>
                    <div className="skeleton skeleton-header" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {Array.from({ length: columnCount }).map((_, colIdx) => (
                    <td key={colIdx}>
                      <div className="skeleton skeleton-cell" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="data-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="clickable-cell"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" ? (
                        <CgSortAz size={20} />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <CgSortZa size={20} />
                      ) : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => clickable && onRowClick?.(row)}
                  className={clickable ? "clickable-cell" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination-bar d-flex justify-content-between">
        <div className="d-flex gap-1 gap-md-2 align-items-center" style={{overflow:"auto"}}>
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="pagination-button"
          >
            <FiChevronsLeft size={15} />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="pagination-button"
          >
            <FaChevronLeft size={12} />
          </button>
          {renderPageButtons(table)}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="pagination-button"
          >
            <FaChevronRight size={12} />
          </button>
          <button
            onClick={() => table.setPageIndex(totalPages - 1)}
            disabled={!table.getCanNextPage()}
            className="pagination-button"
          >
            <FiChevronsRight size={15} />
          </button>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
              }))
            }
            className="page-size-select"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>Toplam Kayıt: {rowCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Table;
