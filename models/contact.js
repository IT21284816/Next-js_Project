import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    gender: String,
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
