import { Edit, Edit2, Trash2 } from "lucide-react"

const CatalogList = ({catalogData}) => {
  return (
    <div className="col-md-12 my-4">
        <div className='catalog_card_container'>
          {
        catalogData && catalogData?.length > 0 && catalogData?.map((item,idx) => (
          <a href={`${item?.url}`} target="_blank" className="catalog_card" key={idx}>
            <div className="catalog_card_thumbnail">
              <img src={item?.coverPhoto} alt="" className="catalog_card_img"/>
            </div>
            <div className="catalog_card_title">
              <div className="title_text">{item?.name}</div>
            </div>
            <div className="catalog_card_btn_groups">
              <button className="catalog_card_btn edit"><Edit size={16}/></button>
              <button className="catalog_card_btn delete"><Trash2 size={16}/></button>
            </div>
          </a>
        ))
      }
    </div>
    </div>
  )
}

export default CatalogList