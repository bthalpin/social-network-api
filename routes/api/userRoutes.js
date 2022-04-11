const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');


// Endpoint: /api/users
router.route('/').get(getUsers).post(createUser)

// Single user
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// Friends
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;