const express = require("express");
const router = express.Router();
const toursController = require("../../controllers/toursController");
const operatorsController = require("../../controllers/operatorsController")

router.get("/", function(req,res){
    console.log("GET request Received");
    res.status(404).send("Received your GET request");
});

router.route("/tours/")
      .get(toursController.getAll)
      .post(toursController.addOne)
           
router.route("/tours/:tourId")
      .get(toursController.getOne)
      .put(toursController.fullUpdateOne)
      .delete(toursController.deleteOne)
      .patch(toursController.partialUpdateOne)
   
router.route("/tours/:tourId/operator")
      .get(operatorsController.getAll)
      .post(operatorsController.addOne)
      

router.route("/tours/:tourId/operator/:operatorId")
      .get(operatorsController.getOne)
      .delete(operatorsController.deleteOne)
      .put(operatorsController.fullUpdateOne)
      .patch(operatorsController.partialUpdateOne)

module.exports = router;