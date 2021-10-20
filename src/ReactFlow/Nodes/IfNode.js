import { Handle } from "react-flow-renderer";

const IfCustomNode = ({ data, isConnectable }) => {
    return (
        <div className="node node-if">
            <Handle
                id="in"
                type="target"
                position="top"
                isConnectable={isConnectable}
            />
            <div>
                <strong>IF</strong>
            </div>
            <Handle
                id="true"
                type="source"
                position="left"
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="right"
                id="false"
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default IfCustomNode;