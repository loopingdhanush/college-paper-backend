import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { 
  approvePaper, 
  uploadPaper, 
  getAllPapers, 
  getApprovedPapers, 
  getFilteredPaper } from "../controllers/paperController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", authMiddleware, upload.single("file"), uploadPaper);

router.get("/admin-test",authMiddleware, adminMiddleware, (req,res)=>{
  res.json({message:"admin access granted"})
})

router.get("/test", authMiddleware, (req, res) => {
  res.json({
    message: "Auth working",
    user: req.user.email
  });
});

router.patch("/approve/:id", authMiddleware, adminMiddleware, approvePaper);
router.get("/allpapers",authMiddleware,adminMiddleware,getAllPapers)
router.get("/approvedpapers",authMiddleware,getApprovedPapers)
router.get("/", authMiddleware, getAllPapers);

export default router;