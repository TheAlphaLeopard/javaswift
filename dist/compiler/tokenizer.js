"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = void 0;
const keywords = ['let', 'const', 'fn', 'if', 'else', 'while', 'for', 'print'];
const tokenize = (input) => {
    const tokens = [];
    let current = 0;
    while (current < input.length) {
        let char = input[current];
        // Skip whitespace
        if (/\s/.test(char)) {
            current++;
            continue;
        }
        // Handle numbers
        if (/\d/.test(char)) {
            let value = '';
            while (/\d/.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: 'NUMBER', value });
            continue;
        }
        // Handle strings
        if (char === '"' || char === "'") {
            let value = '';
            const quoteType = char;
            char = input[++current];
            while (char !== quoteType) {
                value += char;
                char = input[++current];
            }
            current++; // Skip closing quote
            tokens.push({ type: 'STRING', value });
            continue;
        }
        // Handle identifiers and keywords
        if (/[a-zA-Z_]/.test(char)) {
            let value = '';
            while (/[a-zA-Z0-9_]/.test(char)) {
                value += char;
                char = input[++current];
            }
            const type = keywords.includes(value) ? value.toUpperCase() : 'IDENTIFIER';
            tokens.push({ type, value });
            continue;
        }
        // Handle operators and punctuation
        const singleCharTokens = {
            '=': 'ASSIGN',
            ';': 'SEMICOLON',
            '(': 'LEFT_PAREN',
            ')': 'RIGHT_PAREN',
            '{': 'LEFT_BRACE',
            '}': 'RIGHT_BRACE',
            '+': 'PLUS',
            '-': 'MINUS',
            '*': 'STAR',
            '/': 'SLASH',
        };
        if (singleCharTokens[char]) {
            tokens.push({ type: singleCharTokens[char], value: char });
            current++;
            continue;
        }
        throw new Error(`Unexpected character: ${char}`);
    }
    return tokens;
};
exports.tokenize = tokenize;
