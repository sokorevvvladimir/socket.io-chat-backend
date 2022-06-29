const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { BadRequest } = require("http-errors");

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("Missing required field email");
  }

  const user = await User.findOne({ email });

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const msg = {
    to: email,
    subject: "Email verification",
    text: "Please, verify your email",
    html: `<h3>Please, <a target="_blank" href="http://localhost:3001/api/users/verify/${user.verificationToken}">verify</a> your email</h3>`,
  };

  await sendEmail(msg);

  res.status(200).json({
    status: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerificationEmail;
