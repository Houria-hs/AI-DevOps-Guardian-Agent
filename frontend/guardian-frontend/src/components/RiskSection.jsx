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
        <span className="text-zinc-500">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4">
          {items.map((item, index) => {
            // Determine severity colors
            const severity = item.severity?.toLowerCase();
            let badgeClass = "bg-amber-500/20 text-amber-500 border border-amber-500/50"; // Default (Medium)

            if (severity === "critical" || severity === "high") {
              badgeClass = "bg-rose-500/20 text-rose-500 border border-rose-500/50";
            } else if (severity === "low" || severity === "info") {
              badgeClass = "bg-emerald-500/20 text-emerald-500 border border-emerald-500/50";
            }

            return (
              <div key={index} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-zinc-100">
                    {item.type || item.category || "Issue Detected"}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${badgeClass}`}>
                    {item.severity}
                  </span>
                </div>

                <div className="text-sm text-zinc-400 mt-3 leading-relaxed">
                  {item.description}
                </div>

                {/* Recommendation Block with fixed key mapping */}
                {(item.recommendation || item.suggestion || item.fix || item.advice) && (
                  <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg flex gap-2">
                    <div className="shrink-0 p-1.5 bg-blue-500/20 rounded-lg h-fit">
                      <Lightbulb className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-blue-100 font-medium text-sm">Recommendation</p>
                      <p className="text-blue-300/80 text-xs mt-1 leading-relaxed">
                        {item.recommendation || item.suggestion || item.fix || item.advice}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}