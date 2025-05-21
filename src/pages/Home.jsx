import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920')] 
        bg-cover bg-center bg-no-repeat bg-fixed"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white p-4 w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to RohKo Kart</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Discover our curated collection of premium products designed to elevate your lifestyle.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-indigo-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg font-semibold 
                   hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <ShoppingBag className="h-6 w-6" />
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Home;