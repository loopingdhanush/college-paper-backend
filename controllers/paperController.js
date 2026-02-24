import Paper from "../models/paper.js";
import cloudinary from "../config/cloudinary.js";


export const uploadPaper = async (req, res) => {
  try {
    const { department, subject, year, type } = req.body;

    const exists = await Paper.findOne({
      department,
      subject,
      year,
      type
    });
    if (exists) {
      return res.status(400).json({ message: "Paper already exists" });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log(req.body);
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "college_papers"
    });

    const paper = await Paper.create({
      department,
      subject,
      year,
      type,
      fileURL: result.secure_url,
      cloudinary_id: result.public_id,
      uploadedBy: req.user.uid
    });

    // temp files (approver)
    
    

    res.status(201).json(paper);
  } catch (error) {
  console.error("UPLOAD ERROR:", error);
  res.status(500).json({ 
    message: "Upload failed",
    error: error.message
  });
}
};

export const approvePaper = async (req, res) => {
  try {
    const { id } = req.params;

    const paper = await Paper.findById(id);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    paper.approved = true;
    await paper.save();

    res.json({
      message: "Paper approved successfully",
      paper
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Approval failed" });
  }
};

export const getAllPapers = async(req,res) =>{
  try {
  const allPapers = await Paper.find().sort({createdAt: -1});
  res.json(allPapers);
  } catch {
    res.json({message: "Failed to fetch"});
  }
}

export const getFilteredPaper = async (req, res) => {
  try {
    const { department, subject, year, type } = req.query;

    const filter = { approved: true };

    if (department) filter.department = department;
    if (subject) filter.subject = subject;
    if (year) filter.year = Number(year);  // important
    if (type) filter.type = type;

    const papers = await Paper.find(filter)
      .sort({ createdAt: -1 });

    res.json(papers);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve" });
  }
};

export const pendingPaper = async (req,res) =>{
  try {
    const pending = await Paper.find({approved: false}).sort({createdAt:-1});
    res.json(pending);
  } catch (error) {
    res.status(500);
  }
}

export const deletePaper = async (req, res) => {
  try {
    const { id } = req.params;

    const paper = await Paper.findById(id);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }
    await cloudinary.uploader.destroy(paper.cloudinary_id, {
      resource_type: "raw"
    });
    await paper.deleteOne();
    res.json({ message: "Paper deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};

export const downloadPaper = async (req, res) => {
  try {
    const { id } = req.params;

    const paper = await Paper.findById(id);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    if (!paper.approved) {
      return res.status(403).json({ message: "Paper not approved yet" });
    }

    await Paper.findByIdAndUpdate(id, {
      $inc: { downloads: 1 }
    });

    res.json({
      message: "Download ready",
      fileURL: paper.fileURL
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Download failed" });
  }
};