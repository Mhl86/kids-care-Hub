import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Parent from "../models/Parent.js";
import Caregiver from "../models/Caregiver.js";

const JWT_SECRET = process.env.JWT_SECRET;

// 🟢 Register
export const register = async (req, res) => {
  try {
    const { role, firstName, lastName, address, email, password, phone } =
      req.body;

    // Check if email already exists
    const existingParent = await Parent.findOne({ where: { email } });
    const existingCaregiver = await Caregiver.findOne({ where: { email } });
    if (existingParent || existingCaregiver) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (role === "parent") {
      newUser = await Parent.create({
        firstName,
        lastName,
        address,
        email,
        password: hashedPassword,
        phone,
      });
    } else if (role === "caregiver") {
      newUser = await Caregiver.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
      });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Parent.findOne({ where: { email } });
    let role = "parent";

    if (!user) {
      user = await Caregiver.findOne({ where: { email } });
      role = "caregiver";
    }

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user.id, role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
