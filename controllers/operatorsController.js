const { Router } = require("express");
const mongoose = require("mongoose")
const Tour = mongoose.model(process.env.DB_TOUR_MODEL)

//complete
const getAll = function (req, res) {
    console.log("Opertaor Get One Request Received");
    const tourId = req.params.tourId

    if(!mongoose.isValidObjectId(tourId)){
        console.log("Request params tourId is not a valid ID");
        res.status(400).json({"message":"Tour ID must be a valid ID"})
    }

    Tour.findById(tourId).select("operator").exec(function (err, tour) {
        if (err) {
            console.log("Error: finding tour");
            res.status(500).json(err)
        } else if (!tour) {
            console.log("Tour ID not found");
            res.status(404).json({ "message": "Tour ID not found" })
        } else {
            console.log("Found operator", tour.operator);
            res.status(200).json(tour.operator)
        }


    })
}

//complete
const getOne = function (req, res) {
    console.log("Operator get one request received");
    const tourId = req.params.tourId;
    const operatorId = req.params.operatorId

    if(!mongoose.isValidObjectId(tourId)){
        console.log("Request params tourId is not a valid ID");
        res.status(400).json({"message":"Tour ID must be a valid ID"})
    }

    if(!mongoose.isValidObjectId(operatorId)){
        console.log("Request params operatorId is not a valid ID");
        res.status(400).json({"message":"Operator ID must be a valid ID"})
    }

    Tour.findById(tourId).select("operator").exec(function (err, tour) {

        const response = {
            status :200,
            message: tour
        }

        if (err) {

            console.log("Error finding tour");
            response.status = 500
            response.message = err

        } else if (!tour) {
            console.log("the requsting tour ID not found");
            response.status = 404
            response.message = {"message":"tour ID not found"}
        } else if (!tour.operator) {
            console.log("the requsting operator ID not found");
            response.status = 404
            response.message = {"message":"operator ID not found"}
        } else {
            console.log("Operator found");
            res.status(200).json(tour.operator.id(operatorId))
        }

    })
}

const _addOperator = function (req, res, tour) {

    const operator = {
        name : req.body.name,
        rating : req.body.rating
    }


    tour.operator.push(operator)
    // tour.operator.name = req.body.name,
    // tour.operator.rating = req.body.rating
    console.log("--body--name", tour.operator.name);
    console.log(tour);
    tour.save(function (err, updatedTour) {
        console.log("updated Tour", updatedTour);
        const response = { "status": 200, "message": [] }
        if (err) {
            response.status = 500
            response.message = err
        } else {
            response.status = 201
            response.message = updatedTour.operator
        }

        res.status(response.status).json(tour.operator)
    })
}
//complete
const addOne = function (req, res) {
    console.log("Operator add one request received");
    const tourId = req.params.tourId;

    if(!mongoose.isValidObjectId(tourId)){
        console.log("Request params tourId is not a valid ID");
        res.status(400).json({"message":"Tour ID must be a valid ID"})
    }

    Tour.findById(tourId).select("operator").exec(function (err, tour) {
        console.log("Tour found", tour._id);
        const response = { status: 201, message: tour }
        if (err) {
            console.log("Error: finding tour");
            response.status = 500;
            response.message = err
        } else if (!tour) {
            console.log("Error: finding tour");
            response.status = 404;
            response.message = { "message": "Error: finding tour" + tourId }
        }
        if (tour) {
            _addOperator(req, res, tour)
        } else {
            res.status(response.status).json(response.message)
        }

    })
}

const _deleteOperator = function (req, res, tour) {

    operator = { name: "NoName", rating: 0 };

    //tour.operator.pop(operator)
    tour.save(function (err, updatedTour) {
        const response = { status: 204, message: [] }
        if (err) {
            response.status = 500
            response.message = err
        } else {
            response.status = 201
            response.message = updatedTour.operator
        }
        res.status(response.status).json(response.message)

    })

}

const deleteOne = function (req, res) {

    console.log("Operator delete one request received");
    const tourId = req.params.tourId;

    if(!mongoose.isValidObjectId(tourId)){
        console.log("Request params tourId is not a valid ID");
        res.status(400).json({"message":"Tour ID must be a valid ID"})
    }

    Tour.findById(tourId).select("operator").exec(function (err, tour) {
        
        const response = { status: 201, message: tour }
        if (err) {
            console.log("Error: finding tour");
            response.status = 500;
            response.message = err
        } else if (!tour) {
            console.log("Error: finding tour");
            response.status = 404;
            response.message = { "message": "Error: finding tour" + tourId }
        }
        if (tour) {
            _deleteOperator(req, res, tour)
        } else {
            res.status(response.status).json(response.message)
        }


    })
}

const _updateOperator = function (req, res, tour) {
    tour.operator.name = req.body.name;
    tour.operator.rating = req.body.rating;
    tour.save(function (err, updatedTour) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding tour");
            response.status = 500
            response.message = err
        }

        res.status(response.status).json(response.message);

    })
}

//...................................update operator.............................

const _updateOne = function(req,res,updateOperatorCallback){
    console.log("update one tour controller invoked");
    const tourId = req.params.tourId;
    console.log(tourId);
    if(!mongoose.isValidObjectId(tourId)){
        console.log("request param tourId is not a valid ID");
        res.status(400).json({"message": "tourId must be a valid ID"});
        return;
    };

    Tour.findById(tourId).select("operator").exec(function(err,tour){
        const response={
            status:200,
            message: tour
        }
        if(err){
            console.log("Error finding tour");
            response.status=500;
            response.message=err;
        }else if(!tour){
            console.log("Tour id not found");
            response.status=404;
            response.message={"message": "Tour ID not found"};
        } 
        if(response.status !==200){
            res.status(response.status).json(response.message);
        } else{
            updateOperatorCallback(req,res,tour,response);
        }
    });
}

const _saveUpdateOne = function(res,tour,response){
    tour.save(function(err,updatedTour){
        if(err){
            response.status=500;
            response.message=err;
            console.log("in err of save");
        } 
            console.log(response.message);
            res.status(response.status).json(response.message);
    });
}

const _fulloperatorUpdate = function(req,res,tour,response){
    const operator = {
        name : req.body.name,
        rating : req.body.rating
    }
    tour.operator = operator
    // tour.operator.name = req.body.name;
    // tour.operator.rating = req.body.rating;
    console.log("name",tour.operator.name );
    _saveUpdateOne(res,tour,response);
}
 
const _partialoperatorUpdate = function(req,res,tour,response){

    if (req.body.name){
        tour.operator.name =req.body.name;
    }
    if(req.body.rating){
        tour.operator.rating = req.body.year;
    }

    const operator = {
        name : req.body.name,
        rating : req.body.rating
    }
    tour.operator = operator
    _saveUpdateOne(res,tour,response);
}

const fullUpdateOne = function(req,res){
    console.log("full update one tour invoked");
    _updateOne(req,res,_fulloperatorUpdate);     
}

const partialUpdateOne = function(req,res){
    console.log("partial update one tour invoked");
    _updateOne(req,res,_partialoperatorUpdate);
}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdateOne,
    partialUpdateOne
}