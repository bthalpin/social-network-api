const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');


// Endpoint: /api/thoughts
router.route('/').get(getThoughts).post(createThought)

// Single thoughts
router.route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// Reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;