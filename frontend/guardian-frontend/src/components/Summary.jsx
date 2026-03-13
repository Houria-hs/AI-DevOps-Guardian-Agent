import React from 'react'

export default function Summary({ text }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
      <h2 className="text-2xl font-semibold mb-3">
        AI Summary
      </h2>
      <p className="leading-relaxed opacity-90">
        {text}
      </p>
    </div>
  );
}
