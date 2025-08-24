import { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Table from "../../components/Table";
import { FaCheck, FaEdit, FaLink, FaTimes } from "react-icons/fa";
import { FaArrowRotateLeft, FaEye,FaLayerGroup } from "react-icons/fa6";
import { Link } from "react-router";
import { cardStatus } from "../../enums";
import Badge from "../../components/Badge";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import GroupModal from "./GroupModal";

const CardManagement = () => {
  const [refresh, setRefresh] = useState(false);
  const [copiedUniqueCode, setCopiedUniqueCode] = useState({
    id: null,
    uniqueCode: null,
  });

  const [groupModalShow,setGroupModalShow] = useState(false);
  const [selectedLine,setSelectedLine] = useState(false);

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

const handleCardReset = async () => {
  try {
    Swal.fire({
  title: "Kart Sıfırlama",
  text: "Kartı sıfırlamak istediğinize emin misiniz? Bu işlem geri alınamaz.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Sıfırla",
  cancelButtonText: "İptal",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    toast.success("Kart sıfırlama işlemi başarıyla tamamlandı");
  } 
});

  } catch (error) {
    console.log("Error : ",error);
  }
}

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
    accessorKey:"companyName",
    header:"Şirket",
    cell:({row}) => row?.original?.companyName ?? "-" 
  },
  {
    accessorKey:"role",
    header:"Rol",
    cell:({row}) => row?.original?.role ?? "-" 
  },
  {
    accessorKey:"ipAddress",
    header:"İp Adresi",
    cell:({row}) => row?.original?.ipAddress ?? "-" 
  },
  {
    accessorKey:"isBanned",
    header:"Ban Durumu",
    cell:({row}) => (
      <>
        <Badge color={row?.original?.isBanned ? "success":"danger"} shape="circle">{row?.original?.isBanned ? <FaCheck /> : <FaTimes/>}</Badge>
      </>
    )
  },
  {
    accessorKey:"verifed",
    header:"Doğrulama Durumu",
    cell:({row}) => (
      <>
        <Badge color={row?.original?.verified ? "success":"danger"} shape="circle">{row?.original?.verified ? <FaCheck /> : <FaTimes/>}</Badge>
      </>
    )
  },
  {
    accessorKey:"status",
    header:"Durum",
    cell:({row}) => (
      <>
        <Badge color={cardStatus[row?.original?.status]?.color}>{row?.original?.status ? cardStatus[row?.original?.status]?.text : "-"}</Badge>
      </>
    ) 
  },
    {
      accessorKey:"a",
      header:"",
      cell:({row}) => (
        <div className="btn_groups">
          <Link to={`/user/${row?.original?.cardId}/profile`} className="btn btn-sm btn_center btn_success text-white"><FaEye /></Link>
          <Link to={`/user-update/${row?.original?.cardId}/profile`} className="btn btn-sm btn_center btn_primary text-white"><FaEdit /></Link>
          <button className="btn btn-sm btn_center btn_warning text-white" onClick={() => {
            setGroupModalShow(true)
            setSelectedLine(row?.original);
          }}><FaLayerGroup /></button>
          <button className="btn btn-sm btn_center btn_danger text-white" onClick={() => handleCardReset(row?.original)}><FaArrowRotateLeft /></button>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="container">
        <BreadCrumb pageTitle="Kart Yönetimi" />
        <div className="row margin-25">
          <div className="col-md-12">
            <Table
              columns={columns}
              endpoint="/company-admin/users"
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
      <GroupModal groupModalShow={groupModalShow} setGroupModalShow={setGroupModalShow} selectedLine={selectedLine} setSelectedLine={setSelectedLine} setRefresh={setRefresh}/>
    </>
  );
};

export default CardManagement;
