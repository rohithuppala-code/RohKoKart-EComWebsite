import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold text-indigo-600 
                       transition-all duration-300 hover:text-indigo-800 hover:scale-105"
          >
            <ShoppingBag className="h-6 w-6" />
            RohKo Kart
          </Link>
          <div className="flex gap-6">
            <Link to="/shop" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Shop
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
