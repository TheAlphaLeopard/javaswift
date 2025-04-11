export interface ASTNode {
    type: string;
    [key: string]: any;
}

export class Parser {
    tokens: any[];
    current: number;

    constructor(tokens: any[]) {
        this.tokens = tokens;
        this.current = 0;
    }

    parse(): ASTNode[] {
        const statements: ASTNode[] = [];
        while (!this.isAtEnd()) {
            statements.push(this.statement());
        }
        return statements;
    }

    statement(): ASTNode {
        if (this.match('PRINT')) {
            return this.printStatement();
        }
        return this.expressionStatement();
    }

    printStatement(): ASTNode {
        const value = this.expression();
        this.consume('SEMICOLON', "Expect ';' after value.");
        return { type: 'PrintStatement', value };
    }

    expressionStatement(): ASTNode {
        const expr = this.expression();
        this.consume('SEMICOLON', "Expect ';' after expression.");
        return { type: 'ExpressionStatement', expression: expr };
    }

    expression(): ASTNode {
        return this.primary();
    }

    primary(): ASTNode {
        if (this.match('NUMBER')) {
            return { type: 'Literal', value: this.previous().value };
        }
        if (this.match('STRING')) {
            return { type: 'Literal', value: this.previous().value };
        }
        throw new Error("Unexpected token.");
    }

    match(...types: string[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }

    check(type: string): boolean {
        if (this.isAtEnd()) return false;
        return this.peek().type === type;
    }

    advance(): any {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    isAtEnd(): boolean {
        return this.current >= this.tokens.length;
    }

    peek(): any {
        return this.tokens[this.current];
    }

    previous(): any {
        return this.tokens[this.current - 1];
    }

    consume(type: string, message: string): any {
        if (this.check(type)) return this.advance();
        throw new Error(message);
    }
}

export const parse = (tokens: any[]): ASTNode[] => {
    const parser = new Parser(tokens);
    return parser.parse();
};

export default Parser;