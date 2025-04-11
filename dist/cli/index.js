"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// filepath: /pronto-lang/pronto-lang/src/cli/index.ts
const tokenizer_1 = require("../compiler/tokenizer");
const parser_1 = require("../compiler/parser");
const transpiler_1 = require("../compiler/transpiler");
const runtime_1 = require("../runtime");
const fs = require('fs');
const runScript = (filePath) => {
    try {
        const code = fs.readFileSync(filePath, 'utf-8');
        const tokens = (0, tokenizer_1.tokenize)(code);
        const ast = (0, parser_1.parse)(tokens);
        const jsCode = (0, transpiler_1.transpile)(ast);
        const runtime = new runtime_1.Runtime();
        runtime.execute(jsCode);
    }
    catch (error) {
        const err = error; // Cast error to Error type
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
