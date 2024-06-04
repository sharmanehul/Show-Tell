const router = require("express").Router();
const Category = require("../models/Category");

// router.post("/", async (req, res) => {
//   const newCat = new Category(req.body.name);
//   try {
//     const savedCat = await newCat.save();
//     res.status(200).json(savedCat);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post("/", async (req, res) => {
  const newPost = new Post({
    ...req.body,
    categories: [req.body.categoryId], // Ensure the category ID is added to the post
  });

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", async (req, res) => {
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/:categoryId", async (req, res) => {
    try {
      const posts = await Post.find({ categories: req.params.categoryId });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

