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
        if (this.match('FN')) return this.functionDeclaration();
        if (this.match('IF')) return this.ifStatement();
        if (this.match('WHILE')) return this.whileStatement();
        if (this.match('FOR')) return this.forStatement();
        if (this.match('PRINT')) return this.printStatement();
        if (this.match('RETURN')) return this.returnStatement();
        return this.expressionStatement();
    }

    functionDeclaration(): ASTNode {
        const name = this.consume('IDENTIFIER', 'Expect function name.');
        this.consume('LEFT_PAREN', "Expect '(' after function name.");
        const params: string[] = [];
        if (!this.check('RIGHT_PAREN')) {
            do {
                params.push(this.consume('IDENTIFIER', 'Expect parameter name.').value);
            } while (this.match('COMMA'));
        }
        this.consume('RIGHT_PAREN', "Expect ')' after parameters.");
        this.consume('LEFT_BRACE', "Expect '{' before function body.");
        const body = [];
        while (!this.check('RIGHT_BRACE') && !this.isAtEnd()) {
            body.push(this.statement());
        }
        this.consume('RIGHT_BRACE', "Expect '}' after function body.");
        return { type: 'FunctionDeclaration', name, params, body };
    }

    ifStatement(): ASTNode {
        this.consume('LEFT_PAREN', "Expect '(' after 'if'.");
        const condition = this.expression();
        this.consume('RIGHT_PAREN', "Expect ')' after condition.");
        const thenBranch = this.statement();
        let elseBranch = null;
        if (this.match('ELSE')) {
            elseBranch = this.statement();
        }
        return { type: 'IfStatement', condition, thenBranch, elseBranch };
    }

    whileStatement(): ASTNode {
        this.consume('LEFT_PAREN', "Expect '(' after 'while'.");
        const condition = this.expression();
        this.consume('RIGHT_PAREN', "Expect ')' after condition.");
        const body = this.statement();
        return { type: 'WhileStatement', condition, body };
    }

    forStatement(): ASTNode {
        this.consume('LEFT_PAREN', "Expect '(' after 'for'.");
        const initializer = this.match('LET') ? this.variableDeclaration() : null;
        const condition = this.expression();
        this.consume('SEMICOLON', "Expect ';' after loop condition.");
        const increment = this.expression();
        this.consume('RIGHT_PAREN', "Expect ')' after for clauses.");
        const body = this.statement();
        return { type: 'ForStatement', initializer, condition, increment, body };
    }

    printStatement(): ASTNode {
        const value = this.expression();
        this.consume('SEMICOLON', "Expect ';' after value.");
        return { type: 'PrintStatement', value };
    }

    returnStatement(): ASTNode {
        const value = this.check('SEMICOLON') ? null : this.expression();
        this.consume('SEMICOLON', "Expect ';' after return value.");
        return { type: 'ReturnStatement', value };
    }

    expressionStatement(): ASTNode {
        const expr = this.expression();
        this.consume('SEMICOLON', "Expect ';' after expression.");
        return { type: 'ExpressionStatement', expression: expr };
    }

    expression(): ASTNode {
        return this.equality();
    }

    equality(): ASTNode {
        let expr = this.comparison();
        while (this.match('EQUAL', 'NOT_EQUAL')) {
            const operator = this.previous();
            const right = this.comparison();
            expr = { type: 'BinaryExpression', left: expr, operator, right };
        }
        return expr;
    }

    comparison(): ASTNode {
        let expr = this.term();
        while (this.match('GREATER', 'GREATER_EQUAL', 'LESS', 'LESS_EQUAL')) {
            const operator = this.previous();
            const right = this.term();
            expr = { type: 'BinaryExpression', left: expr, operator, right };
        }
        return expr;
    }

    term(): ASTNode {
        let expr = this.factor();
        while (this.match('PLUS', 'MINUS')) {
            const operator = this.previous();
            const right = this.factor();
            expr = { type: 'BinaryExpression', left: expr, operator, right };
        }
        return expr;
    }

    factor(): ASTNode {
        let expr = this.unary();
        while (this.match('STAR', 'SLASH', 'MODULO')) {
            const operator = this.previous();
            const right = this.unary();
            expr = { type: 'BinaryExpression', left: expr, operator, right };
        }
        return expr;
    }

    unary(): ASTNode {
        if (this.match('NOT', 'MINUS')) {
            const operator = this.previous();
            const right = this.unary();
            return { type: 'UnaryExpression', operator, right };
        }
        return this.primary();
    }

    primary(): ASTNode {
        if (this.match('NUMBER')) return { type: 'Literal', value: this.previous().value };
        if (this.match('STRING')) return { type: 'Literal', value: this.previous().value };
        if (this.match('TRUE')) return { type: 'Literal', value: true };
        if (this.match('FALSE')) return { type: 'Literal', value: false };
        if (this.match('NIL')) return { type: 'Literal', value: null };
        if (this.match('IDENTIFIER')) return { type: 'Identifier', name: this.previous().value };
        if (this.match('LEFT_PAREN')) {
            const expr = this.expression();
            this.consume('RIGHT_PAREN', "Expect ')' after expression.");
            return expr;
        }
        throw new Error(`Unexpected token: ${this.peek().value}`);
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