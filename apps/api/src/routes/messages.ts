import { Router, Request, Response } from 'express';
import { messageList } from '@repo/shared/mock';

const router = Router();

router.get('/messages', (_req: Request, res: Response) => {
  res.json({ messages: messageList });
});

export default router;
