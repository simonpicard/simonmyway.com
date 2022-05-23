const express = require('express');

const main_controller = require('../controllers/main');

const router = express.Router();

router.get("/blog/:post_slug", main_controller.get_post);

router.get("/blog", main_controller.get_index);

router.get("/videos", main_controller.get_videos);

router.get("/:page_slug", main_controller.get_page);

router.use("/", main_controller.get_index);


module.exports = router;