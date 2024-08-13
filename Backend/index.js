const express = require('express');
const multer = require('multer');
const docxToPDF = require('docx-pdf');
const path = require('path');
const fs = require('fs');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// Ensure the 'files' directory exists
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

// Setting up the file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/convertFile', upload.single('file'), (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'Please upload a file' });
        }

        // Defining output file path
        const outputPath = path.join(filesDir, `${path.basename(req.file.originalname, path.extname(req.file.originalname))}.pdf`);

        docxToPDF(req.file.path, outputPath, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Error converting file',
                });
            }
            res.download(outputPath, () => {
                console.log('File downloaded');
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
