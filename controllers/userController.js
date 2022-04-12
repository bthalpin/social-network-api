const { User,Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {

    getUsers (req,res) {
        // all users
        User.find()
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err))
    },

    getSingleUser (req,res) {
        // Single user by id
        User.findOne({_id: ObjectId(req.params.id)})
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then(user => 
                !user
                    ? res.status(404).json({ message: 'No matching user with that ID' })
                    : res.json(user)
            )
            .catch(err => res.status(500).json(err))
    },

    createUser (req,res) {
        // create new user
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err))
    },

    updateUser (req,res) {
        // edit user by id
        User.findOneAndUpdate(
            {_id: ObjectId(req.params.id)},
            { $set: req.body },
            { new:true }
            )
            .select('-__v')
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err))

    },

    deleteUser (req,res) {
        let username;
        // delete user by id
        User.findOneAndDelete({_id: ObjectId(req.params.id)})
            .then(deleted => {
                username = deleted.username
                return !deleted
                    ? res.status(404).json({ message: 'Error deleting user' })

                    // delete thoughts created by user
                    :Thought.deleteMany({username:username})})
                    .then( deleted=> 
                        !deleted
                            ? res.status(404).json({ message: 'User deleted, Error deleting associated thoughts' })

                            // delete reactions created by user
                            :Thought.updateMany(
                                {} ,
                                { $pull: {reactions:{username: username }} },
                                { new: true }
                                ))
                                .then(reaction => 
                                    !reaction
                                        ? res.status(404).json({ message: 'User and associated thoughts deleted.  Error deleting reactions' })
                                        : res.json({ message: `${username} was deleted`})
                                        )
            .catch(err => res.status(500).json(err))

    },

    addFriend (req,res)  {

        // Add user id to friends array
        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $push: { friends: req.params.friendId } },
            { new: true }
            )
            .then(friend => 
                !friend
                    ? res.status(404).json({ message: 'Error adding friend' })
                    : res.json({ message: `Friend added`})
                    )
            .catch(err => res.status(500).json(err))
    },


    removeFriend (req,res) {
        
        // Remove userId from friend array
        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $pull: {friends:ObjectId(req.params.friendId) } },
            { new: true },
            )
            .then(friend => 
                !friend
                    ? res.status(404).json({ message: 'Error deleting friend' })
                    : res.json({ message: `Friend removed`})
                    )
            .catch(err => res.status(500).json(err))
    }
}