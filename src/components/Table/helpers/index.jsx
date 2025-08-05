export const renderPageButtons = (table) => {
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
          className={`pagination-button ${
            i === currentPage ? "active-page" : ""
          }`}
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
      className={`pagination-button ${currentPage === 0 ? "active-page" : ""}`}
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
        className={`pagination-button ${
          i === currentPage ? "active-page" : ""
        }`}
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
      className={`pagination-button ${
        currentPage === totalPages - 1 ? "active-page" : ""
      }`}
    >
      {totalPages}
    </button>
  );

  return buttons;
};
