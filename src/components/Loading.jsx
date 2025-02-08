import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-y-4 border-violet-700 border-opacity-75"></div>
    </div>
  );
};

export default Loading;
