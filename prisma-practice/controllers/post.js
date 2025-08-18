import {
  createPosts,
  deleteByPostId,
  getAllPosts,
  getByPostId,
  updateByPostId,
} from "../service/post.js";
import message from "../utils/message.js";

export async function createPost(req, res) {
  try {
    const { userId, title, description } = req.body;

    const newPost = await createPosts(userId, title, description);

    return res.status(200).json({success:true, newPost, message: message.SUCCESS.DATA_CREATED });

  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR });
  }
}

export async function updatePostById(req, res) {
  try {
    const { id } = req.params;

    const { userId, title, description } = req.body;

    const findId = await getByPostId(id)

    if(!findId) throw new Error(message.ERROR.NOT_FOUND)

    await updateByPostId(id, userId, title, description);

    return res.status(200).json({success:true, message: message.SUCCESS.DATA_UPDATED });

  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR, error:error.message });
  }
}

export async function getAllPost(req, res) {
  try {

    const {search, description, offset, limit } = req.query

    const page = Number(offset) || 1
    const pageSize = Number(limit) || 5

    const skip = (page - 1) * pageSize
    const take = pageSize

    const filter = {}

    if(search){
        filter.title = {
            title: search,
            mode: "insensitive"
        }
    }

    if(description){
        filter.description = {
            description: description,
            mode: "insensitive"
        }
    }


    const allPost = await getAllPosts(filter ,skip , take);

    return res
      .status(200)
      .json({ allPost, message: message.SUCCESS.DATA_FETCHED });
  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR });
  }
}

export async function getPostById(req, res) {
  try {
    const { id } = req.params;

    const post = await getByPostId(id);

    if (!post) throw new Error(message.ERROR.NOT_FOUND );

    return res
      .status(200)
      .json({ post, message: message.SUCCESS.DATA_FETCHED });
  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR, error:error.message });
  }
}

export async function deletePostById(req, res) {
  try {
    const { id } = req.params;

    const findId = await getByPostId(id)

    if(!findId) throw new Error(message.ERROR.NOT_FOUND)

    await deleteByPostId(id);

    return res.status(200).json({success:true, message: message.SUCCESS.DATA_DELETED });
  } catch (error) {
    res.status(500).json({ message: message.ERROR.SERVER_ERROR, error:error.message });
  }
}
