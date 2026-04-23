import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { userList } from '../mock/user';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    res.status(500).json({ message: 'Server misconfiguration: JWT_SECRET is not set' });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Missing credentials' });
    return;
  }

  const user = userList.find((u) => u.email === email && u.password === password);

  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '5d' });

  res.json({
    message: 'Login successful',
    user: { id: user.id, name: user.name, email: user.email },
    token,
  });
});

router.post('/register', async (req: Request, res: Response) => {
  const { id, name, email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Missing credentials' });
    return;
  }

  const existingUser = userList.find((item) => item.email === email);
  if (existingUser) {
    res.status(400).json({ message: 'Email already exists.' });
    return;
  }

  res.json({
    message: 'Register successful',
    user: { id, name, email },
  });
});

export default router;
