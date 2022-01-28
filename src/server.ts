// Modules
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Middlewares
import { isAuthenticated } from './middlewares/authenticated';

// Keys
import keys from './keys';
const { port } = keys;

// Routes
import authRoutes from './routes/auth.routes';
import privateRoutes from './routes/private.routes';

class Server {

  app: Application;

  constructor() {
    this.app = express();
    this.app.set('port', port);
    // Initialize
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
  }

  routes() {
    // Routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/private/', isAuthenticated, privateRoutes);
  }

  listen() {
    // Listen
    this.app.listen(this.app.get('port'), () => {
      console.log(`Api running in http://localhost:${ this.app.get('port') }/api`);
    });
  }

}

export default Server;
