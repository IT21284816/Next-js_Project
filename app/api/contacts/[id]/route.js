import connectMongoDB from "@/libs/mongodb";
import Contact from "@/models/contact";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newName: name, newEmail: email, newPhone: phone, newGender: gender } = await request.json();
  await connectMongoDB();
  await Contact.findByIdAndUpdate(id, { name, email, phone, gender });
  return NextResponse.json({ message: "Contact updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const contact = await Contact.findOne({ _id: id });
  return NextResponse.json({ contact }, { status: 200 });
}
