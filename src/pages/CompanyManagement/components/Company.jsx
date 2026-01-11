import CompanyInfo from "./Company/CompanyInfo";
import BankInfo from "./Company/BankInfo";
import { useEffect, useState } from "react";
import Axios from "../../../services/Axios";
import PageLoader from "../../../components/PageLoader";
import toast from "react-hot-toast";

const Company = () => {
  const [companyDataLoading, setCompanyDataLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [companyData, setCompanyData] = useState({
    bankAccounts: [],
    companyInfos: [],
  });

  const validateForm = () => {
    // Şirket bilgileri kontrolü
    const emptyCompanyInfos = companyData?.companyInfos?.filter(
      (item) =>
        !item?.name?.trim() ||
        !item?.taxNo?.trim() ||
        !item?.taxBody?.trim() ||
        !item?.address?.trim()
    );

    if (emptyCompanyInfos?.length > 0) {
      toast.error("Lütfen tüm şirket bilgilerini doldurun veya boş alanları silin");
      return false;
    }

    // Banka bilgileri kontrolü
    const emptyBankAccounts = companyData?.bankAccounts?.filter(
      (item) =>
        !item?.bankName?.trim() ||
        !item?.iban?.trim() ||
        !item?.holderName?.trim()
    );

    if (emptyBankAccounts?.length > 0) {
      toast.error("Lütfen tüm banka bilgilerini doldurun veya boş alanları silin");
      return false;
    }

    // IBAN formatı kontrolü (basit)
    const invalidIbans = companyData?.bankAccounts?.filter(
      (item) => item?.iban?.replace(/\s/g, "").length < 24
    );

    if (invalidIbans?.length > 0) {
      toast.error("Lütfen geçerli bir IBAN numarası girin (min 24 karakter)");
      return false;
    }

    return true;
  };

  const getCompanyData = async () => {
    setCompanyDataLoading(true);
    try {
      const res = await Axios.get(`/company-management/get-company-page`);
      if (res?.status === 200) {
        setCompanyData(res?.data);
      }
    } catch (error) {
      console.log("Error : ", error);
      toast.error("Şirket bilgileri yüklenirken bir hata oluştu");
    } finally {
      setCompanyDataLoading(false);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      // Bulk update için bank accounts'ı ayır
      const bankAccountsToUpdate = companyData?.bankAccounts?.filter(item => item?.id);
      const bankAccountsToAdd = companyData?.bankAccounts?.filter(item => !item?.id);

      // Banka hesaplarını bulk update
      if (bankAccountsToUpdate.length > 0) {
        await Axios.put(`/bank-accounts/bulk-update/1`, bankAccountsToUpdate);
      }

      // Yeni banka hesaplarını toplu ekle (eğer varsa)
      if (bankAccountsToAdd.length > 0) {
        // Varsayılan groupId - gerçek değeri state'den veya context'ten alabilirsin
        const groupId = 1; 
        await Axios.post(`/company-admin/${groupId}/bulk-add-bank-account`, {
          groupId,
          bankAccounts: bankAccountsToAdd
        });
      }

      // Company info normal şekilde güncelle
      const res = await Axios.post(
        `/company-management/update-company-information`,
        { companyInfos: companyData?.companyInfos }
      );

      if (res?.status === 200) {
        toast.success("Şirket bilgileri başarıyla güncellendi");
        getCompanyData();
      }
    } catch (error) {
      console.log("Error : ", error);
      toast.error("Şirket bilgileri güncellenirken bir hata oluştu");
    } finally {
      setSubmitLoading(false);
    }
  };

  const generalLoading = companyDataLoading || submitLoading;

  if (generalLoading) {
    return <PageLoader />;
  }

  const hasEmptyFields =
    companyData?.companyInfos?.some(
      (item) =>
        !item?.name?.trim() ||
        !item?.taxNo?.trim() ||
        !item?.taxBody?.trim() ||
        !item?.address?.trim()
    ) ||
    companyData?.bankAccounts?.some(
      (item) =>
        !item?.bankName?.trim() ||
        !item?.iban?.trim() ||
        !item?.holderName?.trim()
    );

  return (
    <div className="row my-4">
      {companyData?.companyInfos?.length === 0 &&
        companyData?.bankAccounts?.length === 0 && (
          <div className="col-md-12 mb-4">
            <div className="alert alert-info">
              Henüz şirket veya banka bilgisi eklenmemiş. Eklemek için aşağıdaki
              butonları kullanabilirsiniz.
            </div>
          </div>
        )}
      <CompanyInfo data={companyData?.companyInfos} setData={setCompanyData} />
      <BankInfo data={companyData?.bankAccounts} setData={setCompanyData} />
      <div className="d-flex align-items-center justify-content-end mt-5">
        <button
          type="submit"
          className="btn btn_primary"
          onClick={handleSubmit}
          disabled={submitLoading || hasEmptyFields}
        >
          {submitLoading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </div>
  );
};

export default Company;
