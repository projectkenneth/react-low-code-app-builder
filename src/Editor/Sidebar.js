import React from "react";

import "./sidebar.css"

const Sidebar = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside>
            <div className="node node-start" onDragStart={(event) => onDragStart(event, "start")} draggable>
                Start
            </div>
            <div className="node node-if" onDragStart={(event) => onDragStart(event, "if")} draggable>
                If
            </div>
            <div className="node node-assign" onDragStart={(event) => onDragStart(event, "assign")} draggable>
                Assign
            </div>
            <div className="node node-log" onDragStart={(event) => onDragStart(event, "log")} draggable>
                Log
            </div>
            <div className="node node-end" onDragStart={(event) => onDragStart(event, "end")} draggable>
                End
            </div>
        </aside>
    );
};

export default Sidebar;