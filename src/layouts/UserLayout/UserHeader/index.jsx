import {Link,useLocation, useParams} from "react-router"
import "./user_header.scss";
import { useEffect, useState } from "react";
import PageLoader from "../../../components/PageLoader";
import Axios from "../../../services/Axios";

const UserHeader = () => {
  const location = useLocation();
  const {id} = useParams();

  const [profileImgLoading,setProfileImgLoading] = useState(false);
  const [profileImg,setProfileImg] = useState("");
  const [profileDataLoading,setProfileDataLoading] = useState(false);
  const [profileData,setProfileData] = useState({});

  const getProfileImg = async () => {
    try {
      setProfileImgLoading(true);
      const res = await Axios.get(`/card/user-images/${id}`);
      if(res?.data?.profileImg){
        setProfileImg(res?.data?.profileImg);
      }
    } catch (error) {
      console.error("Profile img getirilemedi",error);
    }finally{
      setProfileImgLoading(false);
    }
  }

  const getProfileData = async () => {
    try {
      setProfileDataLoading(true);
      const res = await Axios.get(`/profile-management/get-profile/${id}`);
      if(res?.data?.userInfo){
        setProfileData(res?.data?.userInfo);
      }
    } catch (error) {
      console.error("Profile img getirilemedi",error);
    }finally{
      setProfileDataLoading(false);
    }
  }

  console.log('profileData', profileData)

  useEffect(() => {
    if(!id) return;
    getProfileImg();
    getProfileData();
  },[id]);

  const isActive = (path) => {
    return location.pathname === path
      ? "user_menu_link active"
      : "user_menu_link";
  };

  const generalLoading = profileDataLoading || profileImgLoading;

  if(generalLoading){
    return <PageLoader />
  }

  return (
    <header className="user_header_container" >
        <div className="user_avatar">
            <img src={profileImg ?? `https://keenthemes.com/metronic/tailwind/react/demo1/media/avatars/300-1.png`} alt="" className="user_avatar_img" />
        </div>
        <div className="user_info">
            <h5 className="user_fullname">{profileData?.firstName + " " + profileData?.lastName}</h5>
            <h6 className="user_title">{profileData?.bio}</h6>
        </div>
        <div className="user_menu">
        <Link to={`/user/${id}/profile`} className={isActive(`/user/${id}/profile`)}>
          Profil
        </Link>
        <Link
          to={`/user/${id}/contacts`}
          className={isActive(`/user/${id}/contacts`)}
        >
          İletişim Talepleri
        </Link>
        <Link
          to={`/user/${id}/connections`}
          className={isActive(`/user/${id}/connections`)}
        >
          Bağlantılar
        </Link>
        {/* <Link
          to={`/user/${id}/statistics`}
          className={isActive(`/user/${id}/statistics`)}
        >
          İstatistik
        </Link> */}
        <Link
          to={`/user/${id}/activity`}
          className={isActive(`/user/${id}/activity`)}
        >
          Aktiviteler
        </Link>
      </div>
    </header>
  )
}

export default UserHeader