import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect()
  .then(async (db) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    console.log(username, email, password);

    // check if user exists
    const user = await User.findOne({ email: email });
    if (user)
      return NextResponse.json({ error: "User already exists", status: 400 });

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      status: 200,
      savedUser,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
