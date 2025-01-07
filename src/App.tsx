import React, { useState } from 'react';
import { CrewProvider } from './context/CrewContext';
import { useCrew } from './context/CrewContext';
import { AgentCard } from './components/AgentCard';
import { TaskCard } from './components/TaskCard';
import { AddAgentForm } from './components/AddAgentForm';
import { AddTaskForm } from './components/AddTaskForm';
import { Users, ListTodo, Plus } from 'lucide-react';

type Tab = 'agents' | 'tasks';

function Dashboard() {
  const { crew, addAgent, removeAgent, addTask, updateTaskStatus } = useCrew();
  const [activeTab, setActiveTab] = useState<Tab>('agents');
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const handleRunTask = (taskId: string) => {
    updateTaskStatus(taskId, 'in-progress');
    setTimeout(() => {
      updateTaskStatus(taskId, 'done');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">AI Orchestration Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 rounded-xl bg-gray-200 p-1 mb-8">
          <button
            onClick={() => setActiveTab('agents')}
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
              activeTab === 'agents'
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-700 hover:bg-white/[0.12]'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users size={20} />
              AI Agents
            </div>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
              activeTab === 'tasks'
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-700 hover:bg-white/[0.12]'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ListTodo size={20} />
              Tasks
            </div>
          </button>
        </div>

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">AI Agents</h2>
              </div>
              <button
                onClick={() => setShowAddAgent(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Plus size={20} />
                Add Agent
              </button>
            </div>

            {showAddAgent && (
              <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <AddAgentForm
                  onSubmit={(data) => {
                    addAgent(data);
                    setShowAddAgent(false);
                  }}
                  onCancel={() => setShowAddAgent(false)}
                />
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {crew.agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onRemove={removeAgent}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <ListTodo className="text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
              </div>
              <button
                onClick={() => setShowAddTask(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Plus size={20} />
                Add Task
              </button>
            </div>

            {showAddTask && (
              <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <AddTaskForm
                  agents={crew.agents}
                  onSubmit={(data) => {
                    addTask(data);
                    setShowAddTask(false);
                  }}
                  onCancel={() => setShowAddTask(false)}
                />
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {crew.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  agent={crew.agents.find(a => a.id === task.assignedAgentId)}
                  onRunTask={handleRunTask}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <CrewProvider>
      <Dashboard />
    </CrewProvider>
  );
}

export default App;