import React from 'react';
import { useCartStore } from '../../store/cart.store';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const clear = useCartStore((s) => s.clear);
  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.qty * Number(i.price || 0),
    0
  );
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <div className="px-2 md:px-6 lg:px-20 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Browse products and add items to your cart.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 border rounded-lg"
        >
          Shop Products
        </button>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-6 lg:px-20 py-8">
      <div className="flex  justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Your Cart ({totalCount})</h1>
        <button
          onClick={clear}
          className="text-red-600 hover:underline font-outfit"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border rounded-xl p-3"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm font-outfit text-gray-500">
                  ${Number(item.price).toFixed(2)}
                </p>
                <div className="flex font-outfit items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQty(item.id, Math.max(1, item.qty - 1))
                    }
                    className="px-2 border rounded"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-semibold font-outfit">
                  ${(item.qty * Number(item.price)).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 font-outfit hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-xl p-4 h-fit">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <div className="flex justify-between mb-2 font-outfit">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex font-outfit justify-between text-sm text-gray-500 mb-4">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <button className="w-full bg-lemon-200 text-white py-2 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
