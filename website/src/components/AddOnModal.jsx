import { useState } from 'react';
import { ethers } from 'ethers';
import { Loader2, X, AlertCircle, CheckCircle, Package } from 'lucide-react';




export function AddOnModal({ addOn, onClose }) {
  const [quantity, setQuantity] = useState(addOn.quantity);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const totalPrice = Number(addOn.price.replace('$', '')) * quantity;

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (quantity <= 0) return;

    try {
      setStatus('loading');
      
      // Request account access
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Contract interaction would go here
      const tx = await signer.sendTransaction({
        to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // Example contract address
        value: ethers.parseEther((totalPrice * 0.0005).toString()) // Convert USD to ETH for demo
      });
      
      await tx.wait();
      setStatus('success');
    } catch (err) {
      console.error('Purchase error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process purchase');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          {addOn.icon}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Purchase {addOn.name}
            </h2>
            <p className="text-sm text-gray-600">{addOn.description}</p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Purchase Successful!
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              You have successfully purchased {quantity} {addOn.name.toLowerCase()}.
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Price per unit</span>
                <span className="text-sm font-medium text-gray-900">{addOn.price}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                  min="1"
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total price</span>
                  <span className="text-lg font-semibold text-gray-900">${totalPrice}</span>
                </div>
              </div>
            </div>

            {status === 'error' && (
              <div className="p-3 rounded-lg bg-red-50 flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                `Purchase for $${totalPrice}`
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}