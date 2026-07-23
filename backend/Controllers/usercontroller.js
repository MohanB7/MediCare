const User = require("../Models/user");

//create user

const CreateUser = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword, role, department } = req.body;
        const tel = req.body.tel || req.body.phone; // Accept both tel and phone

        if (!fullName || !email || !tel || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });

        }

        // check User already exsist

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({
            fullName,
            email,
            tel,
            password,
            confirmPassword,
            role,
            department
        });

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

// Login User
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Ideally, we'd sign a JWT here. For now, returning user data.
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get Users (can filter by role)
const GetUsers = async (req, res) => {
    try {
        const { role } = req.query;
        let query = {};
        if (role) {
            query.role = role;
        }
        const users = await User.find(query).select("-password -confirmPassword");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete User
const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { CreateUser, LoginUser, GetUsers, DeleteUser };