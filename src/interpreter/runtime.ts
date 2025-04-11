export function execute(code: string): any {
    try {
        // Use eval to execute the code
        return eval(code);
    } catch (error) {
        handleErrors(error);
    }
}

export function handleErrors(error: any): void {
    console.error('Runtime Error:', error.message);
}

export class Runtime {
    static print(message: string): void {
        console.log(message);
    }

    static error(message: string): void {
        console.error(message);
    }
}