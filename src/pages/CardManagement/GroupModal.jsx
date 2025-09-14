import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import CustomSelect from "../../components/CustomSelect";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { useSelector } from "react-redux";
import Axios from "../../services/Axios";
import { useFormik } from "formik";
import validationSchema from "./validationSchema";
import toast from "react-hot-toast";

const GroupModal = ({
  groupModalShow,
  setGroupModalShow,
  selectedLine,
  setSelectedLine,
  setRefresh,
}) => {
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      // her zaman array!
      groupId: selectedLine?.userGroups?.map((g) => Number(g.id)) ?? [],
      // bu modal tek kişiye çalışıyorsa card id’yi dizi halinde tut
      cardIds: (() => {
        const cid = selectedLine?.card?.id ?? selectedLine?.id;
        return cid ? [Number(cid)] : [];
      })(),
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      handlePost(values);
    },
  });

  const getRoles = async () => {
    setRolesLoading(true);
    try {
      const res = await Axios.get(`/user-groups/company/${user?.company?.id}`);
      if (res?.status === 200) {
        setRoles(res?.data?.content);
      }
    } catch (error) {
      console.error("Error :", error);
    } finally {
      setRolesLoading(false);
    }
  };

  useEffect(() => {
    if (groupModalShow) {
      getRoles();
    }
  }, [groupModalShow]);

  const handlePost = async (values) => {
    setSubmitLoading(true);
    try {
      const res = await Axios.put(`/company-admin/assign-cards`, values);
      if (res?.status === 200) {
        toast.success("Grup ataması başarıyla tamamlandı");
        modalClear();
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const modalClear = () => {
    setGroupModalShow(false);
    setSelectedLine(false);
    setRefresh(true);
  };

  const generalLoading = rolesLoading || submitLoading;

  if (generalLoading) {
    return <PageLoader />;
  }

  return (
    <Modal
      show={groupModalShow}
      onHide={() => setGroupModalShow(false)}
      centered
    >
      <ModalHeader closeButton>
        <ModalTitle>Grup Ekleme</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="form_group">
          <label className="form_label">Kişi</label>
          <input
            type="text"
            className="form_control"
            value={
              selectedLine?.firstName && selectedLine?.lastName
                ? `${selectedLine?.firstName} ${selectedLine?.lastName}`
                : "-"
            }
            readOnly
          />
        </div>
        <div className="form_group">
          <label className="form_label">Grup</label>
          <CustomSelect
            isMulti
            options={
              roles?.length > 0
                ? roles?.map((el) => ({ value: el?.id, label: el?.name }))
                : []
            }
            value={roles
              ?.filter((el) => values?.groupId?.includes(el?.id))
              .map((el) => ({ value: el?.id, label: el?.name }))}
            onChange={(selected) =>
              setFieldValue(
                "groupId",
                selected ? selected?.map((s) => s?.value) : []
              )
            }
          />
          {errors?.cardIds && (
            <div className="form_error">{errors?.cardIds}</div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="modal_footer_button_groups">
          <button className="btn btn-sm btn_danger" onClick={modalClear}>
            İptal
          </button>
          <button
            type="submit"
            className="btn btn-sm btn_primary"
            onClick={handleSubmit}
          >
            Kaydet
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default GroupModal;
