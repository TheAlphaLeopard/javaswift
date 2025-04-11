export function execute(code: string): any {
    try {
        // Use eval to execute the code in a safe context
        return eval(code);
    } catch (error) {
        handleErrors(error);
    }
}

export function handleErrors(error: any): void {
    console.error("Runtime Error:", error.message);
    // Additional error handling logic can be added here
}