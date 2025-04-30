import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";



//register
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
        }


        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration successful"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occurred'
        });
    }
};


//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if(!checkUser)
            return res.status(400).json({
                success: false,
                message: "User not found with this email, please register"
            });
        
        const isPasswordCorrect = await bcrypt.compare(
            password,
            checkUser.password
        );
        if (!isPasswordCorrect)
            return res.status(400).json({
                success: false,
                message: "Incorrect password! Please try again"
            });
        
        const token = jwt.sign(
            {
                id: checkUser._id,
                email: checkUser.email,
                role: checkUser.role,
                username: checkUser.username,
            },
            "CLIENT-SECRET_KEY",
            { expiresIn: "1d" }
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false
        }).json({
            success: true,
            message: "Login successful",
            user: {
                id: checkUser._id,
                email: checkUser.email,
                role: checkUser.role,
                username: checkUser.username
            },
        })
        

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};

//logout
const logoutUser = (req, res) => {
    res.clearCookie("access_token").json({
      success: true,
      message: "Logged out successfully!",
    });
  };


export { registerUser, loginUser, logoutUser };
