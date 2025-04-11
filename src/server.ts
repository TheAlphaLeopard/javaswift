import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { tokenize } from './compiler/tokenizer';
import { parse } from './compiler/parser';
import { transpile } from './compiler/transpiler';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the HTML page
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files (e.g., .pronto examples)
app.use('/examples', express.static(path.join(__dirname, 'examples')));

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('runPronto', (code: string) => {
        try {
            console.log('Received Pronto code:', code);

            const tokens = tokenize(code);
            const ast = parse(tokens);
            const jsCode = transpile(ast);

            console.log('Generated JavaScript:', jsCode);
            socket.emit('output', jsCode);
        } catch (error) {
            const err = error as Error;
            console.error('Error processing Pronto code:', err.message);
            socket.emit('error', err.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});