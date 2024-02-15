const db = require("../models");
const { Op } = require("sequelize");
const Vote = db.Vote;
const History = db.History;
const Canidate = db.Canidate;
const addvote = async (req, res) => {
  try {
    let person = {
      votercnic: req.body.votercnic,
      canidateid: req.body.canidateid,
      electionid: req.body.electionid,
    };

    const abc = await Vote.create(person);
    res.status(200).json(abc);
  } catch (error) {
    res.status(201).json({ message: "ok" });
  }
};
const isvotecasted = async (req, res) => {
  try {
    const { id } = req.params;

    const abc = await Vote.findOne({ where: { votercnic: id } });
    if (abc) {
      res.status(200).send(abc);
    } else {
      res.status(201);
    }
  } catch (error) {
    res.status(400);
  }
};
const electionresult = async (req, res) => {
  try {
    const {id}=req.params
    await transfertohistory();
    const result = await db.History.findAll({
      attributes: [
        [db.sequelize.col("canidate.cnic"), "canidateId"], // Use canidate.cnic
        [db.sequelize.col("canidate.name"), "canidateName"], // Use canidate.name
        [db.sequelize.fn("COUNT", db.sequelize.col("canidateid")), "count"],
      ],
      where:{electionid:id},
      include: {
        model: db.User,
        as: "canidate",
        attributes: [], // Include the necessary attributes from the User model
      },
      
      group: ["canidateId", "canidateName"],
      raw: true,
    });

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(201).send("No results found");
    }
  } catch (error) {
    res.status(500).send("Error fetching data: " + error.message);
  }
};
const winner = async (req, res) => {
  try {
    const {id}=req.params
    const result = await db.History.findAll({
      attributes: [
        [db.sequelize.col("canidate.cnic"), "canidateId"],
        [db.sequelize.col("canidate.name"), "canidateName"],
        [db.sequelize.fn("COUNT", db.sequelize.col("canidateid")), "count"],
      ],
      where:{electionid:id},
      include: {
        model: db.User,
        as: "canidate",
        attributes: [],
      },
      group: ["canidateId", "canidateName"],
      raw: true,
    });

    if (result.length > 0) {
      const sortedResults = result.sort((a, b) => b.count - a.count);

      const mostVotedCandidates = [sortedResults[0]];

      for (let i = 1; i < sortedResults.length; i++) {
        if (sortedResults[i].count === sortedResults[0].count) {
          mostVotedCandidates.push(sortedResults[i]);
        } else {
          break;
        }
      }

      res.status(200).send(mostVotedCandidates);
    } else {
      res.status(201).send("No results found");
    }
  } catch (error) {
    res.status(500).send("Error fetching data: " + error.message);
  }
};
const transfertohistory = async () => {
  try {
    const votesToTransfer = await Vote.findAll();

    for (const vote of votesToTransfer) {
      await History.create({
        votercnic: vote.votercnic,
        canidateid: vote.canidateid,
        electionid: vote.electionid,
      });
    }

    await Vote.destroy({
      where: {},
      truncate: true,
    });
    emptycanidate();
  } catch (error) {}
};
const emptycanidate = async () => {
  try {
    await Canidate.destroy({
      where: {},
      truncate: true,
    });
  } catch (error) {
    console.error("Error emptying Canidate table:", error);
  }
};
module.exports = {
  addvote,
  isvotecasted,
  electionresult,
  winner,
  transfertohistory,
};
