const { Router } = require("express");
const authorController = require("../controllers/authorController");

const authorRouter = Router();

authorRouter.get("/", authorController.index);
authorRouter.get("/create", authorController.create);
authorRouter.post("/create", authorController.store);
authorRouter.get("/:id/show", authorController.show);
authorRouter.get("/:id/edit", authorController.edit);
authorRouter.post("/:id/edit", authorController.update);
authorRouter.post("/:id/delete", authorController.delete);

module.exports = authorRouter;
