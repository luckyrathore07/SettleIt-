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

exports.vote = async (req,res) => {
  try{
    const complaintId = req.query.id;
    const upvote = req.query.like;
    const downVote = req.query.disLike;
    const userId = "67b57ad5202b37067a9bab01"
    const complaint = await Complaint.findById(complaintId);
    //console.log(complaintId,like,disLike,userId);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });
     console.log("hello1")
    if(upvote == "false" && downVote == "false"){
      complaint.like = complaint.like.filter((user) => user != userId );
      complaint.dislike = complaint.dislike.filter((user) => user != userId );
      //console.log("hello in 1 try")
    }

    else if(upvote == "true" && downVote == "false"){
       complaint.like.push(userId );
      complaint.dislike = complaint.dislike.filter((user) => user != userId );
      //console.log("hello2")
    }
    else if(upvote == "false" && downVote == "true"){
      complaint.like = complaint.like.filter((user) => user != userId );
       complaint.dislike.push(userId );
      console.log("hello in 3 try")
    }
    console.log(complaint)
    
    await complaint.save();
    console.log("hello after save")
    res.status(201).json({
      success: true,
      message: "voted successfully",
      likeCount : complaint.like.length,
      disLikeCount: complaint.dislike.length ,
    });

  } catch(error){
    res.status(500).json({ message: "Error when voting complaint" });
  }
}