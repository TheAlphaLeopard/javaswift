export class Runtime {
    context: Record<string, any>;

    constructor() {
        this.context = {};
    }

    execute(code: string) {
        try {
            eval(code);
        } catch (error) {
            this.handleError(error as Error); // Cast error to Error type
        }
    }

    handleError(error: Error) {
        console.error(`Runtime Error: ${error.message}`);
    }

    setContext(key: string, value: any) {
        this.context[key] = value;
    }

    getContext(key: string) {
        return this.context[key];
    }
}

export const execute = (code: string) => {
    const runtime = new Runtime();
    runtime.execute(code);
};