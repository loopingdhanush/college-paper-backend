import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {

  const { token } = req.body;

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, 
    sameSite: "lax",
    path:"/",
  });
  console.log("logging")
  res.json({ message: "Logged in" });

});

router.post("/logout", (req,res)=>{

  res.clearCookie("token");

  res.json({message:"logged out"});

});

export default router;