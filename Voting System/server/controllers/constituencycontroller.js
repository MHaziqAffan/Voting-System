const db = require("../models");
const Constituency = db.Constituency;
const addconstituency = async (req, res) => {
  try {
    let person = {
      name: req.body.name,
    };

    const result = await Constituency.create(person);
    res.status(200).json({ message: false });
  } catch (error) {
    console.error("Error:", error);
  }
};
const getall = async (req, res) => {
  try {
    const constituency = await Constituency.findAll();
    if (constituency) {
      res.status(200).send(constituency);
    } else {
      res.status(201).send({ message: false });
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};
module.exports = {
  addconstituency,
  getall,
};
