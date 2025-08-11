import { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Table from "../../components/Table";
import { FaCheck, FaLink } from "react-icons/fa";

const CardManagement = () => {
  const [refresh, setRefresh] = useState(false);
  const [copiedUniqueCode, setCopiedUniqueCode] = useState({
    id: null,
    uniqueCode: null,
  });

  useEffect(() => {
  if (copiedUniqueCode?.id) {
    const timeout = setTimeout(() => {
      setCopiedUniqueCode({ id: null, uniqueCode: null });
    }, 1000);
    return () => clearTimeout(timeout);
  }
}, [copiedUniqueCode]);

const handleCopy = (id, code) => {
  if (!code) return;
  navigator.clipboard.writeText(code)
    .then(() => {
      setCopiedUniqueCode({ id, uniqueCode: code });
    })
    .catch((err) => {
      console.error("Kopyalama başarısız:", err);
    });
};

  const columns = [
    {
      accessorKey: "abc",
      header: "Resim",
      cell: ({ row }) => (
        <div className="table_avatar">
          <img
            src={row?.original?.profileImageUrl}
            alt=""
            className="table_avatar_img"
          />
        </div>
      ),
    },
    {
    accessorKey: "uniqueCode",
    header: "uniqueCode",
    cell: ({ row }) => (
      <button
        className="table_copy_item"
        onClick={() =>
          handleCopy(row?.original?.id, row?.original?.uniqueCode)
        }
      >
        {copiedUniqueCode?.id === row?.original?.id ? (
          <FaCheck className="text-success" />
        ) : (
          <FaLink />
        )}
        &nbsp;{row?.original?.uniqueCode}
      </button>
    ),
  },
    {
      accessorKey: "firstName",
      header: "Ad",
    },
    {
      accessorKey: "lastName",
      header: "Soyad",
    },
    {
      accessorKey: "email",
      header: "email",
    },
  ];

  return (
    <>
      <div className="container">
        <BreadCrumb pageTitle="Kart Yönetimi" />
        <div className="row margin-25">
          <div className="col-md-12">
            <Table
              columns={columns}
              endpoint="https://api.kavio.co/api/company-admin/users"
              paramsMapper={(params) => ({
                page: params.page,
                size: params.size,
                keyword: params.keyword,
              })}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardManagement;
