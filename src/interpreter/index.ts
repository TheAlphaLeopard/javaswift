import * as fs from 'fs';
import * as path from 'path';
import { JavaSwiftCompiler } from '../compiler/index';
import { execute } from './runtime';

export class JavaSwiftInterpreter {
    private code: string;

    constructor() {
        this.code = '';
    }

    load(file: string): void {
        if (path.extname(file) !== '.jsw') {
            throw new Error('Only .jsw files are supported.');
        }
        this.code = this.readFile(file);
    }

    run(): void {
        const compiler = new JavaSwiftCompiler();
        const compiledCode = compiler.compile(this.code);
        this.execute(compiledCode);
    }

    private readFile(file: string): string {
        try {
            return fs.readFileSync(file, 'utf-8');
        } catch (err) {
            console.error('Error reading file:', err);
            return '';
        }
    }

    private execute(compiledCode: string): void {
        execute(compiledCode);
    }
}