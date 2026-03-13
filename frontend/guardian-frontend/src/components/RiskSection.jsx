import React from 'react'
import { useState } from "react";
import { Lightbulb } from 'lucide-react';

export default function RiskSection({ title, items }) {
  const [open, setOpen] = useState(true);

  if (!items || items.length === 0) return null;




  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex justify-between items-center"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4">
          {items.map((item, index) => (
<div key={index} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
  <div className="flex justify-between items-center">
    <div className="font-semibold text-zinc-100">
      {/* Fallback for title/type */}
      {item.type || item.category || "Issue Detected"}
    </div>
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
      item.severity?.toLowerCase() === "critical" || item.severity?.toLowerCase() === "high"
        ? "bg-rose-500/20 text-rose-500 border border-rose-500/50"
        : "bg-amber-500/20 text-amber-500 border border-amber-500/50"
    }`}>
      {item.severity}
    </span>
  </div>

  <div className="text-sm text-zinc-400 mt-3 leading-relaxed">
    {item.description}
  </div>

{(item.recommendation || item.suggestion) && (
  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-3 items-start">
    <div className="p-1.5 bg-blue-500/20 rounded-lg">
      <Lightbulb className="w-4 h-4 text-blue-400" />
    </div>
    <div>
      <p className="text-blue-100 font-medium text-sm">Recommendation</p>
      <p className="text-blue-300/80 text-xs mt-1 leading-relaxed">
        {item.recommendation || item.suggestion}
      </p>
    </div>
  </div>
)}
</div>
          ))}
        </div>
      )}
    </div>
  );
}
