export const Grammar = {
    keywords: ['fn', 'class', 'let', 'const', 'if', 'else', 'for', 'in', 'print'],
    operators: ['+', '-', '*', '/', '==', '!=', '<', '>', '<=', '>='],
    delimiters: ['(', ')', '{', '}', '[', ']', ';', ','],
};

export class GrammarParser {
    parse(code: string): string[] {
        // Split code into tokens (basic tokenizer)
        const tokens = code
            .replace(/[\n\r]/g, ' ') // Replace newlines with spaces
            .split(/\s+/) // Split by whitespace
            .filter((token) => token.length > 0); // Remove empty tokens
        return tokens;
    }

    validateSyntax(code: string): boolean {
        // Basic validation: Ensure all keywords and delimiters are valid
        const tokens = this.parse(code);
        for (const token of tokens) {
            if (
                !Grammar.keywords.includes(token) &&
                !Grammar.operators.includes(token) &&
                !Grammar.delimiters.includes(token) &&
                !/^[a-zA-Z_]\w*$/.test(token) && // Variable/function names
                !/^\d+$/.test(token) // Numbers
            ) {
                console.error(`Invalid token: ${token}`);
                return false;
            }
        }
        return true;
    }
}

export default Grammar;