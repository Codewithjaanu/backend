const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    expenseDescription: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentBy: { type: String, required: true },
    paidFromAcc: { type: String, required: true },
    remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);
