const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;


module.exports = {
    getThoughts (req,res) {
        // all users
        Thought.find()
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err))
    },
    getSingleThought (req,res) {
        // Single user by id
        Thought.findOne({_id: ObjectId(req.params.id)})
        .select('-__v')
        .then(thought => 
            !thought
                ? res.status(404).json({ message: 'No matching thought with that ID' })
                : res.json(thought)
        )
        .catch(err => res.status(500).json(err))
    },
    createThought (req,res) {
        // create new user
        Thought.create(req.body)
            .then(thoughtData => 
                !thoughtData
                    ? res.status(404).json( {message: 'Error creating thought' })
                    : User.findOneAndUpdate(
                        { _id: Object(req.body.id)},
                        { $push: {thoughts: thoughtData._id}},
                        { new: true }
                    )
                    .then(user => {
                        !user
                            ? res.status(404).json({
                                message: 'Error updating user',
                            })
                            : res.json({ message: `Thought created ${user}`})
                    })
            .catch(err => res.status(500).json(err)))
    },
    updateThought (req,res) {
        // edit user by id
        Thought.findOneAndUpdate({_id: ObjectId(req.params.id)},
            { $set: req.body },
            { new:true }
            )
            .then(data => res.json(data))
    },
    deleteThought (req,res) {
        // delete user by id
        Thought.findOneAndDelete({_id: ObjectId(req.params.id)})
            .then(data => res.json(`Thought with the message '${data.thoughtText}' was deleted`))
    },
    addReaction (req,res) {
        Thought.findOneAndUpdate(
            { _id: ObjectId(req.params.thoughtId) },
            { $push: { reactions: req.body } },
            { new: true }
            )
            .then(reaction => 
                !reaction
                            ? res.status(404).json({
                                message: 'Error adding reaction',
                            })
                            : res.json({ message: `Reaction added`})
                    )
            .catch(err => res.status(500).json(err))
    },
    deleteReaction (req,res){
        console.log(req.params.reactionId)
        Thought.findOneAndUpdate(
            { _id: ObjectId(req.params.thoughtId) },
            { $pull: {reactions:{_id: req.params.reactionId }} },
            { new: true }
            // (err,result)=>err?console.log(err):console.log(result)
            )
            .then(reaction => 
                !reaction
                            ? res.status(404).json({
                                message: 'Error deleting reaction',
                            })
                            : res.json({ message: `'${reaction}' - reaction removed`})
                    )
            .catch(err => res.status(500).json(err))
    }
}