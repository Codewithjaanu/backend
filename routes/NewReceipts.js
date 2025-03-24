const express = require("express");
const Receipt = require("../models/NewReceipts");
const authenticateToken = require("../middlewares/UserApiMiddleware");

const router = express.Router();

// POST route to add a new receipt
router.post("/newreceipts", authenticateToken, async (req, res) => {
  try {
    const { customerCode,workOrderDate, invoiceNo, invoiceAmount, dateOfReceipt, amountReceived, gst, tdsDeducted, travelAmt, receiptInAccount, description, remarks } = req.body;

    const newReceipt = new Receipt({
      customerCode,
      workOrderDate,
      invoiceNo,
      invoiceAmount,
      dateOfReceipt,
      amountReceived,
      gst,
      tdsDeducted,
      travelAmt,
      receiptInAccount,
      description,
      remarks

    });

    await newReceipt.save();

    res.status(201).json({
      success: true,
      message: "Receipt added successfully!",
    });

  } catch (error) {
    console.error("Error adding receipt:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// GET route to fetch all receipts
router.get("/receipts", authenticateToken, async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.status(200).json(receipts);
  } catch (error) {
    console.error("Error fetching receipts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});


// 
router.delete("/deletereceipt/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReceipt = await Receipt.findByIdAndDelete(id);

    if (!deletedReceipt) {
      return res.status(404).json({ message: "Receipt Not Found" });
    }

    res.status(200).json({ message: "Receipt deleted successfully"});

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// Get a single receipt by ID
router.get("/receiptsingle/:id", async (req, res) => {
  try {
      const receipt = await Receipt.findById(req.params.id);
      if (!receipt) {
          return res.status(404).json({ message: "Receipt not found" });
      }
      res.status(200).json(receipt);
  } catch (error) {
      res.status(500).json({ error: "Error fetching receipt", details: error.message });
  }
});

//  Update a receipt by ID
router.put("/receiptupdate/:id", async (req, res) => {
  try {
      const receipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!receipt) {
          return res.status(404).json({ message: "Receipt not found" });
      }
      res.status(200).json({ message: "Receipt updated successfully", receipt });
  } catch (error) {
      res.status(500).json({ error: "Error updating receipt", details: error.message });
  }
});


module.exports = router;
