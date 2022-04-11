const { Schema,model } = require('mongoose');
const reactionSchema = require('./Reaction')

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
            let hour = v.getHours();
            let timeOfDay;
            if(hour>12){
              hour-=12
              timeOfDay = 'PM'
            } else {
              timeOfDay = 'AM'
            }
            
            return `${hour}:${v.getMinutes()}${timeOfDay} on ${v.getMonth() + 1}/${v.getDate()}/${v.getFullYear()}`
        }
    },
    // default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),

    username:{
        type: String,
        required: true,
    },
    
    reactions:[reactionSchema],
},
{
    toJSON:{
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


// 
// 
// 
// Do I need a set?
// .set(function(v){

// })

const Thought = model('thought',thoughtSchema)

module.exports = Thought;