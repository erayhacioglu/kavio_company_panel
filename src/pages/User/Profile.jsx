import React from "react";
import { Form } from "react-bootstrap";
import { FaImage } from "react-icons/fa6";

const Profile = () => {
  return (
    <div className="row my-4">
      <div className="col-md-12">
        <div className="custom_card">
          <div className="custom_card_header">
            <span>Kişisel Bilgiler</span>
            <div className="custom_card_header_groups">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Düzenlensin"
              />
            </div>
          </div>
          <div className="custom_card_body">
            <div className="row">
              <div className="col-md-3 d-flex align-items-center justify-content-center">
                <div className="custom_card_avatar">
                  <label className="custom_card_avatar_upload">
                    <FaImage />
                  </label>
                  <img src="https://keenthemes.com/metronic/tailwind/react/demo1/media/avatars/300-1.png" alt="" className="custom_card_avatar_img"/>
                </div>
              </div>
              <div className="col-md-9">
                <div className="form_group">
                  <label className="form_label">Ad</label>
                  <input type="text" className="form_control" />
                </div>
                <div className="form_group">
                  <label className="form_label">Soyad</label>
                  <input type="text" className="form_control" />
                </div>
                <div className="form_group">
                  <label className="form_label">Ünvan</label>
                  <input type="text" className="form_control" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 my-4">
        <div className="custom_card">
          <div className="custom_card_header">
            <span>İletişim Bilgileri</span>
          </div>
          <div className="custom_card_body">Burası</div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="custom_card">
          <div className="custom_card_header">
            <span>Linkler</span>
          </div>
          <div className="custom_card_body">Burası</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
