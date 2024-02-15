const db = require("../models");
const Election = db.Election;
const createelection = async (req, res) => {
  try {
    const date = req.body.startDate;
    const allEndDates = await Election.findAll({
      attributes: ["endDate"],
      raw: true,
    });
    const isStartDateValid = allEndDates.every((endDate) => {
      const startDate = new Date(req.body.startDate);
      const endDateFromDb = new Date(endDate.endDate);

      return startDate > endDateFromDb;
    });

    if (isStartDateValid) {
      let person = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        duration: req.body.duration,
      };
      const abc = await Election.create(person);
      res.status(200).json({ message: false });
    } else {
      res.status(201).json({ message: true });
    }
  } catch (error) {
    res.status(201).json({ message: true });
  }
};
const fetchelections = async (req, res) => {
  const elections = await Election.findAll();
  if (elections) {
    res.status(200).send(elections);
  } else {
    res.status(201);
  }
};
module.exports = {
  createelection,
  fetchelections,
};
