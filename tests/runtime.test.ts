import { executeProntoCode } from '../src/runtime/index';
import { expect } from 'chai';

describe('Pronto Runtime Tests', () => {
    it('should execute a simple print statement', () => {
        const code = 'print("Hello, World!");';
        const output = executeProntoCode(code);
        expect(output).to.equal('Hello, World!');
    });

    it('should handle arithmetic operations', () => {
        const code = 'let result = 5 + 3; print(result);';
        const output = executeProntoCode(code);
        expect(output).to.equal('8');
    });

    it('should return an error for division by zero', () => {
        const code = 'let result = 10 / 0; print(result);';
        const output = executeProntoCode(code);
        expect(output).to.equal('Error: Division by zero');
    });

    it('should execute a function correctly', () => {
        const code = `
            fn add(a, b) { return a + b; }
            let result = add(2, 3);
            print(result);
        `;
        const output = executeProntoCode(code);
        expect(output).to.equal('5');
    });

    it('should manipulate the DOM correctly', () => {
        const code = `
            let div = createElement("div");
            setText(div, "Test");
            return div.innerHTML;
        `;
        const output = executeProntoCode(code);
        expect(output).to.equal('Test');
    });
});