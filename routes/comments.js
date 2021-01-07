const express = require('express');
const router = express.Router({ mergeParams: true });
const comments = require('../controllers/comments');

const Comment = require('../models/comment');
const Plant = require("../models/myPlants");

const ExpressError = require("../utils/ExpressError");
const catchAsync = require('../utils/catchAsync');

const { commentSchema } = require('../schemas.js');
const { validateComment, isLoggedIn, isCommentAuthor } = require('../middleware');



//NEW COMMENT
router.post('/', isLoggedIn, validateComment, catchAsync(comments.newComment));

//DELETE COMMENT
router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment))

module.exports = router;