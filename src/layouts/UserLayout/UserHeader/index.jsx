import {Link} from "react-router"
import "./user_header.scss";

const UserHeader = () => {
  return (
    <header className="user_header_container" >
        <div className="user_avatar">
            <img src="https://keenthemes.com/metronic/tailwind/react/demo1/media/avatars/300-1.png" alt="" className="user_avatar_img" />
        </div>
        <div className="user_info">
            <h5 className="user_fullname">Eray Hacıoğlu</h5>
            <h6 className="user_title">Frontend Developer</h6>
        </div>
        <div className="user_menu">
            <Link to="/user/10/profile" className="user_menu_link active">Profil</Link>
            <Link to="/user/10/profile" className="user_menu_link">Bağlantılar</Link>
            <Link to="/user/10/profile" className="user_menu_link">İstatistik</Link>
        </div>
    </header>
  )
}

export default UserHeader