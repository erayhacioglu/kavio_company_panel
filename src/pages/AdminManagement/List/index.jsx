import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/Table";

const List = () => {
  const columns = [
    {
      accessorKey: "companyName",
      header: "Şirket",
    },
    {
      accessorKey: "city",
      header: "İl",
    },
    {
      accessorKey: "county",
      header: "İlçe",
    },
  ];

  return (
    <div className="container">
      <BreadCrumb pageTitle="Admin Listesi" topTitle="Admin Yönetimi" />
      <div className="row margin-25">
        <div className="col-md-12">
          <Table
            columns={columns}
            endpoint="https://biovirtualapi.ibb.istanbul/api/public/jobs"
            paramsMapper={(params) => ({
              page: params.page,
              size: params.size,
              keyword: params.keyword,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
