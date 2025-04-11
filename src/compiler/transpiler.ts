// filepath: /pronto-lang/pronto-lang/src/compiler/transpiler.ts
import { ASTNode } from './parser';
import { generateJavaScript } from './javascriptGenerator';

export function transpile(ast: ASTNode): string {
    return generateJavaScript(ast);
}

function generateJavaScript(node: ASTNode): string {
    switch (node.type) {
        case 'Program':
            return node.body.map(generateJavaScript).join('\n');
        case 'ExpressionStatement':
            return generateJavaScript(node.expression) + ';';
        case 'BinaryExpression':
            return `${generateJavaScript(node.left)} ${node.operator} ${generateJavaScript(node.right)}`;
        case 'Literal':
            return JSON.stringify(node.value);
        case 'Identifier':
            return node.name;
        // Add more cases for different node types as needed
        default:
            throw new Error(`Unknown AST node type: ${node.type}`);
    }
}