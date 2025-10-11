import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  _embedded: {
    'wp:featuredmedia': { source_url: string }[];
    'wp:term': { name: string }[][];
  };
  link: string;
}

export default function Blogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://tnsystems.in/wp-json/wp/v2/posts?per_page=8&_embed');
        const data: Post[] = await response.json();
        setPosts(data);
        setFilteredPosts(data);

        const allCategories = data.reduce((acc: string[], post) => {
          const postCategories = post._embedded['wp:term'][0].map(cat => cat.name);
          return [...acc, ...postCategories];
        }, []);
        setCategories(['All', ...Array.from(new Set(allCategories))]);

      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post._embedded['wp:term'][0].some(cat => cat.name === selectedCategory)
      );
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, posts]);

  return (
    <section id="blogs" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">From the Blog</h2>
          <p className="mt-4 text-lg text-gray-600">Stay updated with our latest news and insights.</p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                ? 'bg-cyan-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}>
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center">Loading posts...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                {post._embedded['wp:featuredmedia'] && (
                  <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} className="w-full h-40 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h3>
                  <div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.substring(0, 100) + '...' }}></div>
                  <Link to={`/blog/${post.slug}`} className="text-cyan-600 hover:text-cyan-700 font-medium mt-4 inline-block">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/blog" className="bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition-all hover:shadow-lg">
            View More Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
