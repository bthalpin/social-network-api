const { Schema,model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/helper');

const thoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },

    createdAt:{
        type: Date,
        default: Date.now,
        get(v){
            return formatDate(v)
            // Gets hour and sets AM or PM
            // let hour = v.getHours();
            // let timeOfDay;
            // if(hour>12){
            //   hour-=12
            //   timeOfDay = 'PM'
            // } else {
            //   timeOfDay = 'AM'
            // }
            
            // // Formats current time and date
            // return `${hour}:${v.getMinutes()}${timeOfDay} on ${v.getMonth() + 1}/${v.getDate()}/${v.getFullYear()}`
        }
    },

    username:{
        type: String,
        required: true,
    },
    
    reactions:[reactionSchema],
},
{
    toJSON:{
        // Virtual and get method displayed in JSON object
        virtuals:true,
        getters:true
    },
    id:false
}
)

// Virtual friendCount
thoughtSchema.virtual('reactionCount')
.get(function(){
    return this.reactions.length
})


const Thought = model('thought',thoughtSchema)

module.exports = Thought;