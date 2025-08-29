import { useState } from 'react';
import { Loader2, X, AlertCircle, CheckCircle, CreditCard } from 'lucide-react';

export function UpgradeModal({ plan, onClose }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleUpgrade = async (e) => {
    e.preventDefault();

    try {
      setStatus('loading');
      
      // Simulate upgrade process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
    } catch (err) {
      console.error('Upgrade error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process upgrade');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full shadow-lg border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200">
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Upgrade to {plan.name}
              </h2>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>
          </div>

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-200">
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
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Plan Features
                </h3>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm text-gray-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-lg bg-red-50 flex items-center gap-2 text-red-700 mb-4 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleUpgrade}
                disabled={status === 'loading'}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  `Upgrade to ${plan.name}`
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}