import BreadCrumb from "../../../components/BreadCrumb";

const Create = () => {
    return(
        <div className="container">
            <BreadCrumb pageTitle="Yeni Admin Ekle" topTitle="Admin Yönetimi"/>
      <div className="col-12">
        <div className="custom_card">
          <div className="custom_card_header">
            <span className="custom_card_title">Admin Ekleme</span>
          </div>
          <div className="custom_card_body">
            <div className="row">
              <div className="col-md-6">
                <div className="form_group">
                  <label className="form_label">Ad</label>
                  <input type="text" className="form_control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_group">
                  <label className="form_label">Soyad</label>
                  <input type="text" className="form_control" />
                </div>
              </div>
              <div className="col-md-6 mt-2">
                <div className="form_group">
                  <label className="form_label">E-Mail</label>
                  <input type="text" className="form_control" />
                </div>
              </div>
              <div className="col-md-6 mt-2">
                <div className="form_group">
                  <label className="form_label">Rol</label>
                  <select className="form_control">
                    <option>- Seçiniz -</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="custom_card_footer">
                <button className="btn btn-primary">Kaydet</button>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default Create;