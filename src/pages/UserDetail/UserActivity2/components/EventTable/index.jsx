import { useMemo, useState, useEffect } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import dayjs from 'dayjs';
import './EventTable.scss';

const getEventTypeLabel = (type) => {
  const labels = {
    view: 'Görüntülenme',
    connection: 'Bağlantı',
    contact: 'İletişim'
  };
  return labels[type] || type;
};

const renderPageButtons = (table) => {
  const buttons = [];
  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  if (totalPages <= 5) {
    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => table.setPageIndex(i)}
          disabled={i === currentPage}
          className={`pagination_button ${i === currentPage ? "active_page" : ""}`}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  }

  buttons.push(
    <button
      key={0}
      onClick={() => table.setPageIndex(0)}
      disabled={currentPage === 0}
      className={`pagination_button ${currentPage === 0 ? "active_page" : ""}`}
    >
      1
    </button>
  );

  if (currentPage > 2) {
    buttons.push(
      <span key="start-ellipsis" className="ellipsis">
        ...
      </span>
    );
  }

  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages - 2, currentPage + 1);

  for (let i = start; i <= end; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => table.setPageIndex(i)}
        disabled={i === currentPage}
        className={`pagination_button ${i === currentPage ? "active_page" : ""}`}
      >
        {i + 1}
      </button>
    );
  }

  if (currentPage < totalPages - 3) {
    buttons.push(
      <span key="end-ellipsis" className="ellipsis">
        ...
      </span>
    );
  }

  buttons.push(
    <button
      key={totalPages - 1}
      onClick={() => table.setPageIndex(totalPages - 1)}
      disabled={currentPage === totalPages - 1}
      className={`pagination_button ${currentPage === totalPages - 1 ? "active_page" : ""}`}
    >
      {totalPages}
    </button>
  );

  return buttons;
};

const EventsTable = ({ events = [] }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedFilter(globalFilter);
    }, 500);
    return () => clearTimeout(delay);
  }, [globalFilter]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedFilter]);

  useEffect(() => {
    setData(events);
  }, [events]);

  const columns = useMemo(() => [
    {
      accessorKey: 'timestamp',
      header: 'Tarih/Saat',
      cell: ({ getValue }) => {
        return dayjs(getValue()).format('DD/MM/YYYY HH:mm');
      },
      enableSorting: true,
    },
    {
      accessorKey: 'userName',
      header: 'Ziyaretçi',
      cell: ({ getValue }) => {
        return <span style={{ fontWeight: '500' }}>{getValue()}</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: 'type',
      header: 'Event Tipi',
      cell: ({ getValue }) => {
        const type = getValue();
        const getBadgeStyle = (type) => {
          const styles = {
            view: { 
              background: '#e6f0ff',
              color: '#1d4ed8',
              border: '1px solid #bfdbfe'
            },
            connection: { 
              background: '#e6ffef',
              color: '#15803d',
              border: '1px solid #bbf7d0'
            },
            contact: { 
              background: '#fff7da',
              color: '#a16207',
              border: '1px solid #fde68a'
            }
          };
          return styles[type] || styles.view;
        };
        
        const style = getBadgeStyle(type);
        
        return (
          <span style={{
            ...style,
            padding: '0.25rem 0.625rem',
            borderRadius: '6px',
            fontSize: '0.8125rem',
            fontWeight: '600',
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }}>
            {getEventTypeLabel(type)}
          </span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'location',
      header: 'Konum',
      cell: ({ getValue }) => {
        return (
          <span style={{ color: 'var(--subTextColor)' }}>
            {getValue()}
          </span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'device',
      header: 'Cihaz',
      cell: ({ getValue }) => {
        return (
          <span style={{ color: 'var(--subTextColor)' }}>
            {getValue()}
          </span>
        );
      },
      enableSorting: true,
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

  return (
    <div className="data_table_container" style={{ marginTop: '1.5rem' }}>
      <div className="row mb-4 d-flex align-items-center">
        <div className="col-md-6">
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              margin: 0,
              color: 'var(--textColor)' 
            }}>
              Event Listesi
            </h3>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--subTextColor)', 
              margin: '0.25rem 0 0 0' 
            }}>
              {data.length} event
            </p>
          </div>
        </div>
        <div className="col-md-6">
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
      </div>

      <div className="table_responsive">
        <table className="data_table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="clickable_cell"
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
              <tr key={row.id}>
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
      </div>

      <div className="pagination_bar d-flex justify-content-between">
        <div className="d-flex gap-1 gap-md-2 align-items-center" style={{overflow:"auto"}}>
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="pagination_button"
          >
            <FiChevronsLeft size={15} />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="pagination_button"
          >
            <FaChevronLeft size={12} />
          </button>
          {renderPageButtons(table)}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="pagination_button"
          >
            <FaChevronRight size={12} />
          </button>
          <button
            onClick={() => table.setPageIndex(totalPages - 1)}
            disabled={!table.getCanNextPage()}
            className="pagination_button"
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
            className="page_size_select"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>Toplam Kayıt: {data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
