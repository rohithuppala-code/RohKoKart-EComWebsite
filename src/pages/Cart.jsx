import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

function Cart() {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (id, change) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity < 1 ? item : { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    toast.success('Order placed successfully!');
    updateCart([]);
    setTimeout(() => {
      setOrderPlaced(false);
      navigate('/shop');
    }, 3000);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (orderPlaced) {
    return (
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1920')] 
          bg-cover bg-center bg-no-repeat bg-fixed"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white p-4">
          <h2 className="text-4xl font-bold mb-4">Thank you for your order!</h2>
          <p className="text-xl mb-6">Your order has been placed successfully.</p>
          <p className="text-lg">Redirecting you to the shop...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580913428023-02c695666d61?auto=format&fit=crop&q=80&w=1920')] 
          bg-cover bg-center bg-no-repeat bg-fixed"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white p-4">
          <h2 className="text-4xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-xl mb-6">Looks like you haven't added any items yet.</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold 
                     hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <ShoppingBag className="h-6 w-6" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-gray-50">
      {/* Background for main cart view */}
      <div 
        className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=1920')] 
        bg-cover bg-center bg-no-repeat z-0"
      />
      <div className="fixed inset-0 bg-black/30 z-0" />

      {/* Content */}
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border-b last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                      <p className="text-indigo-600 font-semibold mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 h-fit">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 
                         transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="h-5 w-5" />
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;