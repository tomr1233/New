import React from 'react';
import { Task, Agent } from '../types';
import { Clock, AlertCircle, CheckCircle, Play, User } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  agent?: Agent;
  onRunTask: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, agent, onRunTask }) => {
  const statusConfig = {
    pending: { icon: Clock, className: 'text-gray-500', label: 'Pending' },
    'in-progress': { icon: Play, className: 'text-blue-500 animate-pulse', label: 'In Progress' },
    done: { icon: CheckCircle, className: 'text-green-500', label: 'Done' },
    error: { icon: AlertCircle, className: 'text-red-500', label: 'Error' },
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };

  const StatusIcon = statusConfig[task.status].icon;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <StatusIcon className={statusConfig[task.status].className} size={20} />
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
        </span>
        {agent && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User size={16} />
            <span>{agent.name}</span>
          </div>
        )}
      </div>

      {task.status === 'pending' && (
        <button
          onClick={() => onRunTask(task.id)}
          className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Run Task
        </button>
      )}

      {task.result && (
        <div className="mt-3 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700">{task.result}</p>
        </div>
      )}
    </div>
  );
};