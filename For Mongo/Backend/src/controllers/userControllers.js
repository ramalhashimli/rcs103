const User = require("./../schema/userModel");

const getAllUser = async (req, res) => {
  const data = await User.find();

  res.status(200).send(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ id: id });

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send({
      status: 404,
      message: " bele bir user yoxdur",
    });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  await User.findOneAndDelete({ id: id });

  res.status(200).send("deleted");
};
module.exports = { getAllUser, getUserById, deleteUserById };
