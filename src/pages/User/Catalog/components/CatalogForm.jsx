import React from 'react'
import { Plus } from "lucide-react";

const CatalogForm = () => {
  return (
    <div className="col-md-12">
        <div className="custom_card">
          <div className="custom_card_header">
            <span>Doküman Ekle</span>
          </div>
          <div className="custom_card_body">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="form_group">
                  <label className="form_label">Başlık</label>
                  <input type="text" className="form_control" />
                </div>
                <div className="catalog_added_container">
                  <label htmlFor="thumbnail" className="catalog_add_button">
                    <input type="file" id="thumbnail" className="d-none" />
                    <div className="catalog_add_button_body">
                      <div className="catalog_added_icon">
                        <div className="catalog_added_icon_circle">
                          <Plus size={30} />
                        </div>
                        <span>Kapak Fotoğrafı Ekle</span>
                      </div>
                      <div className="selected_added_item">Eray.jpg</div>
                    </div>
                  </label>
                  <label htmlFor="file" className="catalog_add_button">
                    <input type="file" id="file" className="d-none" />
                    <div className="catalog_add_button_body">
                      <div className="catalog_added_icon">
                        <div className="catalog_added_icon_circle">
                          <Plus size={30} />
                        </div>
                        <span>Pdf Ekle</span>
                      </div>
                      <div className="selected_added_item">Eray.jpg</div>
                    </div>
                  </label>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="catalog_card_preview">
                    <div className="catalog_card_preview_thumbnail">
                        <img src="" alt="" className='catalog_card_preview_img'/>
                    </div>
                    <div className='catalog_card_preview_title'>Title</div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end mt-4">
              <button className="btn btn_primary">Kaydet</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CatalogForm