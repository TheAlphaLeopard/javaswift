// filepath: /pronto-lang/pronto-lang/src/compiler/index.ts
import { tokenize } from './tokenizer';
import { parse } from './parser';
import { transpile } from './transpiler'; // Add this import

export const compile = (code: string): string => {
    const tokens = tokenize(code);
    const ast = parse(tokens);
    const jsCode = transpile(ast); // Use transpile here
    return jsCode;
};