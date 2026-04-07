import React from 'react';
import { Shield, Zap, Code, Terminal } from 'lucide-react';

const HealthCard = ({ title, score, type, active, onClick }) => {
  const displayScore = score > 10 ? (score / 10).toFixed(1) : score;

  const iconMap = {
    security: <Shield className="w-5 h-5 text-red-400" />,
    pipeline: <Zap className="w-5 h-5 text-yellow-400" />,
    code: <Code className="w-5 h-5 text-blue-400" />,
    devops: <Terminal className="w-5 h-5 text-purple-400" />
  };
  
  const isCritical = displayScore <= 3;
  const isHealthy = displayScore >= 8;
  
  const colorClass = isCritical ? 'from-rose-500/20 to-rose-600/5 border-rose-500/50' : 
                     isHealthy ? 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/50' : 
                     'from-amber-500/20 to-amber-600/5 border-amber-500/50';

  const textColor = isCritical ? 'text-rose-400' : isHealthy ? 'text-emerald-400' : 'text-amber-400';
  const barColor = isCritical ? 'bg-rose-500' : isHealthy ? 'bg-emerald-500' : 'bg-amber-500';

  return (
    <button 
      onClick={onClick}
      className={`relative flex-1 min-w-[220px]  p-6 rounded-3xl border transition-all duration-500 group overflow-hidden ${
        active ? `bg-gradient-to-br ${colorClass} ring-2 ring-white/10 scale-105 shadow-2xl` : 
        'bg-zinc-900/40 border-zinc-800 hover:border-zinc-600'
      }`}
    >
      <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl rounded-full transition-opacity duration-500 ${
        active ? 'opacity-40' : 'opacity-0'
      } ${isCritical ? 'bg-rose-500' : isHealthy ? 'bg-emerald-500' : 'bg-amber-500'}`} />

      <div className="relative z-10">
        {/* Fixed height wrapper keeps the icon in place so it doesn't push the title down */}
        <div className="h-10 flex items-center mb-4">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
            {iconMap[type]}
          </div>
        </div>

        <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">{title}</div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black tabular-nums">{displayScore}</span>
          <span className="text-lg text-zinc-600 font-bold">/10</span>
        </div>
        
        <div className={`text-[10px] font-bold uppercase mt-1 ${textColor}`}>
          {isCritical ? 'Critical Action Required' : isHealthy ? 'System Optimized' : 'Needs Improvement'}
        </div>

        <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-4 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${barColor}`}
            style={{ width: `${Math.min(displayScore * 10, 100)}%` }}
          />
        </div>
      </div>
    </button>
  );
};

export default HealthCard;