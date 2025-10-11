import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface SinglePost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  _embedded: {
    'wp:featuredmedia'?: { source_url: string }[];
    author: { name: string }[];
  };
  date: string;
}

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
    return <div className="py-32 text-center">Loading...</div>;
  }

  if (!post) {
    return <div className="py-32 text-center">Post not found.</div>;
  }

  return (
    <div className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="text-cyan-600 hover:text-cyan-700 mb-8 inline-block"> &larr; Back to Blog</Link>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          <div className="flex items-center text-gray-500 mb-6">
            <span>By {post._embedded.author[0].name}</span>
            <span className="mx-2">|</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {post._embedded['wp:featuredmedia'] && (
            <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} className="w-full h-auto object-cover rounded-lg mb-8" />
          )}
          <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
        </div>
      </div>
    </div>
  );
}
