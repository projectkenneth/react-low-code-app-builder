import React, { useState } from "react";

import "./nodes.css";

import Config from "../Config";

import Sidebar from "./Sidebar";
import CodeDisplay from "../CodeGenerator/CodeDisplay";

import DiagramAdapter from "./DiagramAdapter";

const Canvas = () => {
    const [nodes, setNodes] = useState([
        {
            id: "node_0",
            type: "start",
            position: { x: 150, y: 25 },
        },
        {
            id: "node_1",
            type: "end",
            position: { x: 150, y: 225 },
        },
        {
            id: "node_0-node_1", type: "step", source: "node_0", target: "node_1", arrowHeadType: "arrowclosed", style: {
                strokeWidth: "3px"
            }
        }
    ]);

    const [codeData, setCodeData] = useState({
        "node_0": {
            id: "node_0",
            type: "start",
            data: {}
        },
        "node_1": {
            id: "node_1",
            type: "end",
            data: {}
        }
    });

    const [activeCodeData, setActiveCodeData] = useState({ id: null, type: "" });

    const onActivateNode = (activeNodeId) => setActiveCodeData(codeData[activeNodeId]);

    const onDeactivateAll = () => {
        setActiveCodeData({ id: null, type: "" });
    };

    const onUpdateCodeData = (data) => {
        activeCodeData.data = data;
        codeData[data.id] = activeCodeData;

        setActiveCodeData(activeCodeData);
        setCodeData(codeData);
    };

    const onAddNode = (newNodeId, newNodeType) => {
        codeData[newNodeId] = {
            id: newNodeId,
            type: newNodeType,
            data: {}
        };

        setCodeData(codeData);
    };

    const renderPropertyEditor = () => {
        if (activeCodeData.id !== null && Config[activeCodeData.type]) {
            const PropertyEditor = Config[activeCodeData.type].propertyEditorComponent;
            return (<PropertyEditor key={activeCodeData.id} codeData={activeCodeData} updateData={onUpdateCodeData} />);
        } else {
            return (<em>Select an element from the canvas to update.</em>);
        }
    }

    return (
        <div className="container-fluid pt-3">
            <div className="row">
                <div className="col col-1">
                    <h2>Tools</h2>
                    <Sidebar />
                </div>
                <div className="col col-7">
                    <h2>Canvas</h2>
                    <DiagramAdapter nodes={nodes} setNodes={setNodes} onAddNode={onAddNode} onActivateNode={onActivateNode} onDeactivateAll={onDeactivateAll} />
                </div>
                <div className="col col-4">
                    <h2>Property Panel</h2>
                    {renderPropertyEditor()}
                    <br/><br/><br/><br/>
                    <h2>Code Generator</h2>
                    <CodeDisplay nodes={nodes} codeData={codeData} />
                </div>
            </div>
        </div>
    );
}

export default Canvas;