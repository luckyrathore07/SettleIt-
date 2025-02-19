const Complaint = require("../models/complaint");

exports.createComplaint = async (req, res) => {
  const { title, description, complaintType, severityLevel } = req.body;
  try {
    if (!title || !description || !complaintType || !severityLevel) {
      res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newComplaint = new Complaint({
      userId: "67b57ad5202b37067a9bab01",
      title,
      description,
      complaintType,
      severityLevel,
      status: true,
      createdAt: Date.now(),
    });

    await newComplaint.save();

    res
      .status(201)
      .json({ message: "Complaint created successfully", newComplaint });
  } catch (error) {
    res.status(500).json({ message: "Error creating complaint" });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

exports.resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.query.id);
    console.log(req.query.id);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    complaint.status = false;
    await complaint.save();
    res.status(200).json({ message: "Complaint marked as resolved" });
  } catch (error) {
    res.status(500).json({ message: "Error resolving complaint" });
  }
};