const enquiryModel = require("../../../../EnquiryModel");

const nodemailer = require("nodemailer");
let enquiryInsert = async (req, res) => {
  let { name, email, message } = req.body; //data from api


  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "godsanju21@gmail.com",

        pass: "jlmi qchi xcyl afsy", //app password
      },
    });

    const mailOptions = {
      from: email,
      to: "godsanju21@gmail.com",
      subject: `New Contact Form Submission`,
      html: `
         <h3>New Message from Portfolio Website </h3>
         <p><b>Name :</b> ${name}</p>
         <p><b>Email :</b> ${email}</p>
         <p><b>Message:</b> ${message}</p>
         `
    };
    setImmediate(() => {
      transporter
        .sendMail(mailOptions)
        .then(() => console.log("Message sent to :", email))
        .catch((err) => {
          console.error(" email error:", err);
        });
    })



  } catch (e) {
    console.log(e);

  }

  let enquiry = new enquiryModel({
    name,
    email,

    message
  });

  enquiry
    .save()
    .then(() => {
      res.send({ status: 1, mess: "Data Saved Sucessfully!" });
    })
    .catch((err) => {
      res.send({ status: 0, mess: "Error While saving Data!", error: err });
    });
}

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
