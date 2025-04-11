"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpile = void 0;
const transpile = (ast) => {
    return ast.map(node => transpileNode(node)).join('\n');
};
exports.transpile = transpile;
const transpileNode = (node) => {
    switch (node.type) {
        case 'PrintStatement':
            return `console.log(${transpileNode(node.value)});`;
        case 'ExpressionStatement':
            return `${transpileNode(node.expression)};`;
        case 'Literal':
            return JSON.stringify(node.value);
        default:
            throw new Error(`Unknown AST node type: ${node.type}`);
    }
};
