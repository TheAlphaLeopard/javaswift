export function minify(code: string): string {
    return code.replace(/\s+/g, ' ').trim();
}

export function transformSyntax(javaswiftCode: string): string {
    // Basic transformation logic (placeholder)
    return javaswiftCode
        .replace(/let/g, 'const')
        .replace(/func/g, 'function')
        .replace(/print/g, 'console.log');
}