import message from "../utils/message.js";
import {
  checkEmail,
  createUsers,
  deleteByUserId,
  findById,
  getAllUser,
  getByUserId,
  getUserByEmailEndsWith,
  updatedById,
} from "../service/user.js";

export async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const findEmail = await checkEmail(email);

    if (findEmail) throw new Error( message.ERROR.EMAIL_EXISTS );

    const newUser = await createUsers(name, email, password);

    return res
      .status(200)
      .json({ success:true, newUser, message: message.SUCCESS.DATA_CREATED });
  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR , error:error.message});
  }
}

export async function updateById(req, res) {
  try {
    const { id } = req.params;

    const findId = await findById(id)

    if(!findId) throw new Error( message.ERROR.NOT_FOUND )

    const { name, email, password } = req.body;

    const updatedUser = await updatedById(id, name, email, password);

    return res.status(200).json({success:true, message: message.SUCCESS.DATA_UPDATED });

  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR , error: error.message});
  }
}

export async function getAllUsers(req, res) {
  try {
    const allUser = await getAllUser();

    return res
      .status(200)
      .json({ allUser, message: message.SUCCESS.DATA_FETCHED });

  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const findId = await findById(id)

    if(!findId) throw new Error( message.ERROR.NOT_FOUND )

    const user = await getByUserId(id);

    return res
      .status(200)
      .json({ user, success:true, message: message.SUCCESS.DATA_FETCHED });

  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR, error: error.message });
  }
}

export async function deleteUserById(req, res) {
  try {
    const { id } = req.params;

    const findId = await findById(id)

    if(!findId) throw new Error( message.ERROR.NOT_FOUND )
    
    const deleteUser = await deleteByUserId(id);

    return res.status(200).json({success:true,  message: message.SUCCESS.DATA_DELETED });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: message.ERROR.SERVER_ERROR , error: error.message});
  }
}

export async function getUsersByEmailEndsWiths(req, res) {
  try {
    const user = await getUserByEmailEndsWith();

    res.status(200).json({ user, success:true, message: message.SUCCESS.DATA_FETCHED });

  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR });
  }
}
