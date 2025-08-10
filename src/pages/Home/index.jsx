import "./home.scss";
import InfoCard from "../../components/InfoCard";
import Carousel from "../../components/Carousel";

const App = () => {
  return (
    <div className="container">
      <div className="row align-items-stretch">
        <InfoCard />
        <Carousel />
        <div className="col-12">
          <div className="custom_card">
          <div className="custom_card_header">
            <span className="custom_card_title">Test Başlık</span>
            <div className="custom_card_header_groups">
              <button className="btn btn-sm btn-primary">Button</button>
              <button className="btn btn-sm btn-success">Button 2</button>
            </div>
          </div>
          <div className="custom_card_body">
            <div className="form_group">
              <label className="form_label">Ad Soyad</label>
              <input type="text" className="form_control" placeholder="Placeholder"/>
            </div>
            <div className="form_group">
              <label className="form_label">Ad Soyad</label>
              <input type="text" className="form_control" />
            </div>
            <div className="form_group">
              <label className="form_label">Ad Soyad</label>
              <input type="text" className="form_control" />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default App;
