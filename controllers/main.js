const Page = require("../models/page");
const Post = require("../models/post");
const Video = require("../models/video");

exports.get_page = (req, res, next) => {
    const page_slug = req.params.page_slug;
    if (!page_slug) {
        return res.redirect("/");
    }

    Page.find_by_slug(page_slug, (page) => {
        if (!page) {
            return res.redirect("/");
        }
        Page.find_all_headers((pages) => {
            res.render("page", {
                title: page.title,
                description: page.description,
                page: page,
                pages: pages,
                relative_path: `${page_slug}`,
                img: null,
            });
        });
    });
};

exports.get_index = (req, res, next) => {
    Post.find_all_headers((posts) => {
        Page.find_all_headers((pages) => {
            res.render("index", {
                title: "Simon Myway",
                description:
                    "Hi, and welcome! While on my way, I am happy to share some of my thoughts with you - Simon",
                posts: posts,
                pages: pages,
                relative_path: "",
                img: null,
            });
        });
    });
};

exports.get_post = (req, res, next) => {
    const post_slug = req.params.post_slug;
    if (!post_slug) {
        return res.redirect("/");
    }

    Post.find_by_slug(post_slug, (post) => {
        if (!post) {
            return res.redirect("/");
        }
        Page.find_all_headers((pages) => {
            res.render("post", {
                title: post.title,
                description: post.description,
                post: post,
                pages: pages,
                relative_path: `blog/${post_slug}`,
                img: post.img,
            });
        });
    });
};

exports.get_videos = (req, res, next) => {
    Video.find_all((videos) => {
        Page.find_all_headers((pages) => {
            return res.render("videos", {
                title: "Videos",
                description: "A collection of my videos.",
                videos: videos,
                pages: pages,
                relative_path: "videos",
                img: null,
            });
        });
    });
};
