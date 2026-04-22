import { userList } from '@/mock/user';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return NextResponse.json(
      { message: 'Server misconfiguration: JWT_SECRET is not set' },
      { status: 500 },
    );
  }
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing credentials' },
        { status: 400 },
      );
    }
    const user = userList.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 },
      );
    }
    const token = jwt.sign(
      {
        email,
      },
      JWT_SECRET,
      { expiresIn: '5d' },
    );
    return NextResponse.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error || 'Server error' },
      { status: 500 },
    );
  }
}
