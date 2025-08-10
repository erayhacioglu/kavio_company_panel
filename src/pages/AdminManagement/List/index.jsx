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
            headerButtons={
              <>
                <button className="btn btn-sm btn-primary">Button 1</button>
                <button className="btn btn-sm btn-success">Button 2</button>
                <button className="btn btn-sm btn-danger">Button 3</button>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default List;
