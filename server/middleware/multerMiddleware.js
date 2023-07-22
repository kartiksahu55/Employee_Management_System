import multer from "multer";
import path from "path";
import AppError from "../utils/errorUtils.js";

// Multer Config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, next) => {
    const allowedFileTypes = [".jpg", ".png", ".jpeg"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(ext)) {
      next(null, true);
    } else {
      return next(new AppError("File type is not supported"));
    }
  },
});

export default upload;
