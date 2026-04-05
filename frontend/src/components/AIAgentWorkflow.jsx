import React, { useState } from 'react';
import { Play, Activity, CheckCircle, Database, FileCode } from 'lucide-react';
import './AIAgentWorkflow.css';

const AGENTS = [
  { id: 1, name: 'Lead Ingestion Agent', icon: Database, status: 'idle' },
  { id: 2, name: 'Template Processing', icon: FileCode, status: 'idle' },
  { id: 3, name: 'Campaign Orchestrator', icon: Activity, status: 'idle' },
];

const AIAgentWorkflow = () => {
  const [agents, setAgents] = useState(AGENTS);
  const [isRunning, setIsRunning] = useState(false);

  const startWorkflow = () => {
    setIsRunning(true);
    let step = 0;
    const interval = setInterval(() => {
      if (step < agents.length) {
        setAgents(prev => prev.map((a, i) => ({
          ...a,
          status: i === step ? 'running' : (i < step ? 'completed' : 'idle')
        })));
        step++;
      } else {
        setAgents(prev => prev.map(a => ({ ...a, status: 'completed' })));
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 1500);
  };

  return (
    <div className="agent-workflow-card">
      <div className="card-header flex-header">
        <div>
          <h2 className="text-title-large">AI Agent Execution Pipeline</h2>
          <p className="text-body-medium">Monitor autonomous processes running your automated outreach.</p>
        </div>
        <button className="primary-btn" onClick={startWorkflow} disabled={isRunning}>
          {isRunning ? <span className="spinner" style={{width: 16, height: 16, margin: '0 auto'}}></span> : <><Play size={16} style={{marginRight: '8px'}}/> Run Pipeline</>}
        </button>
      </div>

      <div className="agent-timeline">
         {agents.map((agent, idx) => {
           const Icon = agent.icon;
           return (
             <div key={agent.id} className={`agent-node ${agent.status}`}>
               <div className="agent-icon-wrapper">
                  <Icon size={24} />
               </div>
               <div className="agent-info">
                  <h4 className="text-label-large">{agent.name}</h4>
                  <span className="text-label-small status-text">
                     {agent.status === 'idle' && 'Waiting'}
                     {agent.status === 'running' && 'Processing...'}
                     {agent.status === 'completed' && 'Engine Completed'}
                  </span>
               </div>
               {agent.status === 'completed' && <CheckCircle className="completion-icon" size={20} />}
             </div>
           );
         })}
      </div>
    </div>
  );
};

export default AIAgentWorkflow;
