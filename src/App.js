import React from "react";

function App() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        className="w-12 h-12 text-yellow-400"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* First bar */}
        <path
          d="M-30 8L12 40"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Second bar */}
        <path
          d="M20 8L20 40"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Third bar (slightly moved up) */}
        <path
          d="M28 6L28 38" /* Adjusted starting and ending points to move up */
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Fourth bar (slightly moved up) */}
        <path
          d="M36 6L36 38" /* Adjusted starting and ending points to move up */
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-white text-lg">Best Deal Online on Computers</span>
      <h1 className="text-black">pakistan</h1>
    </div>
  );
}

export default App;
