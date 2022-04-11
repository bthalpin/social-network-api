const { Schema,ObjectId } = require('mongoose');
const formatDate = require('../utils/helper');

const reactionSchema = new Schema({
    reactionId:{
        type: ObjectId,
        default: () => new Types.ObjectId(),
        
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
            return formatDate(v)
        }
    },
},{
    toJSON:{
        getters:true
    }
})


module.exports = reactionSchema;