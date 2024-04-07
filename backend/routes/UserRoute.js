const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Register = require("../Model/Register");
const Login = require("../Model/Login");
const JWT_SECRET = "rahul";

//  Register Page
router.post(
  "/register",
  [
    body("firstname", "Enter a valid first name").isLength({ min: 2 }),
    body("lastname", "Enter a valid last name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      // Check if the user is already registered or not
      let checkuser = await Login.findOne({ email: email });
      if (checkuser) {
        return res.status(409).json({
          message: "Sorry, a user with this email address already exists",
        });
      } else {
        // Generate a salt and hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new Register({
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: hashedPassword, // Use the hashed password
        });

        // Save the user to the database

        const data = {
          user: {
            id: user._id,
            username: firstname + lastname,
          },
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(authtoken);

        const success = true;
        await user.save();
        const Logindata = new Login({
          email: email,
          password: hashedPassword,
        });

        await Logindata.save();
        return res.status(201).json({
          success,
          data,
          authtoken,
          message: "Registration successful",
        });
      }
    } catch (error) {
      console.log({ error: error });
      res
        .status(500)
        .send({ msg: "Internal server error occurred", error: error.message });
    }
  }
);

//  2. Authenticating a user using POST: "/api/auth/login". NO login required
// login Route

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password").exists(),
  ],
  async (req, res) => {
    // if there are errors return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(email, password);

    try {
      let user = await Login.findOne({ email });

      if (!user) {
        success = false;
        return res.status(404).json({ success, message: "User not found" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(401).json({ success, message: "Incorrect password" });
      }

      const data = {
        user: {
          id: user._id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.cookie("token", authtoken);

      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error occured");
    }
  }
);

router.get("/logout", (req, res) => {
  try {
    res.json("Logout SuccessFull");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error occured");
  }
});

module.exports = router;
