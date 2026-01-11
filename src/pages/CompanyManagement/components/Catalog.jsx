import { useEffect, useState } from "react";
import "./Catalog/catalog.scss";
import CatalogForm from "./Catalog/CatalogForm";
import CatalogList from "./Catalog/CatalogList";
import PageLoader from "../../../components/PageLoader";
import Axios from "../../../services/Axios";

const Catalog = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [catalogDataLoading, setCatalogDataLoading] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const [catalogFormData, setCatalogFormData] = useState({
    name: "",
    url: "",
    coverPhoto: "",
  });

  const getCatalogData = async () => {
    setCatalogDataLoading(true);
    try {
      const res = await Axios.get(`/company-management/get-catalog-page`);
      if (res?.status === 200) {
        setCatalogData(res?.data);
      }
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setCatalogDataLoading(false);
    }
  };

  useEffect(() => {
    getCatalogData();
  }, []);

  const generalLoading = catalogDataLoading;

  if (generalLoading) {
    return <PageLoader />;
  }

  return (
    <div className="row mt-5">
      <CatalogForm
        catalogFormData={catalogFormData}
        setCatalogFormData={setCatalogFormData}
        getCatalogData={getCatalogData}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <CatalogList 
        catalogData={catalogData} 
        getCatalogData={getCatalogData}
        setEditMode={setEditMode}
        setCatalogFormData={setCatalogFormData}
      />
    </div>
  );
};

export default Catalog;
