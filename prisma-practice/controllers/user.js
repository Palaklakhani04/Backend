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
import { userSchema } from "../middlewares/validation.js";

export async function createUser(req, res) {
  try {

    const {error} = userSchema.validate(req.body)
    if(error) return res.status(400).json({ message : error.details[0].message})

    const { name, email, password } = req.body;

    const userEmail = await checkEmail(email);
    if (userEmail) throw new Error( message.ERROR.EMAIL_EXISTS );

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
    const {error} = userSchema.validate(req.body)
    if(error) return res.status(400).json({ message : error.details[0].message})

    const { id } = req.params;
    const { name, email, password } = req.body;
    
    const user = await findById(id)
    if(!user) throw new Error( message.ERROR.NOT_FOUND )

    await updatedById(id, name, email, password);
    return res.status(200).json({success:true, message: message.SUCCESS.DATA_UPDATED });

  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR , error: error.message});
  }
}

export async function getAllUsers(req, res) {
  try {
    const { search, limit, offset, email } = req.query

    const page = Number(offset) || 1
    const pageSize = Number(limit) || 5

    const skip = (page - 1) * pageSize
    const take = pageSize

    const filter = {}

    if(search) {
        filter.name = {
            contains: search,
            mode: 'insensitive'
        }
    }

    if(email) {
        filter.email = {
            contains: email,
            mode: 'insensitive'
        }
    }

    const allUsers = await getAllUser(filter, skip, take);

    return res
      .status(200)
      .json({ allUsers, message: message.SUCCESS.DATA_FETCHED });

  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await getByUserId(id);

    if(!user) throw new Error( message.ERROR.NOT_FOUND )
    
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
    
    await deleteByUserId(id);

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
