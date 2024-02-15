const db = require("../models");
const Canidate = db.Canidate;
const { Op } = require("sequelize");
const addcanidate = async (req, res) => {
  try {
    const existingCandidate = await Canidate.findOne({
      where: {
        cnic: req.body.cnic,
      },
    });
    if (existingCandidate) {
      if (existingCandidate.partyid != req.body.partyid) {
        return res.status(201).json({
          message: "Candidate is already standing from a different party",
        });
      }
      const check = await Canidate.findOne({
        where: { cnic: req.body.cnic, constituencyid: req.body.constituencyid },
      });
      if (check) {
        return res.status(201).json({
          message: "Candidate already exists in the same constituency",
        });
      }
    }

    let person = {
      cnic: req.body.cnic,
      id: req.body.id,
      constituencyid: req.body.constituencyid,
      partyid: req.body.partyid,
      status: req.body.status,
    };

    const abc = await Canidate.create(person);
    res.status(200).json({ message: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: false });
  }
};

const getall = async (req, res) => {
  try {
    const canidates = await Canidate.findAll({
      include: [
        {
          model: db.User,
          as: "user",
        },
        {
          model: db.Party,
          as: "party",
        },
        {
          model: db.Constituency,
          as: "constituency",
        },
      ],
      where: {
        status: "p",
      },
    });

    if (canidates) {
      res.status(200).send(canidates);
    } else {
      res.status(201).send({ message: false });
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};
const approve = async (req, res) => {
  try {
    const { id, conid } = req.params;

    // Find the candidate by ID and update the status
    const canidate = await Canidate.findOne({
      where: { cnic: id, constituencyid: conid },
    });
    if (canidate) {
      await Canidate.update(
        { status: "a" },
        { where: { cnic: id, constituencyid: conid } }
      );

      res.status(200).json({ message: "Approval successful" });
    } else {
      res.status(404).json({ message: "Candidate not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const reject = async (req, res) => {
  try {
    const { id, conid } = req.params;

    // Find the candidate by ID and update the status
    const canidate = await Canidate.findOne({ where: { cnic: id } });

    if (canidate) {
      canidate.destroy();

      res.status(200).json({ message: "delete successful" });
    } else {
      res.status(404).json({ message: "Candidate not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const fetchcanidates = async (req, res) => {
  try {
    const { id, conid } = req.params;

    const canidates = await Canidate.findAll({
      include: [
        {
          model: db.User,
          as: "user", // Use the alias 'user' defined in Canidate model
        },
        {
          model: db.Party,
          as: "party", // Use the alias 'party' defined in Canidate model
        },
        {
          model: db.Constituency,
          as: "constituency",
        },
      ],
      where: {
        status: "a", // Add the condition for 'status'
        constituencyid: conid, // Exclude the candidate with the given usercnic
        cnic: { [Op.ne]: id },
      },
    });

    if (canidates) {
      res.status(200).send(canidates);
    } else {
      res.status(201).send({ message: false });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  addcanidate,
  getall,
  approve,
  reject,
  fetchcanidates,
};
