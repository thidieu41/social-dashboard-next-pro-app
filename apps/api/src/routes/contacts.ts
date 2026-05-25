import { Router, Request, Response } from 'express';
import { contactList } from '@repo/shared/mock';

const router = Router();

router.get('/contacts', (_req: Request, res: Response) => {
  res.json({ contacts: contactList });
});

export default router;
