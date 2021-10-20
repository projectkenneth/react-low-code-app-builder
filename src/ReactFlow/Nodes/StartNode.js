import { Handle } from "react-flow-renderer";

const StartNode = ({ data, isConnectable }) => {
    return (
        <div className="node node-start">
            <div>
                <strong>START</strong>
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

export default StartNode;