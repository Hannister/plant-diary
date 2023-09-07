const express = require("express");

const router = express.Router();
const {
    createPlant,
    deletePlant,
    getAllPlants,
    updatePlant,
    getPlant,
} = require("../controllers/palnts");

const { uploadProductImage } = require("../controllers/uploadsController");

router.route("/").post(createPlant).get(getAllPlants);
router.route("/:id").get(getPlant).delete(deletePlant).patch(updatePlant);
router.route("/uploads").post(uploadProductImage);

module.exports = router;
