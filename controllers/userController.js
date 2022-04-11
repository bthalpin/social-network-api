const { User } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    getUsers (req,res) {
        // all users
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err))
    },
    getSingleUser (req,res) {
        // Single user by id
        User.findOne({_id: ObjectId(req.params.id)})
        .select('-__v')
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
        User.findOneAndUpdate({_id: ObjectId(req.params.id)},
            { $set: req.body },
            { new:true }
            )
            .then(data => res.json(data))
    },
    deleteUser (req,res) {
        // delete user by id
        User.findOneAndDelete({_id: ObjectId(req.params.id)})
            .then(data => res.json(`${data.username} was deleted`))
    },
    addFriend (req,res)  {
        console.log(req.params)

        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $push: { friends: req.params.friendId } },
            { new: true }
            )
            .then(friend => 
                !friend
                            ? res.status(404).json({
                                message: 'Error adding friend',
                            })
                            : res.json({ message: `${friend} Friend added`})
                    )
            .catch(err => res.status(500).json(err))
    },
    removeFriend (req,res) {
        console.log(req.params)
        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $pull: {friends:ObjectId(req.params.friendId) } },
            { new: true },
            // (err,result)=>err?console.log(err):console.log(result)
            )
            .then(friend => 
                !friend
                            ? res.status(404).json({
                                message: 'Error deleting friend',
                            })
                            : res.json({ message: `Friend removed`})
                    )
            .catch(err => res.status(500).json(err))
    }
}