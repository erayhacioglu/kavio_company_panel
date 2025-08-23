// File: src/pages/NotFound.jsx
import { FaSearch, FaHome, FaEnvelope } from "react-icons/fa";
import "./error_page.scss";
import { useTranslation } from "react-i18next";

export default function NotFound({
  subtitle = "Not Found",
  supportEmail = "support@example.com",
  appName = "KAVİO",
}) {
  const { t } = useTranslation();
  return (
    <div className="error_page" role="main">
      <main className="error_page_container" aria-labelledby="page-title">
        <section className="card" aria-describedby="page-desc">
          <div className="card__icon" aria-hidden>
            <div className="card__iconInner">
              <FaSearch aria-hidden className="card__iconSvg" />
            </div>
          </div>

          <header className="card__header">
            <h1 id="page-title" className="card__title">
              {t("errorPages.notFound.title")}
            </h1>
            <span className="pill" aria-label="HTTP Status 404">
              {subtitle}
            </span>
          </header>

          <p id="page-desc" className="card__text">
            {t("errorPages.notFound.message")}
          </p>

          <div className="actions">
            <a href="/" className="error_page_btn btn--primary">
              <FaHome className="btn__icon" aria-hidden /> {t("errorPages.notFound.linkText")}
            </a>
            <a
              className="error_page_btn btn--support"
              href={`mailto:${supportEmail}?subject=404%20Eri%C5%9Fim%20Talebi`}
            >
              <FaEnvelope className="btn__icon" aria-hidden /> {t("errorPages.notFound.supportText")}
            </a>
          </div>

          <div className="hint" role="note">
            <strong>{t("errorPages.notFound.subMessageTitle")}</strong> {t("errorPages.notFound.subMessage")}
          </div>

          <div className="divider">
            <span className="divider__line" />
            <span className="pill pill--muted">{t("errorPages.notFound.errorCode")} 404</span>
            <span className="divider__line" />
          </div>
        </section>

        <footer className="footer">© {new Date().getFullYear()} – {appName}</footer>
      </main>
    </div>
  );
}


