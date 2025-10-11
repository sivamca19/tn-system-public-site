import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from './SEO';

interface SinglePost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  _embedded: {
    'wp:featuredmedia'?: { source_url: string }[];
    author: { name: string }[];
  };
  date: string;
  modified: string;
}

// Helper to strip HTML tags for meta description
const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

// Calculate reading time (average 200 words per minute)
const calculateReadingTime = (content: string): number => {
  const text = stripHtml(content);
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / 200);
};

// Loading skeleton for single post
const PostSkeleton = () => (
  <div className="py-24 md:py-32 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-24 mb-8" />
        <div className="h-10 bg-gray-200 rounded mb-4" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-6" />
        <div className="w-full h-96 bg-gray-200 rounded-lg mb-8" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  </div>
);

// Share button component
const ShareButtons = ({ url, title }: { url: string; title: string }) => {
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank', 'width=550,height=420');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=550,height=420');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=550,height=420');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <div className="flex items-center gap-3 py-6 border-y border-gray-200">
      <span className="text-sm font-medium text-gray-700">Share:</span>
      <button
        onClick={shareOnTwitter}
        className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>
      <button
        onClick={shareOnFacebook}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      <button
        onClick={copyToClipboard}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        aria-label="Copy link"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

export default function SinglePostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<SinglePost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`https://tnsystems.in/wp-json/wp/v2/posts?slug=${slug}&_embed`);
        const data: SinglePost[] = await response.json();
        if (data.length > 0) {
          setPost(data[0]);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return <PostSkeleton />;
  }

  if (!post) {
    return (
      <div className="py-32 text-center" role="alert">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
        <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const postDescription = stripHtml(post.excerpt.rendered).substring(0, 160);
  const postTitle = stripHtml(post.title.rendered);
  const readingTime = calculateReadingTime(post.content.rendered);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": postTitle,
    "image": post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : '',
    "author": {
      "@type": "Person",
      "name": post._embedded.author[0].name
    },
    "publisher": {
      "@type": "Organization",
      "name": "TNSystems",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tnsystems.in/logo.png" // Replace with your actual logo URL
      }
    },
    "datePublished": post.date,
    "dateModified": post.modified
  };

  const featuredImage = post._embedded['wp:featuredmedia']?.[0]?.source_url || 'https://tnsystems.in/og-default.jpg';
  const canonicalUrl = `https://tnsystems.in/blog/${post.slug}`;

  return (
    <>
      <SEO
        title={postTitle}
        description={postDescription}
        ogType="article"
        ogImage={featuredImage}
        author={post._embedded.author[0].name}
        publishedTime={post.date}
        modifiedTime={post.modified}
        canonicalUrl={canonicalUrl}
      >
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </SEO>
      <article className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="text-cyan-600 hover:text-cyan-700 mb-8 inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-1"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            <header className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-500 text-sm md:text-base">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{post._embedded.author[0].name || 'TNSystems'}</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </header>
            {post._embedded['wp:featuredmedia'] && (
              <img
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={`Featured image for ${postTitle}`}
                className="w-full h-auto object-cover rounded-lg mb-8 shadow-lg"
                loading="eager"
              />
            )}
            <ShareButtons url={canonicalUrl} title={postTitle} />
            <div className="prose lg:prose-xl max-w-none my-8" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
            <ShareButtons url={canonicalUrl} title={postTitle} />
          </div>
        </div>
      </article>
    </>
  );
}
