export default function Products() {
  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Innovative Products</h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover our suite of products designed to elevate your business operations.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for product cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Product Name {i}</h3>
              <p className="text-gray-600">A brief description of the product and its key features will go here.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
