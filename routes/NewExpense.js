const express = require("express");
const router = express.Router();
const Expense = require("../models/NewExpense");
const authenticateToken = require("../middlewares/UserApiMiddleware");
const mongoose = require("mongoose");

// POST route to add a new expense
router.post("/newExpense", authenticateToken, async (req, res) => {
    try {
        const { date, expenseDescription, amount, paymentBy, paidFromAcc, remarks } = req.body;

        // Validate required fields
        if (!date || !expenseDescription || !amount) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields. Please provide date, expense description, and amount.",
            });
        }

        // Validate amount is a number
        if (isNaN(amount)) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount. It must be a number.",
            });
        }

        // Validate date format
        if (isNaN(Date.parse(date))) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Please provide a valid date.",
            });
        }

        // Create a new expense entry
        const newExpense = new Expense({
            date,
            expenseDescription,
            amount,
            paymentBy,
            paidFromAcc,
            remarks
        });

        // Save the expense to the database
        await newExpense.save();

        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            expense: newExpense,
        });

    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error. Failed to add expense.",
            error: error.message,
        });
    }
});

// GET route to fetch all expenses
router.get("/expenses", authenticateToken, async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json({
            success: true,
            message: "Expenses fetched successfully",
            data: expenses,
        });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
});


// DELETE: Delete an expense by ID

router.delete("/deleteExpense/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Expense.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ error: "Server error" });
    }
});




// Get single expense by ID
router.get("/expenses/:id", async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }
        res.json({ success: true, data: expense });
    } catch (error) {
        console.error("Error fetching expense:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// Update expense by ID
router.put("/updateExpense/:id", async (req, res) => {
    try {
        const { date, expenseDescription, amount, paymentBy, paidFromAcc, remarks } = req.body;

        // Find and update the expense
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { date, expenseDescription, amount, paymentBy, paidFromAcc, remarks },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }

        res.json({ success: true, message: "Expense updated successfully", data: updatedExpense });
    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});




module.exports = router;
