let mongoose = require("mongoose");
let userEnquirySchema = mongoose.Schema({
  name: {
    type:String,
    requireed: true,
  },
  email: {
    type:String,
    required: true,
    unique: true,
  },
 
  message: {
    type:String,
    required: true,
  },
});



let enquiryModel=mongoose.model("PortFolioEnquiry",userEnquirySchema)
module.exports=enquiryModel;





