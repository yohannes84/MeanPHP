const mongoose = require("mongoose")

const operatorSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        min:0,
        max:5
        
    }

})

const tourSchema = mongoose.Schema({

    attraction:{
        type:String,
        required:true
    },
    country: {
        type:String,
        required:true
    },

    year: Number,
    operator : [operatorSchema]

})



mongoose.model(process.env.DB_TOUR_MODEL, tourSchema, "tours")