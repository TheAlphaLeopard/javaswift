"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
// filepath: /pronto-lang/pronto-lang/src/compiler/index.ts
const tokenizer_1 = require("./tokenizer");
const parser_1 = require("./parser");
const transpiler_1 = require("./transpiler"); // Add this import
const compile = (code) => {
    const tokens = (0, tokenizer_1.tokenize)(code);
    const ast = (0, parser_1.parse)(tokens);
    const jsCode = (0, transpiler_1.transpile)(ast); // Use transpile here
    return jsCode;
};
exports.compile = compile;
