import { ASTNode } from './parser';

export const transpile = (ast: ASTNode[]): string => {
    return ast.map(node => transpileNode(node)).join('\n');
};

const transpileNode = (node: ASTNode): string => {
    switch (node.type) {
        case 'FunctionDeclaration':
            const params = node.params.join(', ');
            const body = node.body.map(transpileNode).join('\n');
            return `function ${node.name}(${params}) {\n${body}\n}`;
        case 'IfStatement':
            const elseBranch = node.elseBranch ? ` else {\n${transpileNode(node.elseBranch)}\n}` : '';
            return `if (${transpileNode(node.condition)}) {\n${transpileNode(node.thenBranch)}\n}${elseBranch}`;
        case 'WhileStatement':
            return `while (${transpileNode(node.condition)}) {\n${transpileNode(node.body)}\n}`;
        case 'ForStatement':
            return `for (${transpileNode(node.initializer)}; ${transpileNode(node.condition)}; ${transpileNode(node.increment)}) {\n${transpileNode(node.body)}\n}`;
        case 'PrintStatement':
            return `console.log(${transpileNode(node.value)});`;
        case 'ReturnStatement':
            return `return ${node.value ? transpileNode(node.value) : ''};`;
        case 'ExpressionStatement':
            return `${transpileNode(node.expression)};`;
        case 'BinaryExpression':
            return `${transpileNode(node.left)} ${node.operator.value} ${transpileNode(node.right)}`;
        case 'UnaryExpression':
            return `${node.operator.value}${transpileNode(node.right)}`;
        case 'Literal':
            return JSON.stringify(node.value);
        case 'Identifier':
            return node.name;
        default:
            throw new Error(`Unknown AST node type: ${node.type}`);
    }
};