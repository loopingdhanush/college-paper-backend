import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { 
  approvePaper, 
  uploadPaper, 
  getAllPapers, 
  getFilteredPaper,
  pendingPaper,
  deletePaper,
  downloadPaper } from "../controllers/paperController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

//Upload Route
router.post("/upload", authMiddleware, upload.single("file"), uploadPaper);
//Filter approved papers
router.get("/", authMiddleware, getFilteredPaper);
//Download paper
router.get("/download/:id", authMiddleware, downloadPaper);
//Admin
router.patch("/approve/:id", authMiddleware, adminMiddleware, approvePaper);
router.get("/allpapers",authMiddleware,adminMiddleware,getAllPapers);
router.get("/pendingpapers",authMiddleware,adminMiddleware,pendingPaper);
router.delete("/:id",authMiddleware,adminMiddleware,deletePaper);

//Testing Routes
router.get("/admin-test",authMiddleware, adminMiddleware, (req,res)=>{
  res.json({message:"admin access granted"})
});
router.get("/test", authMiddleware, (req, res) => {
  res.json({
    message: "Auth working",
    user: req.user.email
  });
});

export default router;