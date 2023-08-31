import express from "express";
const app = express();
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';
import likesRouter from './routes/likes.js';
import storiesRouter from './routes/stories.js';
import relationshipsRouter from './routes/relationships.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";


//MIDDLEWARESS

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
}))
app.use(cookieParser())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename)
})

app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/posts", postsRouter)
app.use("/api/comments", commentsRouter)
app.use("/api/likes", likesRouter)
app.use("/api/relationships", relationshipsRouter)
app.use("/api/stories", storiesRouter)



app.listen(8800, () => {
    console.log("API Working!");
})