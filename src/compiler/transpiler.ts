// filepath: /pronto-lang/pronto-lang/src/compiler/transpiler.ts
import { ASTNode } from './parser';

export const transpile = (ast: ASTNode[]): string => {
    return ast.map(node => transpileNode(node)).join('\n');
};

const transpileNode = (node: ASTNode): string => {
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