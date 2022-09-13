const router = require("express").Router();
const userControllers = require("../controllers/user.controllers");

router.get("/random", userControllers.getAUser);
router.get("/all", userControllers.getAllUser);
router.patch("/update/:id", userControllers.updateAUser);
router.patch("/bulk-update", userControllers.updateBulkUser);
router.delete("/delete", userControllers.deleteAUser);
// to save a random user data
router.post("/save", userControllers.saveAUser);

module.exports = router;
