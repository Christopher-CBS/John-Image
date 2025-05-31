const nodemailer = require("nodemailer");

async function main() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "widewebagency@gmail.com",
      pass: "jugi akoq psyf iqyq", // Remplace ici par ton mot de passe d'application SANS guillemets
    },
  });

  let info = await transporter.sendMail({
    from: "widewebagency@gmail.com",
    to: "widewebagency@gmail.com",
    subject: "Test Nodemailer",
    text: "Ceci est un test d'envoi Nodemailer depuis un script Node.js.",
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
