import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("public", "uploads"));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
export const upload = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 },
});
