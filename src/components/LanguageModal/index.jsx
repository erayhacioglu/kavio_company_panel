import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import languageIcon from "../../assets/images/header/language.png";
import trIcon from "../../assets/images/header/turkey.png";
import enIcon from "../../assets/images/header/united-kingdom.png";
import "./language_modal.scss";
import { useTranslation } from "react-i18next";

const LanguageModal = ({ languageModal, setLanguageModal }) => {
  const { t, i18n } = useTranslation();
  return (
    <Modal
      size="md"
      centered
      show={languageModal}
      onHide={() => setLanguageModal(false)}
    >
      <ModalHeader closeButton />
      <ModalBody>
        <div className="language_modal">
          <div className="language_modal_img">
            <img src={languageIcon} alt="" className="language_modal_icon" />
          </div>
          <div className="language_modal_title">{t("languageModal.title")}</div>
          <div className="language_modal_languages">
            <div className="row">
              <div className="col text-end">
                <div
                  className={`language_item ${
                    i18n.language === "tr" ? "selected" : ""
                  }`}
                  onClick={() => i18n.changeLanguage("tr")}
                >
                  <img src={trIcon} alt="" className="language_item_img" />
                  <span className="language_item_text">
                    {t("languageModal.turkishButtonText")}
                  </span>
                </div>
              </div>
              <div className="col text-start">
                <div
                  className={`language_item ${
                    i18n.language === "en" ? "selected" : ""
                  }`}
                  onClick={() => i18n.changeLanguage("en")}
                >
                  <img src={enIcon} alt="" className="language_item_img" />
                  <span className="language_item_text">
                    {t("languageModal.englishButtonText")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default LanguageModal;
