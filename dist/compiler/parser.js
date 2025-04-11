"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.Parser = void 0;
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
        return this.expressionStatement();
    }
    printStatement() {
        const value = this.expression();
        this.consume('SEMICOLON', "Expect ';' after value.");
        return { type: 'PrintStatement', value };
    }
    expressionStatement() {
        const expr = this.expression();
        this.consume('SEMICOLON', "Expect ';' after expression.");
        return { type: 'ExpressionStatement', expression: expr };
    }
    expression() {
        return this.primary();
    }
    primary() {
        if (this.match('NUMBER')) {
            return { type: 'Literal', value: this.previous().value };
        }
        if (this.match('STRING')) {
            return { type: 'Literal', value: this.previous().value };
        }
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
        if (this.isAtEnd())
            return false;
        return this.peek().type === type;
    }
    advance() {
        if (!this.isAtEnd())
            this.current++;
        return this.previous();
    }
    isAtEnd() {
        return this.current >= this.tokens.length;
    }
    peek() {
        return this.tokens[this.current];
    }
    previous() {
        return this.tokens[this.current - 1];
    }
    consume(type, message) {
        if (this.check(type))
            return this.advance();
        throw new Error(message);
    }
}
exports.Parser = Parser;
const parse = (tokens) => {
    const parser = new Parser(tokens);
    return parser.parse();
};
exports.parse = parse;
exports.default = Parser;
