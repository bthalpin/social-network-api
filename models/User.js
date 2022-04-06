const { Schema,model } = require('mongoose');

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate:{
            validator: function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message:'You must enter a valid email'
        },
    },
    // _ids - references thought model
    thoughts:[],

    // _ids - references the user model
    friends:[]
})

// Virtual friendCount