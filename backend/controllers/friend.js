const Friend = require("../models/Friend");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllFriends = async (req, res) => {
  const friends = await Friend.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ friends, count: friends.length });
};

const getFriend = async (req, res) => {
  const {
    user: { userId },
    params: { id: friendId },
  } = req;
  const friend = await Friend.findOne({ _id: friendId, createdBy: userId });

  if (!friend) {
    throw new NotFoundError(`No friend with id ${friendId}`);
  }
  res.status(StatusCodes.OK).json({ friend });
};

const createFriend = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const friend = await Friend.create(req.body);
  res.status(StatusCodes.CREATED).json({ friend });
};

const deleteFriend = async (req, res) => {
  const {
    user: { userId },
    params: { id: friendId },
  } = req;
  const friend = await Friend.findOneAndRemove({
    _id: friendId,
    createdBy: userId,
  });

  if (!friend) {
    throw new NotFoundError(`No friend with id ${friendId}`);
  }
  res.status(StatusCodes.OK).send();
};

const updateFriend = async (req, res) => {
  const {
    body: { name, image, balance },
    user: { userId },
    params: { id: friendId },
  } = req;

  if (name === " " || image === " ") {
    throw new BadRequestError("Name or image field cannot be empty");
  }
  const friend = await Friend.findByIdAndUpdate(
    { _id: friendId, createdBy: userId },
    { name, image, balance },
    { new: true, runValidators: true }
  );
  if (!friend) {
    throw new NotFoundError(`No friend with id ${friendId}`);
  }
  res.status(StatusCodes.OK).json({ friend });
};

module.exports = {
  getAllFriends,
  getFriend,
  createFriend,
  deleteFriend,
  updateFriend,
};
