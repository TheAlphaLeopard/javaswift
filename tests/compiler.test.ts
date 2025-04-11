import { tokenizer } from '../src/compiler/tokenizer';
import { parser } from '../src/compiler/parser';
import { transpiler } from '../src/compiler/transpiler';

describe('Pronto Compiler', () => {
    test('Tokenizer should correctly tokenize Pronto code', () => {
        const input = `let name = "John";`;
        const expectedTokens = [
            { type: 'LET', value: 'let' },
            { type: 'IDENTIFIER', value: 'name' },
            { type: 'ASSIGN', value: '=' },
            { type: 'STRING', value: '"John"' },
            { type: 'SEMICOLON', value: ';' }
        ];
        const tokens = tokenizer(input);
        expect(tokens).toEqual(expectedTokens);
    });

    test('Parser should create an AST from tokens', () => {
        const tokens = [
            { type: 'LET', value: 'let' },
            { type: 'IDENTIFIER', value: 'name' },
            { type: 'ASSIGN', value: '=' },
            { type: 'STRING', value: '"John"' },
            { type: 'SEMICOLON', value: ';' }
        ];
        const expectedAST = {
            type: 'VariableDeclaration',
            declarations: [
                {
                    id: { type: 'Identifier', name: 'name' },
                    init: { type: 'Literal', value: 'John' }
                }
            ]
        };
        const ast = parser(tokens);
        expect(ast).toEqual(expectedAST);
    });

    test('Transpiler should convert AST to JavaScript code', () => {
        const ast = {
            type: 'VariableDeclaration',
            declarations: [
                {
                    id: { type: 'Identifier', name: 'name' },
                    init: { type: 'Literal', value: 'John' }
                }
            ]
        };
        const expectedJS = `let name = "John";`;
        const jsCode = transpiler(ast);
        expect(jsCode).toEqual(expectedJS);
    });
});