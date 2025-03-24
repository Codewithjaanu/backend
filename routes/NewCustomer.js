const express = require("express");
const router = express.Router();
const Customer = require("../models/NewCustomer");
const authenticateToken = require("../middlewares/UserApiMiddleware");

// POST route to add a new customer
router.post("/newcustomer", authenticateToken, async (req, res) => {
    try {
        const {
            companyName, customerName, customerCode, place, workClassification,
            auditScope, workOrderNo, workOrderDate, workOrderAmount,
            gstNumber, travel, remarks
        } = req.body;

        // Improved validation
        if (!companyName || !customerName || !place || !workOrderNo || !workOrderDate) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields. Please fill in all necessary details.",
            });
        }

        // Validate number fields
        if (workOrderAmount && isNaN(workOrderAmount)) {
            return res.status(400).json({
                success: false,
                message: "Invalid work order amount. Must be a number.",
            });
        }

        // Validate date format
        if (isNaN(Date.parse(workOrderDate))) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Please provide a valid date.",
            });
        }

        const newCustomer = new Customer({
            companyName, customerName, customerCode, place, workClassification,
            auditScope, workOrderNo, workOrderDate, workOrderAmount,
            gstNumber, travel, remarks
        });

        await newCustomer.save();

        res.status(201).json({
            success: true,
            message: "New customer added successfully!",
            customer: newCustomer,  // Include newly added customer in response
        });

    } catch (error) {
        console.error("Error adding customer:", error); // Log full error object
        res.status(500).json({
            success: false,
            message: "Internal server error. Failed to add customer.",
            error: error.message,
        });
    }
});

// GET route to fetch all customers
router.get("/customers", authenticateToken, async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            success: true,
            message: "Customers fetched successfully",
            data: customers,
        });
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
});


// GET route to search customers by customerCode
router.get("/customer/search", authenticateToken, async (req, res) => {
    try {
        const { customerCode } = req.query;

        if (!customerCode) {
            return res.status(400).json({
                success: false,
                message: "Customer code is required for search.",
            });
        }

        const customer = await Customer.findOne({ customerCode });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer found.",
            data: customer,
        });

    } catch (error) {
        console.error("Error searching customer:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
});



// 
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer deleted successfully", deletedCustomer });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


// 2. Get single customer by ID
router.get("/onecustomers/:id", authenticateToken, async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
        res.json({ success: true, data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// 

router.put("/editcustomers/:id", async (req, res) => {
    
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) return res.status(404).json({ success: false, message: "Customer not found" });
        res.json({ success: true, message: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});


module.exports = router;
