export interface Token {
    type: string;
    value: string;
}

/**
 * Tokenizes the input Pronto code into a list of tokens.
 * @param input - The Pronto code as a string.
 * @returns An array of tokens.
 */
export const tokenize = (input: string): Token[] => {
    const tokens: Token[] = [];
    let current = 0;

    const keywords = [
        'let', 'const', 'fn', 'if', 'else', 'while', 'for', 'print', 'return', 'nil',
        'true', 'false', 'and', 'or', 'not'
    ];

    const singleCharTokens: { [key: string]: string } = {
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
        '%': 'MODULO',
        ',': 'COMMA',
        '>': 'GREATER',
        '<': 'LESS',
        '!': 'NOT',
    };

    const doubleCharTokens: { [key: string]: string } = {
        '==': 'EQUAL',
        '!=': 'NOT_EQUAL',
        '>=': 'GREATER_EQUAL',
        '<=': 'LESS_EQUAL',
        '&&': 'AND',
        '||': 'OR',
    };

    while (current < input.length) {
        let char = input[current];

        // Skip whitespace
        if (/\s/.test(char)) {
            current++;
            continue;
        }

        // Skip single-line comments (//)
        if (char === '/' && input[current + 1] === '/') {
            while (char !== '\n' && current < input.length) {
                char = input[++current];
            }
            continue;
        }

        // Skip multi-line comments (/* */)
        if (char === '/' && input[current + 1] === '*') {
            current += 2; // Skip the opening /*
            while (!(char === '*' && input[current + 1] === '/') && current < input.length) {
                char = input[++current];
            }
            current += 2; // Skip the closing */
            continue;
        }

        // Handle double-character operators
        const doubleChar = input.slice(current, current + 2);
        if (doubleCharTokens[doubleChar]) {
            tokens.push({ type: doubleCharTokens[doubleChar], value: doubleChar });
            current += 2;
            continue;
        }

        // Handle single-character operators and punctuation
        if (singleCharTokens[char]) {
            tokens.push({ type: singleCharTokens[char], value: char });
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
            if (char === '.') {
                value += char;
                char = input[++current];
                while (/\d/.test(char)) {
                    value += char;
                    char = input[++current];
                }
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

        throw new Error(`Unexpected character: ${char}`);
    }

    return tokens;
};