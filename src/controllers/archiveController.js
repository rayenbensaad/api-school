const Archive = require("../models/Archive");
const generateToken = require("../utils/generateToken");

exports.create = async function (req, res, next) {
  try {
    console.log(req.body);
    const archive = await Archive.create(req.body);
    if (archive) {
      return res.status(200).json(archive);
    } else {
      return res.status(400).send({
        message: `something wrong`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: `something wrong, ${error}`,
    });
  }
};


exports.findAll = async function (req, res, next) {
  try {
    const archives = await Archive.find().sort({'createdAt':-1});
    if (archives) {
      return res.status(200).json(archives);
    } else {
      return res.status(400).send({
        message: `Server error`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: `something wrong, ${error}`,
    });
  }
};

exports.findAllDoc = async function (req, res, next) {
  try {
    const archives = await Archive.find({role: 'Doc'}).sort({'createdAt':-1});
    if (archives) {
      return res.status(200).json(archives);
    } else {
      return res.status(400).send({
        message: `Server error`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: `something wrong, ${error}`,
    });
  }
};

exports.findAllDocLimit = async function (req, res, next) {
  try {
    const archives = await Archive.find({role: 'Doc'}).sort({'createdAt':-1}).limit(3);
    if (archives) {
      return res.status(200).json(archives);
    } else {
      return res.status(400).send({
        message: `Server error`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: `something wrong, ${error}`,
    });
  }
};

exports.findAllTeacherLimit = async function (req, res, next) {
  try {
    const archives = await Archive.find({role: 'Teacher'}).sort({'createdAt':-1}).limit(4);
    if (archives) {
      return res.status(200).json(archives);
    } else {
      return res.status(400).send({
        message: `Server error`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: `something wrong, ${error}`,
    });
  }
};

exports.findAllTeacher = async function (req, res, next) {
  try {
    const archives = await Archive.find({role: 'Teacher'}).sort({'createdAt':-1});
    if (archives) {
      return res.status(200).json(archives);
    } else {
      return res.status(400).send({
        message: `Server error`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: `something wrong, ${error}`,
    });
  }
};

exports.findAllAdmin = async function (req, res, next) {
  try {
    const archives = await Archive.find({role: 'Admin'}).sort({'createdAt':-1});
    if (archives) {
      return res.status(200).json(archives);
    } else {
      return res.status(400).send({
        message: `Server error`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: `something wrong, ${error}`,
    });
  }
};

exports.findAllStudent = async function (req, res, next) {
  try {
    const archives = await Archive.find({role: 'Student'}).sort({'createdAt':-1});
    if (archives) {
      return res.status(200).json(archives);
    } else {
      return res.status(400).send({
        message: `Server error`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: `something wrong, ${error}`,
    });
  }
};

exports.deleteOne = async function (req, res, next) {
  const id = req.params.id;

  Archive.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Archive with id=${id}. Maybe Archive was not found!`,
        });
      } else {
        res.send({
          message: "Archive was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Archive with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Archive.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Archive with id=${id}. Maybe Archive was not found!`
        });
      } else res.send({ message: "Archive was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Archive with id=" + id
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Archive.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Archive with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Archive with id=" + id });
    });
};

// Delete All Archives
exports.deleteAllArchives = (req, res) => {
  Archive.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Archives were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Archives."
      });
    });
};