const generateUniqueId = require("generate-unique-id");

const userControllers = require("../utils/fsInteraction");

module.exports.saveAUser = (req, res) => {
  const id = generateUniqueId({
    length: 20,
    useLetters: false,
  });
  const { gender, name, contact, address, photoUrl } = req.body;
  if (gender && name && contact && address && photoUrl) {
    const user = {
      id,
      gender,
      name,
      contact,
      address,
      photoUrl,
    };
    userControllers.saveAJsonFile(user, (err, response) => {
      if (response) {
        res.send("Saved the file successfully");
      } else {
        res.send(err);
      }
    });
  } else {
    res.status(400).send("There is a problem in your request");
  }
};
module.exports.getAUser = (req, res) => {
  userControllers.getARandomFile((err, files) => {
    if (err) {
      res.send(err);
    } else {
      res.send(files);
    }
  });
};
module.exports.getAllUser = (req, res) => {
  const { s } = req.query;
  userControllers.getAllFile(s > 0 ? s : 0, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
};
module.exports.updateAUser = (req, res) => {
  const id = req.params.id;
  const { gender, name, contact, address, photoUrl } = req.body;
  if (gender) {
    userControllers.patchAFile(id, { gender }, (err, data) => {
      res.send({ err, data });
    });
  }
};
module.exports.updateBulkUser = (req, res) => {};
module.exports.deleteAUser = (req, res) => {};
