// filepath: /pronto-lang/pronto-lang/src/cli/index.ts
import { readFileSync } from 'fs';
import { compile } from '../compiler';
import { execute } from '../runtime';

const args = process.argv.slice(2);

function showHelp() {
    console.log('Pronto CLI - A command-line interface for the Pronto programming language');
    console.log('Usage: pronto <command> [options]');
    console.log('Commands:');
    console.log('  run <file>       Run a Pronto script');
    console.log('  compile <file>   Compile a Pronto script to JavaScript');
    console.log('  help             Show this help message');
}

function runScript(file: string) {
    try {
        const code = readFileSync(file, 'utf-8');
        const compiledCode = compile(code);
        execute(compiledCode);
    } catch (error) {
        console.error(`Error running script: ${error.message}`);
    }
}

function compileScript(file: string) {
    try {
        const code = readFileSync(file, 'utf-8');
        const compiledCode = compile(code);
        console.log(compiledCode);
    } catch (error) {
        console.error(`Error compiling script: ${error.message}`);
    }
}

if (args.length === 0) {
    showHelp();
} else {
    const command = args[0];
    const file = args[1];

    switch (command) {
        case 'run':
            if (file) {
                runScript(file);
            } else {
                console.error('Please specify a file to run.');
            }
            break;
        case 'compile':
            if (file) {
                compileScript(file);
            } else {
                console.error('Please specify a file to compile.');
            }
            break;
        case 'help':
            showHelp();
            break;
        default:
            console.error('Unknown command. Use "help" for a list of commands.');
            break;
    }
}