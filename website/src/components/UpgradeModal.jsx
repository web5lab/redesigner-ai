import { useState } from 'react';
import { ethers } from 'ethers';
import { Loader2, X, AlertCircle, CheckCircle } from 'lucide-react';



export function UpgradeModal({ plan, onClose }) {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!amount) return;

    try {
      setStatus('loading');
      
      // Request account access
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Contract interaction would go here
      // This is a placeholder for demonstration
      const tx = await signer.sendTransaction({
        to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // Example contract address
        value: ethers.parseEther(amount)
      });
      
      await tx.wait();
      setStatus('success');
    } catch (err) {
      console.error('Deposit error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process deposit');
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

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Upgrade to {plan.name}
        </h2>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upgrade Successful!
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Your plan has been upgraded successfully. You now have access to all {plan.name} features.
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Plan Details
              </h3>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deposit Amount (ETH)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
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
                  'Deposit & Upgrade'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}