import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  _embedded: {
    'wp:featuredmedia': { source_url: string }[];
  };
  link: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://tnsystems.in/wp-json/wp/v2/posts?per_page=100&_embed');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Our Blog</h1>
          <p className="mt-4 text-lg text-gray-600">All our latest news and insights.</p>
        </div>
        {loading ? (
          <div className="text-center">Loading posts...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                {post._embedded['wp:featuredmedia'] && (
                  <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h3>
                  <div className="text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                   <Link to={`/blog/${post.slug}`} className="text-cyan-600 hover:text-cyan-700 font-medium mt-4 inline-block">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
