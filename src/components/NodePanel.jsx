// import React from "react";

// const NodesPanel = () => {
//   const onNodeDragStart = (event, nodeType) => {
//     event.dataTransfer.setData("application/reactflow", nodeType);
//     event.dataTransfer.effectAllowed = "move";
//   };

//   return (
//     <div>
//       <h2>Nodes Panel</h2>
//       {/* Add more types of nodes here */}
//       <div
//         className="node h-6 w-8 p-2 border-blue-600 border"
//         draggable
//         onDragStart={(event) => onNodeDragStart(event, "textNode")}
//       >
//         Text Node
//       </div>
//     </div>
//   );
// };

// export default NodesPanel;

import React from "react";
import { MdMessage } from "react-icons/md";

const NodesPanel = () => {
  const onNodeDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeTypes = [
    { type: "textNode", label: "Message" },
    // { type: "textNode", label: "Text Node" },
    // Add more node types here
    // { type: "messageNode", label: "Message Node" },
  ];

  return (
    <div>
      {/* Render each node type */}
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="node flex flex-col items-center justify-center h-20 w-32 p-2 border border-blue-600 rounded-md cursor-pointer bg-white shadow hover:shadow-lg"
          draggable
          onDragStart={(event) => onNodeDragStart(event, node.type)}
        >
          <MdMessage size={24} className="mb-1 text-blue-600" />
          <span className="text-blue-600">{node.label}</span>
        </div>
      ))}
    </div>
  );
};

export default NodesPanel;
