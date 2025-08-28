import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { 
  Bot, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Zap,
  Crown,
  Plus,
  ArrowRight,
  Activity,
  Clock,
  Target,
  Brain,
  Sparkles,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react'
import { getBots } from '../store/actions'
import { botsSelector, userSelector } from '../store/selectors'

const stats = [
  {
    label: 'Total Bots',
    value: '12',
    icon: Bot,
    gradient: 'from-blue-500 to-cyan-500',
    change: '+2 this week'
  },
  {
    label: 'Conversations',
    value: '1.2k',
    icon: MessageSquare,
    gradient: 'from-green-500 to-emerald-500',
    change: '+15% this month'
  },
  {
    label: 'Active Users',
    value: '847',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
    change: '+8% this week'
  },
  {
    label: 'Response Time',
    value: '1.2s',
    icon: Zap,
    gradient: 'from-orange-500 to-red-500',
    change: '-25% faster'
  }
]

const recentActivity = [
  {
    id: 1,
    action: 'New bot created',
    time: '2 min ago',
    icon: Bot,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: 2,
    action: 'Training completed',
    time: '5 min ago',
    icon: Brain,
    color: 'text-green-600 bg-green-100 dark:bg-green-900/30'
  },
  {
    id: 3,
    action: 'Chat session started',
    time: '10 min ago',
    icon: MessageSquare,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
  }
]

const chartData = [
  {
    title: 'Conversations',
    value: '2.4k',
    change: '+12%',
    icon: LineChart,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Response Rate',
    value: '94%',
    change: '+5%',
    icon: BarChart3,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'User Satisfaction',
    value: '4.8/5',
    change: '+0.2',
    icon: PieChart,
    color: 'from-purple-500 to-pink-500'
  }
]

export function Dashboard() {
  const dispatch = useDispatch()
  const user = useSelector(userSelector)
  const bots = useSelector(botsSelector)

  useEffect(() => {
    dispatch(getBots())
  }, [dispatch])

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-900">
      <div className="p-6 space-y-6 pb-24">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Welcome back!</h2>
                <p className="text-blue-100">{user?.name || 'User'}</p>
              </div>
            </div>
            
            <p className="text-blue-100 mb-4">
              Your AI assistants are ready to help customers 24/7
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">All systems operational</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">Premium Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Analytics Overview</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {chartData.map((chart, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${chart.color} mb-3`}>
                  <chart.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{chart.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{chart.title}</div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">{chart.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all haptic-medium">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Bot</span>
            </button>
            
            <button className="flex flex-col items-center gap-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all haptic-medium">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Chat</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className={`p-2 rounded-lg ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">System Status</h3>
          
          <div className="space-y-3">
            {[
              { label: 'API Status', status: 'Operational', icon: Target },
              { label: 'Training Pipeline', status: 'Active', icon: Activity },
              { label: 'Chat Service', status: 'Online', icon: MessageSquare }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}