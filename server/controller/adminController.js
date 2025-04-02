const { validationResult } = require("express-validator");
const adminService = require("../services/adminService");
const adminModel = require("../db/models/adminModel");
const blackList = require("../db/models/blacklistToken");
const authorModel = require("../db/models/authorModel");
const authorService = require("../services/authorService");

module.exports.addAdmin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const exist = await adminModel.findOne({ email: req.body.email });
  if (exist) {
    return res.status(401).json({ errors: "user with this email exist" });
  }
  const admin = {
    name: req.body.name,
    email: req.body.email,
    password: await adminModel.hashPassword(req.body.password),
  };
  //const result = await adminService.addAdmin(admin);

  res.status(201).json({ admin }); //send result later okay
};
module.exports.loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(">>");
    return res.status(400).json({ errors: errors.array() });
  }
  const admin = {
    email: req.body.email,
    password: req.body.password,
  };
  const isAdmin = await adminModel
    .findOne({ email: admin.email })
    .select("+password");

  if (!isAdmin) {
    return res.status(400).json("INVALID CREDENTIAL");
  }

  const isMatch = await isAdmin.comparePassword(admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid details" });
  }

  const token = await isAdmin.generateAuthToken();
  res
    .cookie("token", token, {
      httpOnly: true, // Prevents JavaScript from accessing it
      secure: process.env.NODE_ENV === "production", // Set to `true` if using HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
      partitioned: process.env.NODE_ENV === "production", // Adjust for cross-site requests
    })
    .redirect("/add-venue");
  // res.status(201).json({status: true});
};
module.exports.addAuthor = async (req, res) => {
  const errors = validationResult(req);
  console.log("Add author");
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const exist = await authorModel.findOne({ email: req.body.email });
  if (exist) {
    return res.status(401).json({ errors: "author with this email exist" });
  }
  const author = {
    name: req.body.name,
    email: req.body.email,
    password: await authorModel.hashPassword(req.body.password),
    venueId: req.body.venueId,
    permissions: req.body.permissions,
  };
  const result = await authorService.addAuthor(author);
  res.status(201).json({ result });
};
module.exports.logoutAdmin = async (req, res) => {
  res.clearCookie("token");
  const token =
    req.cookies.token ||
    (req.header("Authorization") && req.header("Authorization").split(" ")[1]);
  await blackList.create({ token });
  res.status(200).redirect("/");
};
