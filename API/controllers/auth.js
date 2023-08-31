import { db } from "../connect.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    //CHECK USER IF EXISTS
    const q = "SELECT * FROM users WHERE username=?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (data.length) {
            return res.status(409).json("User alrady exists")
        }
        //CREATE A NEW USER
        //HASH THE PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name]
        db.query(q, [values]);

        if (err) return res.status(500).json(err);
        return res.status(200).json("User Has Been Created.")
    })



}

export const login = (req, res) => {

    const q = "SELECT * FROM users WHERE username=?"

    db.query(q, [req.body.username], (err, data) => {

        if (err) {
            return res.status(501).json(err)
        }
        if (data.length === 0) return res.status(400).json("User Not Found");


        const checkPass = bcrypt.compareSync(req.body.password, data[0].password)

        if (!checkPass) {
            return res.status(400).json("Wrong Password Or userName");
        }

        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const { password, ...others } = data[0];
        var expireTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 1 hour

        res.cookie("accessToken", token, {
            expires: expireTime,
            httpOnly: true,
        }).status(200).json(others)

    })
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now()),
        path: '/login',
    }).status(200).json("user hase been Logged out.");
    res.end();

}