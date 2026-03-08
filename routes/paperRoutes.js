import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { 
  uploadPaper, 
  approvePaperById, 
  getAllPapers, 
  getFilteredPapers,
  getPendingPapers,
  deletePaperById,
  downloadPaperById, getAllCourses } from "../controllers/paperController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

//User
router.post("/", authMiddleware, upload.single("file"), uploadPaper);
router.get("/", authMiddleware, getFilteredPapers);
router.get("/courses",authMiddleware,getAllCourses)
router.get("/:id/download", authMiddleware, downloadPaperById);

//Admin
router.patch("/:id/approve", authMiddleware, adminMiddleware, approvePaperById);
router.get("/admin/all",authMiddleware,adminMiddleware,getAllPapers);
router.get("/admin/pending",authMiddleware,adminMiddleware,getPendingPapers);
router.delete("/:id",authMiddleware,adminMiddleware,deletePaperById);

//Testing Routes
router.get("/admin/test",authMiddleware, adminMiddleware, (req,res)=>{
  res.json({message:"admin access granted"})
});
router.get("/test", authMiddleware, (req, res) => {
  res.json({
    message: "Auth working",
    user: req.user.email
  });
});

export default router;