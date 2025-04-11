// filepath: /pronto-lang/pronto-lang/src/compiler/tokenizer.ts
class Token {
    constructor(public type: string, public value: string) {}
}

class Tokenizer {
    private current: string;
    private position: number;

    constructor(private input: string) {
        this.current = input;
        this.position = 0;
    }

    private isWhitespace(char: string): boolean {
        return /\s/.test(char);
    }

    private isDigit(char: string): boolean {
        return /\d/.test(char);
    }

    private isAlpha(char: string): boolean {
        return /[a-zA-Z_]/.test(char);
    }

    private readWhile(predicate: (char: string) => boolean): string {
        let result = '';
        while (this.position < this.current.length && predicate(this.current[this.position])) {
            result += this.current[this.position++];
        }
        return result;
    }

    private readNextToken(): Token | null {
        while (this.position < this.current.length) {
            const char = this.current[this.position];

            if (this.isWhitespace(char)) {
                this.position++;
                continue;
            }

            if (this.isDigit(char)) {
                return new Token('NUMBER', this.readWhile(this.isDigit));
            }

            if (this.isAlpha(char)) {
                return new Token('IDENTIFIER', this.readWhile(this.isAlpha));
            }

            switch (char) {
                case '+':
                    this.position++;
                    return new Token('PLUS', '+');
                case '-':
                    this.position++;
                    return new Token('MINUS', '-');
                case '*':
                    this.position++;
                    return new Token('STAR', '*');
                case '/':
                    this.position++;
                    return new Token('SLASH', '/');
                case '=':
                    this.position++;
                    return new Token('EQUAL', '=');
                case ';':
                    this.position++;
                    return new Token('SEMICOLON', ';');
                default:
                    throw new Error(`Unexpected character: ${char}`);
            }
        }

        return null; // End of input
    }

    public tokenize(): Token[] {
        const tokens: Token[] = [];
        let token: Token | null;

        while ((token = this.readNextToken()) !== null) {
            tokens.push(token);
        }

        return tokens;
    }
}

// Export the Tokenizer class for use in other modules
export { Tokenizer, Token };