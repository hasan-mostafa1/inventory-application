const { Router } = require("express");
const bookController = require("../controllers/bookController");

const bookRouter = Router();

bookRouter.get("/", bookController.index);
bookRouter.get("/create", bookController.create);
bookRouter.post("/create", bookController.store);
bookRouter.get("/:id/show", bookController.show);
bookRouter.get("/:id/edit", bookController.edit);
bookRouter.post("/:id/edit", bookController.update);
bookRouter.post("/:id/delete", bookController.delete);

module.exports = bookRouter;
