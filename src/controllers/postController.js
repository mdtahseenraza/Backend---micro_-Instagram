const Post = require('../models/Post');
const User = require('../models/User');
const sequelize = require('../config/database');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['name', 'mobileNumber'] }]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { userId, title, description, images } = req.body;
    
    const post = await Post.create({
      userId,
      title,
      description,
      images
    }, { transaction: t });

    await User.increment('postCount', {
      by: 1,
      where: { id: userId },
      transaction: t
    });

    await t.commit();
    res.status(201).json(post);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, images } = req.body;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.update({ title, description, images });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    
    if (!post) {
      await t.rollback();
      return res.status(404).json({ error: 'Post not found' });
    }

    await User.decrement('postCount', {
      by: 1,
      where: { id: post.userId },
      transaction: t
    });

    await post.destroy({ transaction: t });
    await t.commit();
    
    res.status(204).send();
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};
