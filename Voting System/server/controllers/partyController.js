const db = require("../models");
const cloudinary = require("cloudinary").v2;
const Party = db.Party;
cloudinary.config({
  cloud_name: "dhff8pwad",
  api_key: "249543168721786",
  api_secret: "S3PhBOjCsR5WRFnT6vd8bFvFpJw",
});
const addparty = async (req, res) => {
  try {
    const files = req.files.symbol;
    cloudinary.uploader.upload(files.tempFilePath, async (err, result) => {
      if (err) {
        res.status(201).json({ message: false });
      } else {
        let person = {
          id: req.body.id,
          name: req.body.name,
          symbol: result.url,
        };
        const abc = await Party.create(person);
        res.status(200).json({ message: true });
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};
const getallparty = async (req, res) => {
  try {
    const party = await Party.findAll();
    if (party) {
      res.status(200).send(party);
    } else {
      res.status(201).send({ message: false });
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = {
  addparty,
  getallparty,
};
