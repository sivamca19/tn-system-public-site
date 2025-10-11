import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  children?: React.ReactNode;
}

export default function SEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://tnsystems.in/og-default.jpg',
  author,
  publishedTime,
  modifiedTime,
  tags = [],
  children
}: SEOProps) {
  const siteTitle = `${title} | TNSystems`;
  const siteName = 'TNSystems';
  const twitterHandle = '@tnsystems'; // Update with your actual Twitter handle

  // Generate canonical URL
  const canonical = canonicalUrl || window.location.href;

  // Ensure description is within optimal length (150-160 chars)
  const optimizedDescription = description.length > 160
    ? description.substring(0, 157) + '...'
    : description;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <title>{siteTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="author" content={author || 'TNSystems Team'} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific OG tags */}
      {ogType === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO enhancements */}
      <meta name="theme-color" content="#06b6d4" />
      <meta name="color-scheme" content="light dark" />

      {children}
    </Helmet>
  );
}
