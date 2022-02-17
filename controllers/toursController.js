const mongoose = require("mongoose")
const Tour = mongoose.model(process.env.DB_TOUR_MODEL)

//complete
module.exports.getAll = function (req, res) {

    let offset = process.env.DEFAULT_OFFSET_LIMIT
    let count = process.env.DEFAULT_COUNT_LIMIT

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10)
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10)
    }

    if (isNaN(offset) || isNaN(count)) {
        log("offset || count are not numbers")
        res.status(400).json({ "message": "querying offset and count shoud be digits" })
        return;
    }

    if (count > process.env.MAX_COUNT) {
        log("count is greater than max limit")
        res.status(400).json({ "message": "cannot exceed count limit of " + process.env.MAX_COUNT })
        return
    }

    Tour.find().skip(offset).limit(count).exec(function (err, tours) {
        if (err) {
            console.log("Tours Request found", tours.length);
            res.status(500).json(err);
        }
        else {
            console.log("Tours Request found", tours.length);
            res.status(200).json(tours);
        }

    })

};

//complete
module.exports.getOne = function (req, res) {

    const tourId = req.params.tourId;

    if(!mongoose.isValidObjectId(tourId)){
        console.log("Request params tourId is not a valid ID");
        res.status(400).json({"message":"Tour ID must be a valid ID"})
    }

    Tour.findById(tourId).exec(function(err,tour){

        const response = {
            status :200,
            message: tour
        }
        if(err){
            console.log("Error finding tour");
            response.status = 500
            response.message = err
        }else if(!tour){
            console.log("the requsting tour ID not found");
            response.status = 400
            response.message = {"message":"tour ID not found"}
        }

            res.status(response.status).json(response.message)
    })
    

};

//complete
module.exports.addOne = function (req, res) {
    console.log("Get tour addOne Request Received");

    const newTour = {
        attraction: req.body.attraction,
        country: req.body.country,
        year: req.body.year,
        //operator: []

    };

    Tour.create(newTour, function (err, tour) {
        const response = { status: 201, message: tour }
        if (err) {
            console.log("Error: creating tour");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });

};

//complete
module.exports.deleteOne = function (req, res) {
    const tourId = req.params.tourId;

    if(!mongoose.isValidObjectId(tourId)){
        console.log("Request params tourId is not a valid ID");
        res.status(400).json({"message":"Tour ID must be a valid ID"})
    }
    
    Tour.findByIdAndDelete(tourId).exec(function (err, deletedTour) {
        const response = { status: 204, message: deletedTour }
        if (err) {
            console.log("Error: finding tour");
            response.status = 500
            response.message = err
        } else if (!deletedTour) {
            console.log("Tour id not found");
            response.status = 404
            response.message = { "message": "Tour ID not found" }
        }

        res.status(response.status).json(response.message)
    });

};


////........................update.................................................

const _updateOne = function(req,res,updateTourCallback){
    console.log("update one tour controller invoked");
    const tourId = req.params.tourId;

    if(!mongoose.isValidObjectId(tourId)){
        console.log("request param tourId is not a valid ID");
        res.status(400).json({"message": "tourId must be a valid ID"});
        return;
    };

    Tour.findById(tourId).exec(function(err,tour){
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
            updateTourCallback(req,res,tour,response);
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

const _fulltourUpdate = function(req,res,tour,response){
    tour.attraction=req.body.attraction;
    tour.country= req.body.country;
    tour.year= req.body.year;
    tour.operator= [];
    _saveUpdateOne(res,tour,response);
}
 
const _partialtourUpdate = function(req,res,tour,response){
    console.log("here");
    if (req.body.attraction){
        tour.attraction=req.body.attraction;
    }
    if(req.body.year){
        tour.year= req.body.year;
    }
    if(req.body.country){
        tour.country= req.body.country;
    }
    _saveUpdateOne(res,tour,response);
}

module.exports.fullUpdateOne = function(req,res){
    console.log("full update one tour invoked");
    _updateOne(req,res,_fulltourUpdate);     
}

module.exports.partialUpdateOne = function(req,res){
    console.log("partial update one tour invoked");
    _updateOne(req,res,_partialtourUpdate);
}