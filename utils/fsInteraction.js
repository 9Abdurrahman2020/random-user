const fs = require("fs");
const { join } = require("path");

// save a json file through this function
module.exports.saveAJsonFile = (data, callback) => {
  const filePath = join(__dirname + "/../public/users/");
  fs.open(`${filePath}${data.id}.json`, "wx", (err, fileDescriptor) => {
    if (err) {
      callback("File already exist");
    } else {
      fs.writeFile(fileDescriptor, JSON.stringify(data), (err2) => {
        if (!err2) {
          callback(null, "file saved");
          fs.close(fileDescriptor);
        }
      });
    }
  });
};
// read a random json file
module.exports.getARandomFile = (callback) => {
  const filePath = join(__dirname + "/../public/users/");
  fs.readdir(filePath, (err, files) => {
    if (err) {
      callback("error in reading directory");
    } else {
      const randomFile = files[Math.floor(Math.random() * files.length)];
      fs.readFile(`${filePath}${randomFile}`, (err2, data) => {
        if (!err2) {
          callback(null, data);
        }
      });
    }
  });
};
// read all files from a directory
module.exports.getAllFile = (limit = 0, callback) => {
  const filePath = join(__dirname + "/../public/users/");
  fs.readdir(filePath, (err, files) => {
    if (err) {
      callback("error in reading directory");
    } else {
      const allData = [];
      for (
        let i = 0;
        i < (limit > 0 && limit < files.length ? limit : files.length);
        i++
      ) {
        const readFile = fs.readFileSync(`${filePath}${files[i]}`, "utf-8");
        allData.push(JSON.parse(readFile));
      }
      callback(null, allData);
    }
  });
};
//update a file
module.exports.patchAFile = (id, updateData, callback) => {
  const filePath = join(__dirname + "/../public/users/");
  let newData;
  fs.readFile(`${filePath}${id}.json`, "utf-8", (err2, data) => {
    if (err2) {
      callback("error while reading file");
    } else {
      newData = { ...JSON.parse(data), ...updateData };
      fs.open(`${filePath}${id}.json`, "r+", (err, fileDescriptor) => {
        if (err) {
          callback("error while opeinning the file");
        } else {
          fs.ftruncate(fileDescriptor, (err4) => {
            if (!err4) {
              fs.writeFile(fileDescriptor, JSON.stringify(newData), (err3) => {
                if (err3) {
                  callback("error while updating the file");
                } else {
                  callback(null, newData);
                  fs.close(fileDescriptor);
                }
              });
            }
          });
        }
      });
    }
  });
};
