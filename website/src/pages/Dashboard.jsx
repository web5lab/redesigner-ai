import { Activity, Users, FileText, Brain, TrendingUp, MessageSquare, Zap, Clock, Target, Award } from 'lucide-react';
import { GetBots } from '../store/global.Action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const stats = [
  {
    label: 'Active Sessions',
    value: '24',
    icon: Activity,
    gradient: 'from-blue-500 to-cyan-500',
    change: '+12%',
    changeType: 'positive'
  },
  {
    label: 'Total Users',
    value: '1,234',
    icon: Users,
    gradient: 'from-green-500 to-emerald-500',
    change: '+8%',
    changeType: 'positive'
  },
  {
    label: 'Documents',
    value: '56',
    icon: FileText,
    gradient: 'from-purple-500 to-pink-500',
    change: '+15%',
    changeType: 'positive'
  },
  {
    label: 'Training Items',
    value: '89',
    icon: Brain,
    gradient: 'from-orange-500 to-red-500',
    change: '-2%',
    changeType: 'negative'
  },
];

const recentActivities = [
  { 
    id: 1, 
    action: 'New training data added', 
    time: '2 minutes ago', 
    type: 'training',
    icon: Brain,
    color: 'text-purple-600 bg-purple-100'
  },
  { 
    id: 2, 
    action: 'Bot conversation completed', 
    time: '5 minutes ago', 
    type: 'conversation',
    icon: MessageSquare,
    color: 'text-blue-600 bg-blue-100'
  },
  { 
    id: 3, 
    action: 'System performance optimized', 
    time: '1 hour ago', 
    type: 'system',
    icon: Zap,
    color: 'text-green-600 bg-green-100'
  },
  { 
    id: 4, 
    action: 'New user registered', 
    time: '2 hours ago', 
    type: 'user',
    icon: Users,
    color: 'text-orange-600 bg-orange-100'
  },
];

const systemStatus = [
  { label: 'API Status', status: 'Operational', color: 'text-green-600 bg-green-100', icon: Target },
  { label: 'Training Pipeline', status: 'Active', color: 'text-blue-600 bg-blue-100', icon: Brain },
  { label: 'Smart Contract', status: 'Connected', color: 'text-purple-600 bg-purple-100', icon: Award },
];

export function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetBots());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Background Pattern - Fixed z-index and positioning */}
      <div className="fixed inset-0 opacity-30 pointer-events-none -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative space-y-8 p-6 max-w-7xl mx-auto z-10">
      
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ label, value, icon: Icon, gradient, change, changeType }) => (
            <div
              key={label}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  changeType === 'positive' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                }`}>
                  {change}
                </span>
              </div>
              
              <div className="relative">
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
                <p className="text-gray-600 text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="group flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200"
                  >
                    <div className={`p-2 rounded-lg ${activity.color} group-hover:scale-110 transition-transform`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <TrendingUp className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">System Status</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {systemStatus.map(({ label, status, color, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${color}`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 text-left bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-200 border border-blue-200">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Start Training</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-200 border border-green-200">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">New Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}