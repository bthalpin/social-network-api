const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');


// Endpoint: /api/users
router.route('/').get(getUsers).post(createUser)


// Add friend post and delete
router.route('/:userId/friends/:friendId')
    .post()
    .delete()

router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;