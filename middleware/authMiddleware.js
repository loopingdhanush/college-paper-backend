import admin from "../config/firebase.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    // Restrict to college domain
    if (!decoded.email.endsWith("@psgtech.ac.in")) {
      return res.status(403).json({ message: "Unauthorized domain" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;