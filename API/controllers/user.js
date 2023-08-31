import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getUser = (req, res) => {
    const userId = req.params.id;

    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const { ...info } = data[0];
        return res.json(info);
    });
}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

        db.query(
            q,
            [
                req.body.name,
                req.body.city,
                req.body.website,
                req.body.profilePic,
                req.body.coverPic,
                userInfo.id,
            ],
            (err, data) => {
                if (err) res.status(500).json(err);
                if (data.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your info!");
            }
        );
    });
};


export const getAllUser = (req, res) => {

    const q = "SELECT name,profilePic,id FROM users ORDER BY id DESC LIMIT 5";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}

export const getNonFolower = (req, res) => {

    const q = "Select id, name ,profilePic from users Where name =users.name AND (id not in (select followerId from relationships where followerId = users.id) OR id <> users.Id ) LIMIT 5";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}