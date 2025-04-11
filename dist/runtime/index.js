"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.Runtime = void 0;
class Runtime {
    constructor() {
        this.context = {};
    }
    execute(code) {
        try {
            eval(code);
        }
        catch (error) {
            this.handleError(error); // Cast error to Error type
        }
    }
    handleError(error) {
        console.error(`Runtime Error: ${error.message}`);
    }
    setContext(key, value) {
        this.context[key] = value;
    }
    getContext(key) {
        return this.context[key];
    }
}
exports.Runtime = Runtime;
const execute = (code) => {
    const runtime = new Runtime();
    runtime.execute(code);
};
exports.execute = execute;
