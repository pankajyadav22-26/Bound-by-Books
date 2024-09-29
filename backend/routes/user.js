const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth")

//signup
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        //checking for username length
        if (username.length < 4) {
            return res.status(400).json({ message: "Username's length should be greater than 3" });
        }

        //checking whether username already exists
        const existingusername = await User.findOne({ username: username });
        if (existingusername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        //checking whether email already exists
        const existingemail = await User.findOne({ email: email });
        if (existingemail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //checking password length
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password's length should be greater than 5" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        //creating new user
        const newuser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address,
        });
        await newuser.save();
        return res.status(200).json({ message: "SignUp Successfull" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//signin
router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    {
                        name: existingUser.username
                    },
                    {
                        role: existingUser.role
                    },
                ];
                const token = jwt.sign({ authClaims }, "bookstore123", { expiresIn: "30d", });
                res.status(200).json({ id: existingUser.id, role: existingUser.role, token: token, });
            }
            else {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//get user information
router.get("/get-user-info", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({ message: "Adress updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;