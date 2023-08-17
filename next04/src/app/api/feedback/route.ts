import { NextResponse } from "next/server";

type Feedback = {
    name?: "string",
    email?: "string",
    feedback?: "string",
}

export async function POST(request: Request) {
    const data = await request.json();

    console.log("data in backend: ", data);

    const { name, email, feedback } = data;

    return NextResponse.json({name, email, feedback});
}