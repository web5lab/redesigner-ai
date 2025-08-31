import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Settings, CreditCard, HelpCircle, LogOut,
  Camera, Edit2, Zap
} from 'lucide-react';
import BillingPlans from './BillingPlans';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../store/global.Slice';
import { UserSelector } from '../store/global.Selctor';



const UserProfile= ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
  const [showBilling, setShowBilling] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(UserSelector);
  

  if (!isOpen) return null;

  const handleLogout = () => {
    dispatch(logOutUser())
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl max-w-lg w-full mx-4">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={user.profilePicture || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
              />
              <button className="absolute bottom-0 right-0 bg-indigo-500 p-2 rounded-full text-white hover:bg-indigo-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {isEditing ? (
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    // onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    // onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
                <p className="text-slate-400 mb-2">{user.email}</p>
                <span className="inline-block bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm">
                  {user.currentPlan || 'Free Plan'}
                </span>
                {/* <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 flex items-center gap-2 mx-auto text-slate-400 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </button> */}
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {/* <button className="w-full flex items-center gap-3 px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              Account Settings
            </button> */}
            <button 
              onClick={() => setShowBilling(true)}
              className="w-full flex items-center gap-3 px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              Billing & Plans
            </button>
            {/* <button className="w-full flex items-center gap-3 px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5" />
              Help & Support
            </button> */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <BillingPlans isOpen={showBilling} onClose={() => setShowBilling(false)} />
    </div>
  );
};

export default UserProfile;