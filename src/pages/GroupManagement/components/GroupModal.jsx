import {useEffect} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addGroup,updateGroup } from '../../../redux/slices/groupSlice'
import { useFormik } from 'formik'
import validationSchema from "../validationSchema";

const GroupModal = ({groupModalShow,setGroupModalShow,updatedData,setUpdatedData,setRefresh}) => {
  const dispatch = useDispatch();

  const {handleBlur,handleSubmit,handleChange,values,errors,touched,setFieldValue,resetForm} = useFormik({
    initialValues:{
      name:""
    },
    validationSchema,
    onSubmit:(values) => {
      handleClickSubmit(values); 
    }
  });

  useEffect(() => {
    if(updatedData?.name){
      setFieldValue("name",updatedData?.name);
    }
  },[updatedData.name,setFieldValue]);

  const completedHandleSubmit = () => {
    setRefresh(true);
    setGroupModalShow(false);
    setUpdatedData(false);
    resetForm();
  }

  const handleClickSubmit = (values) => {
    if(values?.name){
      if(updatedData){
        dispatch(updateGroup({name:values?.name,id:updatedData?.id})).then((dispatchRes) => {
          if(dispatchRes?.meta?.requestStatus === "fulfilled"){
            completedHandleSubmit();
          }
        })
      }else{
        dispatch(addGroup({name:values?.name})).then((dispatchRes) => {
          if(dispatchRes?.meta?.requestStatus === "fulfilled"){
            completedHandleSubmit();
          }
        })
      }
    }
  }

  return (
    <Modal size="md"
      centered
      show={groupModalShow}
      onHide={() => {
        setGroupModalShow(false)
        setUpdatedData(false);
        resetForm();
      }}>
        <ModalHeader closeButton>
          {updatedData ? "Grup Güncelleme":"Grup Ekleme"}
        </ModalHeader>
        <ModalBody>
            <div className="form_group">
              <input type="text" className='form_control' placeholder='Grup Adı' name='name' value={values?.name} onBlur={handleBlur} onChange={handleChange}/>
              {
                touched?.name && errors?.name && <div className='form_error'>{errors?.name}</div>
              }
            </div>
        </ModalBody>
        <ModalFooter>
          <div className='modal_footer_button_groups'>
            <button className='btn btn-sm btn-danger'>İptal</button>
            <button className='btn btn-sm btn-primary' onClick={handleSubmit}>{updatedData ? "Güncelle":"Kaydet"}</button>
          </div>
        </ModalFooter>
    </Modal>
  )
}

export default GroupModal