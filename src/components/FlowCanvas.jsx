import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";
import SettingsPanel from "./SettingsPanel";
import NodesPanel from "./NodePanel";
import TopBar from "./TopBar";

const initialNodes = [
  { id: "1", type: "default", position: { x: 0, y: 0 }, data: { label: "1" } },
  {
    id: "2",
    type: "default",
    position: { x: 0, y: 100 },
    data: { label: "2" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
];

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
    const nodeIds = nodes.map((node) => node.id);
    const sourceIds = edges.map((edge) => edge.source);
    const targetIds = edges.map((edge) => edge.target);

    const allNodesConnected = nodeIds.every(
      (nodeId) => sourceIds.includes(nodeId) || targetIds.includes(nodeId)
    );

    if (allNodesConnected) {
      alert("Congrats! The flow is valid.");
    } else {
      alert("Please connect all nodes. Cannot save the flow.");
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
      <TopBar onSave={onSave} />
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
