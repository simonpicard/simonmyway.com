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
