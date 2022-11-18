import express from 'express';
import cors from 'cors';
import UserRoutes from './routes/UserRoutes';
import AccountRoutes from './routes/AccountRoutes';
import TransactionRoutes from './routes/TransactionRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (_req, res) => res.json({ message: 'Ok' }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json(), cors());
    this.app.use(accessControl);

    this.app.use(UserRoutes, AccountRoutes, TransactionRoutes);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes depende dessa exportação
export const { app } = new App();
