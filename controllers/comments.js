const Comment = require('../models/comment');
const Plant = require("../models/myPlants");

module.exports.newComment = async (req, res) => {
    const plant = await Plant.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    plant.comments.push(comment);
    await comment.save();
    await plant.save();
    req.flash('success', 'Your comment has successfully been posted!')
    res.redirect(`/plants/${plant._id}`);

}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    await Plant.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Your comment has successfully been deleted!')
    res.redirect(`/plants/${id}`)
}