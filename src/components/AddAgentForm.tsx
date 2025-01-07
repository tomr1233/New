import React, { useState } from 'react';
import { Tool } from '../types';
import { Plus, X } from 'lucide-react';

interface AddAgentFormProps {
  onSubmit: (data: {
    name: string;
    role: string;
    tools: Tool[];
    goals: string[];
  }) => void;
  onCancel: () => void;
}

export const AddAgentForm: React.FC<AddAgentFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [newTool, setNewTool] = useState({ name: '', description: '', type: 'api' as const });
  const [tools, setTools] = useState<Tool[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [goals, setGoals] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, role, tools, goals });
  };

  const addTool = () => {
    if (newTool.name && newTool.description) {
      setTools([...tools, { ...newTool, id: `tool-${Date.now()}` }]);
      setNewTool({ name: '', description: '', type: 'api' });
    }
  };

  const addGoal = () => {
    if (newGoal) {
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tools</label>
        <div className="mt-1 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tool name"
              value={newTool.name}
              onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTool.description}
              onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <select
              value={newTool.type}
              onChange={(e) => setNewTool({ ...newTool, type: e.target.value as Tool['type'] })}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="api">API</option>
              <option value="function">Function</option>
              <option value="external">External</option>
            </select>
            <button
              type="button"
              onClick={addTool}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
              >
                <span className="text-sm">{tool.name}</span>
                <button
                  type="button"
                  onClick={() => setTools(tools.filter((_, i) => i !== index))}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Goals</label>
        <div className="mt-1 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Add a goal"
            />
            <button
              type="button"
              onClick={addGoal}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="space-y-2">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                <span className="text-sm">{goal}</span>
                <button
                  type="button"
                  onClick={() => setGoals(goals.filter((_, i) => i !== index))}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Agent
        </button>
      </div>
    </form>
  );
};