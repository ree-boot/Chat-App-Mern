import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 1000, // milisec format
        httpOnly: true, // to prevent XSS attack
        sameSite: "strict", //CSRF attacks xss request forgery attack
        secure: process.env.NODE_ENV !== "development"
    });
};

export default generateTokenAndSetCookie;
