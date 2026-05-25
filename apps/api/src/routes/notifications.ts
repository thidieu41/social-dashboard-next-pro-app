import { Router, Request, Response } from 'express';
import { notificationList } from '@repo/shared/mock';

const router = Router();

router.get('/notifications', (_req: Request, res: Response) => {
  res.json({ notifications: notificationList });
});

export default router;
