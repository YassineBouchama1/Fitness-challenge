const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require("dotenv").config();


// connection()
const app = express();
// Enable CORS
app.use(cors());
// here is a nulter configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload_images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//  here we declac static files
app.use(express.static(path.join(__dirname, "upload_images")));
app.use(express.static(path.join(__dirname, "frontend")));

app.use("/upload_images", express.static("upload_images"));



// Handle file uploads
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});



// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});


// Serve frontend 404 page for other routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'frontend', '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
