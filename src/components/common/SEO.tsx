import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = "Mepe Development Association | MEPE-MDA",
  description = "The Mepe Development Association (MDA) is dedicated to the progress and development of the Mepe Traditional Area through community engagement and strategic initiatives.",
  image = "/logo-new.png",
  url = "https://mdaGH.org",
  type = "website",
}: SEOProps) => {
  const siteTitle = title.includes("Mepe")
    ? title
    : `${title} | Mepe Development Association`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content="@MepeMDA" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
