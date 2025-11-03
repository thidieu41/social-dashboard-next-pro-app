import { userList } from "@/mock/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing credentials" },
        { status: 400 }
      );
    }

    const user = userList.find((item) => item.email === email);
    if (user) {
      return NextResponse.json({ message: "Email already exists." }, { status: 400 });
    }

    return NextResponse.json({
      message: "Register successful",
      user: { id: id, name: name, email: email },
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
