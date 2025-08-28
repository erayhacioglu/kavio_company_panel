import React, { useEffect, useState } from "react";
import "./catalog.scss";

import CatalogForm from "./components/CatalogForm";
import CatalogList from "./components/CatalogList";
import { useParams } from "react-router";
import PageLoader from "../../../components/PageLoader";
import Axios from "../../../services/Axios";

const Catalog = () => {
  const {id} = useParams();

  const [catalogData,setCatalogData] = useState([]);
  const [catalogDataLoading,setCatalogDataLoading] = useState(false);

  const [catalogFormData,setCatalogFormData] = useState({
    name:"",
    url:"",
    coverPhoto:"",
    cardId:id
  });

  console.log('catalogFormData', catalogFormData)
  

  const getCatalogData = async () => {
    setCatalogDataLoading(true);
    try {
      const res = await Axios.get(`/profile-management/get-catalog-page/${id}`);
      if(res?.status === 200){
        setCatalogData(res?.data);
      }
    } catch (error) {
      console.log("Error : ",error);
    }finally{
      setCatalogDataLoading(false);
    }
  }
  
  useEffect(() => {
    getCatalogData();
  },[]);

  const generalLoading = catalogDataLoading;

  if(generalLoading){
    return <PageLoader />
  }

  return (
    <div className="row mt-5">
      <CatalogForm catalogFormData={catalogFormData} setCatalogFormData={setCatalogFormData}/>
      <CatalogList catalogData={catalogData}/>
    </div>
  );
};

export default Catalog;
