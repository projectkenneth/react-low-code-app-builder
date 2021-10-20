import { Handle } from "react-flow-renderer";

const ConsoleCustomNode = ({ data, isConnectable }) => {
    return (
        <div className="node node-log">
            <Handle
                id="in"
                type="target"
                position="top"
                isConnectable={isConnectable}
            />
            <div>
                <strong>LOG</strong>
            </div>
            <Handle
                id="out"
                type="source"
                position="bottom"
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default ConsoleCustomNode;