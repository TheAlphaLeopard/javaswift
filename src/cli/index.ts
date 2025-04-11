// filepath: /pronto-lang/pronto-lang/src/cli/index.ts
import { tokenize } from '../compiler/tokenizer';
import { parse } from '../compiler/parser';
import { transpile } from '../compiler/transpiler';
import { Runtime } from '../runtime';
import { readFileSync } from 'fs';
import { compile } from '../compiler';
import { execute } from '../runtime';

const fs = require('fs');

const runScript = (filePath: string) => {
    try {
        const code = fs.readFileSync(filePath, 'utf-8');
        const tokens = tokenize(code);
        const ast = parse(tokens);
        const jsCode = transpile(ast);

        const runtime = new Runtime();
        runtime.execute(jsCode);
    } catch (error) {
        const err = error as Error; // Cast error to Error type
        console.error(`Error running script: ${err.message}`);
    }
};

// Example usage: node dist/cli/index.js script.pronto
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Please provide a script file to run.');
    process.exit(1);
}

runScript(args[0]);