const bcrypt = require("bcrypt");
const emailManager = require("../../managers/emailManager");
const usersModel = require('../../models/user/users.model');
const userType=require('../../enums/UserType')

const register = async (req, res) => {
  const { userName, userType, email, password, confirm_password, phoneNumber } = req.body;
  // validations...
  if (!email) throw "Email must be provided!";
  if (!password) throw "Password must be provided!";
  if (password.length < 5) throw "Password must be at least 5 characters long.";

  if (!userName) throw "User Name is required";
  if (password !== confirm_password)
    throw "Password and confirmed password doesnot match!";

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "This email already exists!";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    userName: userName,
    userType: userType,
    email: email,
    password: hashedPassword,
    phoneNumber: phoneNumber
  });  

  let emailMessage = userType=== userType.SENDER?
    "Welcome to BugBuddy p2p postal system. Register and get your things sent to your destination by our system user travels!"+
    "<h1>Welcome to BugBuddy P2P postal service.</h1> <br/><br/> We hope you can contact and get your match from our platform!"+
    "Welcome to BugBuddy p2p postal system!":
    "Welcome to BugBuddy p2p postal system. Register your travel and make money along the way."+
    "<h1>Welcome to BugBuddy P2P postal service.</h1> <br/><br/> We hope you can contact and get your match from our platform!"+
    "Welcome to BugBuddy p2p postal system!"

  await emailManager(
    createdUser.email,
    emailMessage    
  );

  res.status(201).json({
    status: "User registered successfully!",    
  });
};

module.exports = register;
