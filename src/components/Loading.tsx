import React from "react";
// comment
const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300 dark:border-white" />
    </div>
  );
};

export default Loading;
