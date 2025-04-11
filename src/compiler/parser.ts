// filepath: /pronto-lang/pronto-lang/src/compiler/parser.ts
class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    parse() {
        const statements = [];
        while (!this.isAtEnd()) {
            statements.push(this.statement());
        }
        return statements;
    }

    statement() {
        if (this.match('PRINT')) {
            return this.printStatement();
        }
        // Add more statement types as needed
        return this.expressionStatement();
    }

    printStatement() {
        const value = this.expression();
        this.consume(';', "Expect ';' after value.");
        return { type: 'PrintStatement', value };
    }

    expressionStatement() {
        const expr = this.expression();
        this.consume(';', "Expect ';' after expression.");
        return { type: 'ExpressionStatement', expression: expr };
    }

    expression() {
        // Implement expression parsing logic here
        return this.primary();
    }

    primary() {
        if (this.match('NUMBER')) {
            return { type: 'Literal', value: this.previous().value };
        }
        if (this.match('STRING')) {
            return { type: 'Literal', value: this.previous().value };
        }
        // Handle other primary expressions
        throw new Error("Unexpected token.");
    }

    match(...types) {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }

    check(type) {
        if (this.isAtEnd()) return false;
        return this.peek().type === type;
    }

    advance() {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    isAtEnd() {
        return this.peek().type === 'EOF';
    }

    peek() {
        return this.tokens[this.current];
    }

    previous() {
        return this.tokens[this.current - 1];
    }

    consume(type, message) {
        if (this.check(type)) return this.advance();
        throw new Error(message);
    }
}

export default Parser;