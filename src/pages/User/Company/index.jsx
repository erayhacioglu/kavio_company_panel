import CompanyInfo from "./components/CompanyInfo";
import BankInfo from "./components/BankInfo";
import { useEffect, useState } from "react";
import Axios from "../../../services/Axios";
import { useParams } from "react-router";
import PageLoader from "../../../components/PageLoader";
import toast from "react-hot-toast";

const Company = () => {
  const { id } = useParams();
  const [companyDataLoading, setCompanyDataLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [companyData, setCompanyData] = useState({
    bankAccounts: [],
    companyInfos: [],
  });

  const getCompanyData = async () => {
    setCompanyDataLoading(true);
    try {
      const res = await Axios.get(`/profile-management/get-company-page/${id}`);
      if (res?.status === 200) {
        setCompanyData(res?.data);
      }
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setCompanyDataLoading(false);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
        const res = await Axios.post(`/profile-management/update-company-information/${id}`,companyData);
        if(res?.status === 200){
            toast.success("Şirket bilgileri başarıyla güncellendi");
            getCompanyData();
        }
    } catch (error) {
        console.log("Error : ",error);
    }finally{
        setSubmitLoading(false);
    }
  }

  const generalLoading = companyDataLoading || submitLoading;

  if(generalLoading){
    return <PageLoader />
  }

  return (
    <div className="row my-4">
      <CompanyInfo data={companyData?.companyInfos} setData={setCompanyData} />
      <BankInfo data={companyData?.bankAccounts} setData={setCompanyData} />
      <div className="d-flex align-items-center justify-content-end mt-5">
        <button type="submit" className="btn btn_primary" onClick={handleSubmit}>Kaydet</button>
      </div>
    </div>
  );
};

export default Company;
