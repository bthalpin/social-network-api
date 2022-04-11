const { Schema, ObjectId } = require('mongoose');

const reactionSchema = new Schema({
    _Id:{
        type: ObjectId,
        default: () => new Types.ObjectId(),
        //use Mongoose ObjectId data type
        // Default set to new object id
    },

    reactionBody:{
        type:String,
        required:true,
        maxLength:280,
    },

    username:{
        type: String,
        required: true,
    },
    
    createdAt:{
        type:Date,
        default:Date.now,
        get(v){
            return // formatted date
        }
    },
})


module.exports = reactionSchema;