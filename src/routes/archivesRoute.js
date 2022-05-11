const express = require("express");
const {
  create,
  deleteOne,
  update,
  findOne,
  findAll,
  findAllDoc,
  findAllDocLimit,
  findAllTeacher,
  findAllTeacherLimit,
  findAllAdmin,
  findAllStudent,
  deleteAllArchives,
} = require("../controllers/archiveController");
const authMiddlware = require("../middlewares/authMiddleware");
const archiveRouter = express.Router();

//Create Archive
archiveRouter.post("/", authMiddlware, create);
//get Archive
archiveRouter.get("/", findAll);
archiveRouter.get("/docs", findAllDoc);
archiveRouter.get("/docs-limit", findAllDocLimit);
archiveRouter.get("/teachers", findAllTeacher);
archiveRouter.get("/teachers-limit", findAllTeacherLimit);
archiveRouter.get("/admins", findAllAdmin);
archiveRouter.get("/students", findAllStudent);
//Delete Archive
archiveRouter.delete("/:id", authMiddlware, deleteOne);
archiveRouter.delete("/", deleteAllArchives);
//update Archive
archiveRouter.put("/:id", authMiddlware, update);
//find one Archive
archiveRouter.get("/:id", authMiddlware, findOne);

module.exports = archiveRouter;
