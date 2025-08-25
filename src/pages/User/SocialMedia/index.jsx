import { useEffect, useState } from "react";
import SocialMediaList from "./components/SocialMediaList";
import PageLoader from "../../../components/PageLoader";
import Axios from "../../../services/Axios";
import "./social_media.scss";
import SocialMediaManagement from "./components/SocialMediaManagement";
import { useParams } from "react-router";
import { generateMessage } from "../../../helpers";
import toast from "react-hot-toast";

const SocialMedia = () => {
    const {id} = useParams();
  const [socialMediaList, setSocialMediaList] = useState([]);
  const [socialMediaListLoading, setSocialMediaListLoading] = useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(false);

  const [socialMediaData,setSocialMediaData] = useState([]);
  const [socialMediaDataLoading,setSocialMediaDataLoading] = useState(false);

  const [submitLoading,setSubmitLoading] = useState(false);

  const getSocialMediaList = async () => {
    setSocialMediaListLoading(true);
    try {
      const res = await Axios.get(
        `/social-media-platforms/social-media-platforms`
      );
      if (res?.status === 200) {
        setSocialMediaList(res?.data);
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setSocialMediaListLoading(false);
    }
  };

  const getSocialMediaData = async () => {
    setSocialMediaDataLoading(true);
    try {
      const res = await Axios.get(
        `/profile-management/get-social-medias/${id}`
      );
      if (res?.status === 200) {
        setSocialMediaData(res?.data);
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setSocialMediaDataLoading(false);
    }
  };

  useEffect(() => {
    getSocialMediaList();
    getSocialMediaData();
  }, []);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
        const res = await Axios.post(`/profile-management/update-social-medias/${id}`,socialMediaData);
        if(res?.status === 200){
            toast.success("Sosyal Medya bilgileri başarıyla güncellendi");
            getSocialMediaList()
            getSocialMediaData();
        }
    } catch (error) {
        generateMessage(error,"Add Social Media")
    }finally{
        setSubmitLoading(false);
    }
  }

  const generalLoading = socialMediaListLoading || socialMediaDataLoading || submitLoading;

  if (generalLoading) {
    return <PageLoader />;
  }

  return (
    <div className="row my-4">
      <SocialMediaList
        socialMediaList={socialMediaList}
        selectedSocialMedia={selectedSocialMedia}
        setSelectedSocialMedia={setSelectedSocialMedia}
        socialMediaData={socialMediaData}
        setSocialMediaData={setSocialMediaData}
      />
      <SocialMediaManagement
        socialMediaList={socialMediaList}
        selectedSocialMedia={selectedSocialMedia}
        socialMediaData={socialMediaData}
        setSocialMediaData={setSocialMediaData}
      />
      <div className="d-flex align-items-center justify-content-end mt-5">
        <button type="submit" className="btn btn_primary" onClick={handleSubmit}>Kaydet</button>
      </div>
    </div>
  );
};

export default SocialMedia;
