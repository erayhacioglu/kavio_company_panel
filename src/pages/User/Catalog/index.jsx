import React from "react";
import "./catalog.scss";

import CatalogForm from "./components/CatalogForm";
import CatalogList from "./components/CatalogList";

const Catalog = () => {
  return (
    <div className="row mt-5">
      <CatalogForm />
      <CatalogList />
    </div>
  );
};

export default Catalog;
