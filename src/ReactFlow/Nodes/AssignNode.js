import { Handle } from "react-flow-renderer";

const AssignNode = ({ data, isConnectable }) => {
    return (
        <div className="node node-assign">
            <Handle
                id="in"
                type="target"
                position="top"
                isConnectable={isConnectable}
            />
            <div>
                <strong>ASSIGN</strong>
            </div>
            <Handle
                id="source"
                type="out"
                position="bottom"
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default AssignNode;