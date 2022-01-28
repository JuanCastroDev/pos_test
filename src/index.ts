// Environment variables
import dotenv from 'dotenv';
dotenv.config();

// Modules
import Server from './server';

// Initialize
const server = new Server();
server.listen();