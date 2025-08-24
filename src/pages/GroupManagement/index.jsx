import { useEffect, useState } from "react";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import BreadCrumb from "../../components/BreadCrumb";
import Table from "../../components/Table";
import GroupModal from "./components/GroupModal";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteGroup, resetGroupSlice } from "../../redux/slices/groupSlice";
import Swal from "sweetalert2";

const GroupManagement = () => {
  const [groupModalShow, setGroupModalShow] = useState(false);
  const [updatedData, setUpdatedData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {user} = useSelector(state => state?.user);

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.groups
  );

  const handleUpdateGroup = (updatedRow) => {
    if (!updatedRow) return;
    setGroupModalShow(true);
    setUpdatedData(updatedRow);
  };

  const handleDeleteGroup = async (id) => {
    if (!id) return;

    Swal.fire({
      title: "Silmek istediğinze emin misiniz?",
      showCancelButton: true,
      confirmButtonText: "Sil",
      cancelButtonText: "İptal",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGroup({ id })).then((dispatchRes) => {
          if (dispatchRes?.meta?.requestStatus === "fulfilled") {
            setRefresh(true);
          }
        });
      }
    });
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Grup Adı",
    },
    {
      accessorKey: "a",
      header: "",
      cell: ({ row }) => (
        <div className="btn_groups">
          <button
            className="btn btn-sm btn_center btn_success"
            onClick={() => handleUpdateGroup(row?.original)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-sm btn_center btn_danger"
            onClick={() => handleDeleteGroup(row?.original?.id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }
    return () => {
      dispatch(resetGroupSlice());
    };
  }, [isSuccess, isError, message, dispatch]);

  useEffect(() => {
    let t;
    if (isLoading) {
      t = setTimeout(() => {
        Swal.fire({
          title: "Yükleniyor...",
          html: "Lütfen bekleyin",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => Swal.showLoading(),
        });
      }, 150);
    } else {
      clearTimeout(t);
      Swal.close();
    }

    return () => {
      clearTimeout(t);
      Swal.close();
    };
  }, [isLoading]);

  return (
    <>
      <div className="container">
        <BreadCrumb pageTitle="Grup Listesi" />
        <div className="row margin-25">
          <div className="col-md-12">
            <Table
              columns={columns}
              endpoint={`/user-groups/company/${user?.company?.id}`}
              paramsMapper={(params) => ({
                page: params.page,
                size: params.size,
                keyword: params.keyword,
              })} 
              headerButtons={
                <>
                  <button
                    className="btn btn-sm btn_primary d-flex align-items-center"
                    onClick={() => setGroupModalShow(true)}
                  >
                    <FaPlusCircle />
                    &nbsp;Grup Ekle
                  </button>
                </>
              }
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </div>
        </div>
      </div>
      <GroupModal
        groupModalShow={groupModalShow}
        setGroupModalShow={setGroupModalShow}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default GroupManagement;
