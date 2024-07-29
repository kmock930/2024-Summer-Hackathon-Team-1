import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/data', (req: Request, res: Response) => {
  res.send('This is the data route');
});

export default router;

