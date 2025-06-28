import React from 'react';
import { X } from 'lucide-react';

const UserProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-md w-full border border-slate-700 shadow-2xl animate-fadeInScaleUp">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">User Profile</h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex flex-col items-center mb-6">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 mb-4"
            />
            <h4 className="text-xl font-bold text-white">{user.name}</h4>
            <p className="text-indigo-400">{user.role}</p>
            <p className="text-sm text-slate-400 mt-1">Member since {user.joined}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-700/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">12</div>
              <div className="text-xs text-slate-400">Designs</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">48</div>
              <div className="text-xs text-slate-400">Likes</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">5</div>
              <div className="text-xs text-slate-400">Months</div>
            </div>
          </div>
          
          <div className="flex justify-center gap-3">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
              View Designs
            </button>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;