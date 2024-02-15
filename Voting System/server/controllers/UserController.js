const db = require("../models");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dhff8pwad",
  api_key: "249543168721786",
  api_secret: "S3PhBOjCsR5WRFnT6vd8bFvFpJw",
});
const User = db.User;

const adduser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { cnic: req.body.cnic } });
    if (user) {
      res.status(201).json({ message: true });
    } else {
      const files = req.files.image;

      cloudinary.uploader.upload(files.tempFilePath, async (err, result) => {
        if (err) {
          console.log("cloud error")
          res.status(202).json({ message: false });
        } else {
          let person = {
            cnic: req.body.cnic,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            constituencyid: req.body.constituencyid,
            type: req.body.type,
            picture: result.url,
          };

          const abc = await User.create(person);
          res.status(200).json({ message: false });
        }
      });
    }
  } catch (error) {}
};
const getallusers = async (req, res) => {
  let temp = await User.findAll({});
  res.send(temp);
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        cnic: req.body.cnic,
        password: req.body.password,
      },
    });

    if (user) {
      jwt.sign(
        {
          user
        },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "1h" }, // Fixed typo here
        (err, token) => {
          if (err) {
            res.status(400).send(err); // Send the error response
          } else {
            res
              .status(200)
              .header("token", token)
              .json({ auth: true,type:user.type,token });
          }
        }
      );
    } else {
      res.status(201).send("User not found"); // Send an error message
    }
  } catch (error) {
    res.status(400).send(error); // Send the error response
  }
};

module.exports = { login };

const getasingleuser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { cnic: req.params.id } });
    if (user) {
      res.status(200).send(user.toJSON());
    } else {
      res.status(201).send({ message: false });
    }
  } catch (error) {
    res.status(400);
  }
};
const fetchconstituencyid = async (req, res) => {
  const { id } = req.params;
  try {
    const conid = await User.findOne({ where: { cnic: id } });
    if (conid) {
      const { constituencyid } = conid;
      res.status(200).send({ constituencyid });
    } else {
      res.status(201).send({ message: false });
    }
  } catch (error) {
    res.status(400);
  }
};
module.exports = {
  adduser,
  getallusers,
  login,
  getasingleuser,
  fetchconstituencyid,
};
