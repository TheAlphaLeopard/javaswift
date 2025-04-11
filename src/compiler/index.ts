// filepath: /pronto-lang/pronto-lang/src/compiler/index.ts
import { tokenize } from './tokenizer';
import { parse } from './parser';
import { transpile } from './transpiler';

export function compile(source: string): string {
    const tokens = tokenize(source);
    const ast = parse(tokens);
    const jsCode = transpile(ast);
    return jsCode;
}