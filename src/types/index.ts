export interface Tool {
  id: string;
  name: string;
  description: string;
  type: 'api' | 'function' | 'external';
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  tools: Tool[];
  goals: string[];
  status: 'idle' | 'working' | 'error';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done' | 'error';
  priority: 'low' | 'medium' | 'high';
  assignedAgentId?: string;
  result?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Process {
  id: string;
  name: string;
  description: string;
  taskIds: string[];
}

export interface Crew {
  id: string;
  name: string;
  agents: Agent[];
  tasks: Task[];
  process: Process;
}