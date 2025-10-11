import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function SEO({ title, description, children }: SEOProps) {
  const siteTitle = `${title} | TNSystems`;
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {children}
    </Helmet>
  );
}
