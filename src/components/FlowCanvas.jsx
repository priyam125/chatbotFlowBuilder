import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodes,
  useEdges,
  addEdge,
  isNode,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";
import SettingsPanel from "./SettingsPanel";
import NodesPanel from "./NodePanel";

const initialNodes = [
  { id: "1", type: "textNode", position: { x: 0, y: 0 }, data: { label: "1" } },
  {
    id: "2",
    type: "textNode",
    position: { x: 0, y: 100 },
    data: { label: "2" },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((oldEdges) => addEdge(params, oldEdges)),
    [setEdges]
  );

  const onNodeDragStop = (event, node) => {
    event.preventDefault();
    const newNode = {
      ...node,
      position: { x: event.clientX, y: event.clientY },
    };
    setNodes((oldNodes) =>
      oldNodes.map((n) => (n.id === node.id ? newNode : n))
    );
  };

  const onNodeSelect = (event, node) => {
    event.preventDefault();
    setSelectedNode(node);
  };

  const onSave = () => {
    if (nodes.length < 2) {
      alert("Error: Only one node present. Add more nodes.");
      return;
    }

    const emptyTargetHandles = nodes.filter(
      (node) =>
        (!selectedNode || node.id !== selectedNode.id) &&
        (!node.target || node.target.length === 0)
    );

    if (emptyTargetHandles.length > 0) {
      alert("Error: Some nodes have empty target handles.");
    } else {
      alert("Flow saved successfully!");
    }
  };

  const onChange = (text) => {
    setNodes((oldNodes) =>
      oldNodes.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, label: text } }
          : n
      )
    );
    setSelectedNode(null);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      const position = { x: event.clientX, y: event.clientY };
      const label = `Node ${nodes.length + 1}`;
      const newNode = {
        id: String(nodes.length + 1),
        type,
        position,
        data: { label },
      };
      setNodes((oldNodes) => [...oldNodes, newNode]);
    },
    [setNodes, nodes.length]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  return (
    <div className="flex flex-col">
      <div className="bg-gray-200 px-8 py-2 mb-2">
        <button
          onClick={onSave}
          className="bg-white border-blue-600 border text-blue-600 py-1 px-4 rounded-md"
        >
          Save Changes
        </button>
      </div>
      <div className="flex w-full">
        <div style={{ width: "80vw", height: "93vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeSelect}
            onNodeDragStop={onNodeDragStop}
          >
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
        <div className="w-[20vw] border-l border-gray-400 p-2">
          {selectedNode ? (
            <SettingsPanel node={selectedNode} onChange={onChange} />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowCanvas;
