import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import moment from "moment/moment.js";


export const getStories = (req, res) => {
    const q = `SELECT s.*, u.name
    FROM stories as s
    JOIN users as u
    ON s.userId = u.id
    ORDER BY s.createdAt DESC`;


    db.query(q, (err, data) => {
        if (err) return res.status(501).json(err);
        return res.status(200).json(data);
    });
}


export const addStory = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO stories(`img`,`userId`,`createdAt`) VALUE (?)";

        const values = [
            req.body.image,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Story has been Uploaded");
        });
    });
}


