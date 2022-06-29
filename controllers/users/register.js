const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { sendEmail } = require("../../helpers");
const { v4 } = require("uuid");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  await User.create({
    username,
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const msg = {
    to: email,
    subject: "Email verification",
    text: "Please, verify your email",
    html: `<h3>Please, <a target="_blank" href="https://my-first-socketio-chat-backend.herokuapp.com/api/users/verify/${verificationToken}">verify</a> your email</h3>`,
  };

  await sendEmail(msg);

  res.status(201).json({
    status: 201,
    data: {
      user: {
        email,
      },
    },
  });
};

module.exports = register;
