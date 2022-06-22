const fs = require("fs");
const path = require("path");
var async = require("async");

const Page = require("../models/page");
const Post = require("../models/post");

exports.get_sitemap = (req, res, next) => {
    Post.find_all_headers((posts) => {
        Page.find_all_headers((pages) => {
            async.each(
                pages,
                (page, cb) => {
                    const page_path = path.join(
                        path.dirname(require.main.filename),
                        page.content_file
                    );
                    fs.stat(page_path, (error, stats) => {
                        if (error) {
                            page.lastmod = new Date().toISOString();
                        } else {
                            page.lastmod = stats.mtime.toISOString();
                        }
                        cb();
                    });
                },
                (error) => {
                    async.each(
                        posts,
                        (post, cb) => {
                            const post_path = path.join(
                                path.dirname(require.main.filename),
                                "content",
                                "posts",
                                post.slug + ".md"
                            );
                            fs.stat(post_path, (error, stats) => {
                                if (error) {
                                    post.lastmod = new Date().toISOString();
                                } else {
                                    post.lastmod = stats.mtime.toISOString();
                                }
                                cb();
                            });
                        },
                        (error) => {
                            res.type("text/xml");
                            res.render("sitemap", {
                                posts: posts,
                                pages: pages,
                            });
                        }
                    );
                }
            );
        });
    });
};

exports.get_rss = (req, res) => {
    Post.find_all_headers((posts) => {
        async.each(
            posts,
            (post, cb) => {
                const post_path = path.join(
                    path.dirname(require.main.filename),
                    "content",
                    "posts",
                    post.slug + ".md"
                );
                Post.find_by_slug(post.slug, (post_content) => {
                    post.content = post_content.content;
                    post.description = post_content.description;
                    post.img = post_content.img;
                    post.date = post_content.date.toISOString();
                    fs.stat(post_path, (error, stats) => {
                        if (error) {
                            post.lastmod = new Date().toISOString();
                        } else {
                            post.lastmod = stats.mtime.toISOString();
                        }
                        cb();
                    });
                });
            },
            (error) => {
                res.type("text/xml");
                res.render("rss", {
                    posts: posts,
                    updated: new Date().toISOString(),
                });
            }
        );
    });
};
