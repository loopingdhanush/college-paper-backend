import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    department: { type: String, required: true },
    subject: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: String, required: true },
    fileURL: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
    uploadedBy: { type: String, required: true },
    approved: { type: Boolean, default: false },
    downloads: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const paper = mongoose.model("paper", paperSchema)

export default paper;