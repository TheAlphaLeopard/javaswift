import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('CLI Tests', () => {
    test('should compile a Pronto script successfully', async () => {
        const { stdout, stderr } = await execAsync('pronto compile src/examples/calculator.pronto');
        expect(stderr).toBe('');
        expect(stdout).toContain('Compilation successful');
    });

    test('should run a Pronto script successfully', async () => {
        const { stdout, stderr } = await execAsync('pronto run src/examples/calculator.pronto');
        expect(stderr).toBe('');
        expect(stdout).toContain('10 + 5 = 15');
    });

    test('should handle compilation errors', async () => {
        const { stdout, stderr } = await execAsync('pronto compile src/examples/invalid.pronto');
        expect(stdout).toBe('');
        expect(stderr).toContain('Compilation failed');
    });

    test('should handle runtime errors', async () => {
        const { stdout, stderr } = await execAsync('pronto run src/examples/error-prone.pronto');
        expect(stdout).toBe('');
        expect(stderr).toContain('Runtime error');
    });
});