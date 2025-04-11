// filepath: /pronto-lang/pronto-lang/src/cli/index.ts
import { tokenize } from '../compiler/tokenizer';
import { parse } from '../compiler/parser';
import { transpile } from '../compiler/transpiler';
import { Runtime } from '../runtime';
import { readFileSync } from 'fs';

/**
 * Reads a .pronto file, compiles it to JavaScript, and executes it.
 * @param filePath - Path to the .pronto file.
 */
const runScript = (filePath: string) => {
    try {
        console.log(`Reading file: ${filePath}`);
        const code = readFileSync(filePath, 'utf-8');
        console.log(`File content:\n${code}`);

        console.log('Tokenizing...');
        const tokens = tokenize(code);
        console.log('Tokens:', tokens);

        console.log('Parsing...');
        const ast = parse(tokens);
        console.log('AST:', ast);

        console.log('Transpiling to JavaScript...');
        const jsCode = transpile(ast);
        console.log('Generated JavaScript:\n', jsCode);

        console.log('Executing JavaScript...');
        const runtime = new Runtime();
        runtime.execute(jsCode);
    } catch (error) {
        const err = error as Error;
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