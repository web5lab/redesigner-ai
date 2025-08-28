import { 
  FileText, 
  Globe, 
  Type, 
  MessageSquare, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

export function TrainingStats({ trainingData }) {
  const getStatusCounts = () => {
    const allItems = Object.values(trainingData).flat()
    return {
      total: allItems.length,
      completed: allItems.filter(item => item.status === 'completed').length,
      processing: allItems.filter(item => item.status === 'processing').length,
      failed: allItems.filter(item => item.status === 'failed').length
    }
  }

  const stats = getStatusCounts()
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  const statItems = [
    {
      label: 'PDF Documents',
      value: trainingData.pdf?.length || 0,
      icon: FileText,
      color: 'text-red-500 bg-red-100'
    },
    {
      label: 'Websites',
      value: trainingData.web?.length || 0,
      icon: Globe,
      color: 'text-blue-500 bg-blue-100'
    },
    {
      label: 'Text Sources',
      value: trainingData.text?.length || 0,
      icon: Type,
      color: 'text-green-500 bg-green-100'
    },
    {
      label: 'Q&A Pairs',
      value: trainingData.qa?.length || 0,
      icon: MessageSquare,
      color: 'text-purple-500 bg-purple-100'
    }
  ]

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Training Overview</h3>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            stats.processing > 0 ? 'bg-blue-500 animate-pulse' : 'bg-green-500'
          }`}></div>
          <span className="text-sm font-medium text-gray-600">
            {stats.processing > 0 ? 'Processing' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Completion Progress</span>
          <span>{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${stat.color}`}>
                <stat.icon className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium text-gray-600">{stat.label}</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Status Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">{stats.completed} completed</span>
            </div>
            {stats.processing > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">{stats.processing} processing</span>
              </div>
            )}
            {stats.failed > 0 && (
              <div className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-gray-600">{stats.failed} failed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}