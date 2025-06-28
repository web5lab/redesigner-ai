import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPricingRules } from '../../store/adminSlice';
import { DollarSign, Plus, Edit, Trash2, Save, TrendingUp, Percent } from 'lucide-react';

const PricingControl = () => {
  const dispatch = useDispatch();
  const { pricingRules, basePrice, loading } = useSelector((state) => state.admin);
  
  const [localBasePrice, setLocalBasePrice] = useState(basePrice);
  const [localPricingRules, setLocalPricingRules] = useState(pricingRules);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({
    minTickets: 1,
    maxTickets: 10,
    discountPercentage: 5
  });

  // Load pricing data on component mount
  useEffect(() => {
    dispatch(getPricingRules());
  }, [dispatch]);

  // Update local state when Redux state changes
  useEffect(() => {
    setLocalBasePrice(basePrice);
    setLocalPricingRules(pricingRules);
  }, [basePrice, pricingRules]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingRule) {
      setLocalPricingRules(prev => prev.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, ...formData }
          : rule
      ));
      setEditingRule(null);
    } else {
      const newRule = {
        id: Date.now().toString(),
        ...formData,
        isActive: true
      };
      setLocalPricingRules(prev => [...prev, newRule]);
    }
    
    setFormData({
      minTickets: 1,
      maxTickets: 10,
      discountPercentage: 5
    });
    setShowAddForm(false);
  };

  const handleEdit = (rule) => {
    setEditingRule(rule);
    setFormData({
      minTickets: rule.minTickets,
      maxTickets: rule.maxTickets,
      discountPercentage: rule.discountPercentage
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this pricing rule?')) {
      setLocalPricingRules(prev => prev.filter(rule => rule.id !== id));
    }
  };

  const toggleActive = (id) => {
    setLocalPricingRules(prev => prev.map(rule => 
      rule.id === id 
        ? { ...rule, isActive: !rule.isActive }
        : rule
    ));
  };

  const calculatePrice = (tickets) => {
    const activeRule = localPricingRules
      .filter(rule => rule.isActive)
      .find(rule => tickets >= rule.minTickets && tickets <= rule.maxTickets);
    
    if (activeRule) {
      const discountedPrice = localBasePrice * (1 - activeRule.discountPercentage / 100);
      return discountedPrice;
    }
    
    return localBasePrice;
  };

  const exampleTickets = [1, 10, 50, 100, 500, 1000];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing Control</h1>
          <p className="text-gray-600 mt-1">Manage ticket prices and discount rules</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Rule</span>
        </button>
      </div>

      {/* Base Price Setting */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Base Ticket Price</h2>
          <DollarSign className="w-6 h-6 text-green-500" />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price per ticket (XXX tokens)
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={localBasePrice}
              onChange={(e) => setLocalBasePrice(parseFloat(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
            />
          </div>
          
          <button
            onClick={() => alert('Base price updated successfully!')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Rules</p>
              <p className="text-2xl font-bold text-green-600">{localPricingRules?.filter(r => r.isActive).length || 0}</p>
            </div>
            <Percent className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Max Discount</p>
              <p className="text-2xl font-bold text-blue-600">
                {localPricingRules?.filter(r => r.isActive).length > 0 
                  ? Math.max(...localPricingRules.filter(r => r.isActive).map(r => r.discountPercentage))
                  : 0}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Base Price</p>
              <p className="text-2xl font-bold text-purple-600">{localBasePrice} XXX</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lowest Price</p>
              <p className="text-2xl font-bold text-orange-600">
                {localPricingRules?.filter(r => r.isActive).length > 0
                  ? (localBasePrice * (1 - Math.max(...localPricingRules.filter(r => r.isActive).map(r => r.discountPercentage)) / 100)).toFixed(1)
                  : localBasePrice} XXX
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Pricing Rules */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Discount Rules</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price per Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {localPricingRules.map((rule) => {
                const discountedPrice = localBasePrice * (1 - rule.discountPercentage / 100);
                return (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rule.minTickets} - {rule.maxTickets} tickets
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white">
                        {rule.discountPercentage}% OFF
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-semibold">{discountedPrice.toFixed(1)} XXX</span>
                      <span className="text-gray-500 ml-2 line-through">{localBasePrice} XXX</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(rule.id)}
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          rule.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(rule)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(rule.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Calculator */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Price Calculator</h2>
        <p className="text-gray-600 mb-6">See how pricing changes based on ticket quantity</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {exampleTickets.map(tickets => {
            const price = calculatePrice(tickets);
            const totalCost = price * tickets;
            const savings = (localBasePrice - price) * tickets;
            
            return (
              <div key={tickets} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{tickets}</div>
                  <div className="text-xs text-gray-600 mb-2">tickets</div>
                  <div className="text-sm font-semibold text-blue-600">{price.toFixed(1)} XXX</div>
                  <div className="text-xs text-gray-500">per ticket</div>
                  <div className="mt-2 pt-2 border-t border-blue-200">
                    <div className="text-sm font-bold text-gray-900">{totalCost.toFixed(1)} XXX</div>
                    <div className="text-xs text-gray-600">total</div>
                    {savings > 0 && (
                      <div className="text-xs text-green-600 font-medium">
                        Save {savings.toFixed(1)} XXX
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingRule ? 'Edit Pricing Rule' : 'Add New Pricing Rule'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Tickets</label>
                <input
                  type="number"
                  min="1"
                  value={formData.minTickets}
                  onChange={(e) => setFormData(prev => ({ ...prev, minTickets: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Tickets</label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxTickets}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxTickets: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discountPercentage}
                  onChange={(e) => setFormData(prev => ({ ...prev, discountPercentage: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  {editingRule ? 'Update' : 'Add'} Rule
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingRule(null);
                    setFormData({
                      minTickets: 1,
                      maxTickets: 10,
                      discountPercentage: 5
                    });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingControl;