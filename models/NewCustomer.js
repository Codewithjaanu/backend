const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customerName: { type: String },
    companyName: { type: String },
    customerCode: { type: String},
    place: { type: String },
    workClassification: { type: String },
    auditScope: { type: String },
    workOrderNo: { type: String },
    workOrderDate: { type: Date },
    workOrderAmount: { type: Number },
    gstNumber: { type: String },
    travel: { type: String},
    remarks: { type: String},
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);

