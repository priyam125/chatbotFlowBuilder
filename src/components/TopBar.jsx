import React from "react";

const TopBar = ({ onSave }) => {
  return (
    <div className="bg-gray-200 px-8 py-2 mb-2">
      <button
        onClick={onSave}
        className="bg-white border-blue-600 border text-blue-600 py-1 px-4 rounded-md"
      >
        Save Changes
      </button>
    </div>
  );
};

export default TopBar;
