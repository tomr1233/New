import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Crew, Agent, Task } from '../types';

type CrewContextType = {
  crew: Crew;
  setCrew: React.Dispatch<React.SetStateAction<Crew>>;
  addAgent: (agent: Omit<Agent, 'id' | 'status'>) => void;
  removeAgent: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
};

const CrewContext = createContext<CrewContextType | undefined>(undefined);

export function CrewProvider({ children }: { children: ReactNode }) {
  const [crew, setCrew] = useState<Crew>({
    id: 'crew-1',
    name: 'AI Orchestration Crew',
    agents: [],
    tasks: [],
    process: { 
      id: 'process-1', 
      name: 'Default Process', 
      description: 'Standard task processing workflow',
      taskIds: [] 
    },
  });

  const addAgent = (agent: Omit<Agent, 'id' | 'status'>) => {
    const newAgent: Agent = {
      ...agent,
      id: `agent-${Date.now()}`,
      status: 'idle',
    };
    setCrew(prev => ({
      ...prev,
      agents: [...prev.agents, newAgent],
    }));
  };

  const removeAgent = (id: string) => {
    setCrew(prev => ({
      ...prev,
      agents: prev.agents.filter(agent => agent.id !== id),
    }));
  };

  const addTask = (task: Omit<Task, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCrew(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
      process: {
        ...prev.process,
        taskIds: [...prev.process.taskIds, newTask.id],
      },
    }));
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setCrew(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId
          ? { ...task, status, updatedAt: new Date() }
          : task
      ),
    }));
  };

  return (
    <CrewContext.Provider value={{ 
      crew, 
      setCrew, 
      addAgent, 
      removeAgent, 
      addTask, 
      updateTaskStatus 
    }}>
      {children}
    </CrewContext.Provider>
  );
}

export function useCrew() {
  const context = useContext(CrewContext);
  if (!context) {
    throw new Error('useCrew must be used within a CrewProvider');
  }
  return context;
}