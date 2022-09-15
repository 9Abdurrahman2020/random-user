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
  userControllers.getARandomFile((err, file) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(file);
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
  if (name) {
    userControllers.patchAFile(id, { name }, (err, data) => {
      res.send({ err, data });
    });
  }
  if (contact) {
    userControllers.patchAFile(id, { contact }, (err, data) => {
      res.send({ err, data });
    });
  }
  if (address) {
    userControllers.patchAFile(id, { address }, (err, data) => {
      res.send({ err, data });
    });
  }
  if (photoUrl) {
    userControllers.patchAFile(id, { photoUrl }, (err, data) => {
      res.send({ err, data });
    });
  }
};
module.exports.updateBulkUser = (req, res) => {
  const { ids, data } = req.body;

  if (Array.isArray(ids) && typeof data === "object" && !Array.isArray(data)) {
    const updatedDatas = ids.reduce((acc, cur) => {
      userControllers.patchAFile(cur, data, (err, data) => {
        if (!err) {
          acc.push(data);
        }
      });
      return acc;
    }, []);
    res.send("successfully updated");
  } else {
    res.status(400).send("bad request");
  }
};
module.exports.deleteAUser = (req, res) => {
  const { id } = req.params;
  userControllers.deleteFile(id, (err) => {
    if (!err) {
      res.send("Delete successfull");
    } else {
      res.send("There is an error in the server");
    }
  });
};
