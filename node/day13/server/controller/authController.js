import authModel from "../models/authModels.js";
import bcrypt from "bcrypt";

export const registerprocess = async (req, res) => {
    try {
        const {username,useremail,usernumber, userlocation,userpassword} = req.body;

        const hashedPassword = await bcrypt.hash(userpassword, 10);

        const register = await authModel.create({
            username,
            useremail,
            usernumber,
            userlocation,
            userpassword: hashedPassword
        });

        res.status(201).json({
            msg: "Successfully registered",
            register
        });

    } catch (error) {
        console.log("Error in registerprocess:", error);
        res.status(500).json({
            msg: "Something went wrong"
        });
    }
};
export const loginprocess = async (req, res) => {
    try {
        const { useremail, userpassword } = req.body;

        const checkemail = await authModel.findOne({ useremail });

        if (!checkemail) {
            return res.status(404).json({
                msg: "Invalid email"
            });
        }

        const passwordbcrypt = await bcrypt.compare(
            userpassword,
            checkemail.userpassword
        );

        if (!passwordbcrypt) {
            return res.status(401).json({
                msg: "Invalid password"
            });
        }

        return res.status(200).json({
            msg: "Login successful",
            users: {
                id: checkemail._id,
                email: checkemail.useremail
            }
        });

    } catch (error) {
        console.log("Error in login code:", error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};

export const dashboardData = async (req,res)=>{
    console.log(req)
}