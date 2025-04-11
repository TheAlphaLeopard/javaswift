export interface CompilerOptions {
    target: string;
    optimize: boolean;
    sourceMap: boolean;
}

export interface InterpreterOptions {
    strictMode: boolean;
    timeout: number;
    debug: boolean;
}