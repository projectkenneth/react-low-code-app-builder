import { Handle } from "react-flow-renderer";

const StartCustomNode = ({ data, isConnectable }) => {
    return (
        <div className="node node-end">
            <div>
                <strong>END</strong>
            </div>
            <Handle
                id="in"
                type="target"
                position="top"
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default StartCustomNode;