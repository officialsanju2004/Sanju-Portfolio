const enquiryModel = require("../../../../EnquiryModel");

const nodemailer = require("nodemailer");



let enquiryInsert = async (req, res) => {

 let { name, email, message } = req.body;

 try {

  const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
   }
  });

  await transporter.sendMail({
   from: process.env.EMAIL_USER,
   to: "godsanju21@gmail.com",
   subject: "New Contact Form Submission",
   html: `
    <h3>New Message from Portfolio</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b> ${message}</p>
   `
  });

  console.log("Email sent");

 } catch(err) {
  console.log("Email error:", err);
 }

 let enquiry = new enquiryModel({ name, email, message });

 await enquiry.save();

 res.send({ status:1, mess:"Data Saved Successfully" });

};

let enquiryDelete = async (req, res) => {
  let enquiryId = req.params.id;
  let enquiryUpdate = await enquiryModel.deleteOne({ _id: enquiryId });
  res.send({ status: 1, mess: "enquiry deleted" });
}

let enquiryView = async (req, res) => {
  let enquiry = await enquiryModel.find();
  res.status(200).json({ status: 1, mess: "Enquiry List", enquiryList: enquiry });
}


module.exports = { enquiryInsert, enquiryDelete, enquiryView };
