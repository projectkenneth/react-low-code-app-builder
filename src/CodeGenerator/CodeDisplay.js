import { useState } from "react";
import { isNode, isEdge } from "react-flow-renderer";

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function check(traverseElement, needleId) {
    if (traverseElement.id === needleId) {
        return true;
    } else if (traverseElement.connections.length > 0) {
        return check(traverseElement.connections[0], needleId);
    }

    return false;
}

function stopAt(traverseElement, needleId, parentElement) {
    if (traverseElement.id === needleId) {
        parentElement.connections = [];
    } else if (traverseElement.connections.length > 0) {
        return stopAt(traverseElement.connections[0], needleId, traverseElement);
    }

    return parentElement;
}

function populateChildren(traverseElement) {
    const conns = traverseElement.connections;

    if (traverseElement.type === "if" && conns.length === 2) {
        const firstConn = conns[0];
        const secondConn = conns[1];

        let curConn = firstConn;
        do {
            if (check(secondConn, curConn.id, traverseElement)) {
                traverseElement.connections = [curConn];
                traverseElement.children = [stopAt(firstConn, curConn.id, { type: "empty" }), stopAt(secondConn, curConn.id, { type: "empty" })];
                // traverseElement.children = [firstConn, secondConn];
            }

            curConn = curConn.connections[0];
        } while (curConn && curConn.connections.length > 0);
    }

    return traverseElement;
}

function traverse(elements, item) {
    if (item) {
        const temp = {
            id: item.id,
            type: item.type,
            data: item.data,
            connections: elements
                .filter((el) => (isEdge(el) && el.source === item.id))
                .map((edge) => {
                    const edgeTarget = elements.filter((el) => (isNode(el) && el.id === edge.target));

                    if (edgeTarget.length > 0) {
                        const subStruct = traverse(elements, edgeTarget[0]);
                        subStruct.edge = edge;
                        return subStruct;
                    }

                    return null;
                })
        };

        return populateChildren(temp);
    } else {
        const matches = elements.filter((el) => (isNode(el) && el.type === "start"));

        if (matches.length > 0) {
            return traverse(elements, matches[0]);
        }
    }

    return null;
}

function generateScript(traverseItem, codeData, tabs = "") {
    let output = "";

    let data = codeData[traverseItem.id].data;

    if (traverseItem.type === "assign") {
        output = tabs + "let " + data.variable + " = " + data.value + ";\r\n";
    } else if (traverseItem.type === "if" && traverseItem.children && traverseItem.children.length === 2) {
        output = tabs + "if (" + data.left + " " + data.condition + " " + data.right + ") {\r\n";

        output += generateScript(traverseItem.children[0], codeData, tabs + "   ");

        if (traverseItem.children.length > 1 && traverseItem.children[1].type !== "empty") {
            output += tabs + "} else {\r\n"
            output += generateScript(traverseItem.children[1], codeData, tabs + "   ");
        }

        output += tabs + "}\r\n\r\n";
    } else if (traverseItem.type === "log") {
        output = tabs + "console.log(" + data.message + ");\r\n";
    }

    traverseItem.connections.forEach((curTraverseItem) => {
        output += generateScript(curTraverseItem, codeData, tabs);
    });

    return output;
}

const CodeDisplay = ({ nodes, codeData }) => {
    const [output, setOutput] = useState("");

    const onDisplayCode = () => {
        const rootTraverseItem = traverse(nodes);

        let tempOutput = generateScript(rootTraverseItem, codeData, "   ");

        tempOutput = "function generatedFunction() {\r\n" + tempOutput;
        tempOutput += "}";

        setOutput(tempOutput);
    }

    const RenderFormattedCode = () => {
        if (output.length > 0) {
            return <div className="row">
                <div className="col py-3">
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {output}
                    </SyntaxHighlighter>
                </div>
            </div>
        }

        return null;
    }

    return (
        <>
            <div className="row">
                <div className="col pt-3"><button className="btn btn-primary" onClick={onDisplayCode}>Generate</button></div>
            </div>
            {RenderFormattedCode()}
        </>
    );
}

export default CodeDisplay;