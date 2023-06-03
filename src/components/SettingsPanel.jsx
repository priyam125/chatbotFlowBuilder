import React, { useState } from "react";

const SettingsPanel = ({ node, onChange }) => {
  const [text, setText] = useState(node.data.label);

  const onTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    onChange(text);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center mb-2">Message</div>
      <div className="flex flex-col border-y border-gray-300 py-2">
        <span className="text-gray-500 mb-1">Text</span>
        <textarea
          className="border border-gray-300 outline-none rounded-sm p-2"
          rows={3}
          type="text"
          value={text}
          onChange={onTextChange}
        />
        <button
          className="border border-gray-400 rounded-md p-2 w-24 mt-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
