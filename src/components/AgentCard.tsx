import React from 'react';
import { Agent } from '../types';
import { Bot, Wrench, Target, X } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onRemove: (id: string) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onRemove }) => {
  const statusColors = {
    idle: 'bg-gray-200',
    working: 'bg-green-500 animate-pulse',
    error: 'bg-red-500',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      <button
        onClick={() => onRemove(agent.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <X size={16} />
      </button>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Bot className="text-blue-600" size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{agent.name}</h3>
          <p className="text-sm text-gray-600">{agent.role}</p>
        </div>
        <div className={`ml-auto w-3 h-3 rounded-full ${statusColors[agent.status]}`} />
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wrench size={16} className="text-gray-500" />
            <h4 className="text-sm font-medium text-gray-700">Tools</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {agent.tools.map(tool => (
              <span
                key={tool.id}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-gray-500" />
            <h4 className="text-sm font-medium text-gray-700">Goals</h4>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            {agent.goals.map((goal, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="min-w-[8px]">•</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};