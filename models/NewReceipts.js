const mongoose = require("mongoose");
const receiptSchema = new mongoose.Schema({
  customerCode: { type: String, required: true },
  workOrderDate:{type: Date,require:true},
  invoiceNo: { type: String, required: true },
  invoiceAmount: { type: Number, required: true },
  dateOfReceipt: { type: Date, required: true },
  amountReceived: { type: Number, required: true },
  gst: { type: Number, required: true },
  tdsDeducted: { type: Number, required: true },
  travelAmt: { type: Number, required: true },
  receiptInAccount: { type: String, required: true },
  description: { type: String, required: true },
  remarks: { type: String, required: true },
}, { timestamps: true });

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
