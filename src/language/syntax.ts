import { Grammar } from './grammar';

export class Syntax {
    static isKeyword(word: string): boolean {
        return Grammar.keywords.includes(word);
    }

    static isOperator(op: string): boolean {
        return Grammar.operators.includes(op);
    }

    static isDelimiter(delim: string): boolean {
        return Grammar.delimiters.includes(delim);
    }

    validate(code: string): boolean {
        // Basic validation logic for JavaSwift syntax
        return code.trim() !== '';
    }

    transform(code: string): string {
        // Transform JavaSwift syntax to JavaScript syntax
        let jsCode = code;

        // Replace `fn` with `function`
        jsCode = jsCode.replace(/\bfn\b/g, 'function');

        // Replace `print` with `console.log`
        jsCode = jsCode.replace(/\bprint\(/g, 'console.log(');

        // Replace `for i in 0..5` with a JavaScript for loop
        jsCode = jsCode.replace(/for (\w+) in (\d+)\.\.(\d+)/g, (match, varName, start, end) => {
            return `for (let ${varName} = ${start}; ${varName} < ${end}; ${varName}++)`;
        });

        return jsCode;
    }
}