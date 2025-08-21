import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  ogUrl,
  ogImage,
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n?.language || "tr";
  const fullTitle = title ? `Kavio | ${title}` : "Kavio";

  return (
    <Helmet>
      {/* Dil */}
      <html lang={currentLang} />

      {/* Title */}
      <title>{fullTitle}</title>

      {/* Meta Description */}
      <meta name="description" content={description} />

      {/* Keywords */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
    </Helmet>
  );
};

export default SEO;
