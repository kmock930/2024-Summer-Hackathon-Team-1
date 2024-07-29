import express, { Request, Response } from 'express';
import apiRoutes from './routes/apiRoutes';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

app.get('/users', (req: Request, res: Response) => {
  res.status(200).json({user: 'abc'});
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.use('/api', apiRoutes);