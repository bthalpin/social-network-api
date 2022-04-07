const { Schema,model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },

    createdAt:{
        type: Date,
        default: Date.now,
        get(v){
            return // formatted date
        }
    },

    username:{
        type: String,
        required: true,
    },
    
    reactions:[reactionSchema],
})

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