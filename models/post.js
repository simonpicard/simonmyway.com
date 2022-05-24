const fs = require('fs');
const path = require('path');
const md = require('markdown-it')({
    html: true,
});
const jsdom = require("jsdom");


const posts_dir = path.join(
    path.dirname(require.main.filename),
    'content',
    'posts'
);

const posts_path = path.join(
    posts_dir,
    'posts.json'
);


const get_posts_from_file = cb => {
    fs.readFile(posts_path, (err, file_content) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(file_content));
        }
    });
};

module.exports = class Post {
    constructor(title, slug, content) {
        this.title = title;
        this.slug = slug;
        this.date = date;
        this.content = content;
    }

    static find_by_slug(slug, cb) {
        get_posts_from_file(posts => {
            const post = posts.find(p => p.slug === slug);
            const post_path = path.join(posts_dir, slug) + ".md";
            fs.readFile(post_path, 'utf8', (err, file_content) => {
                if (err) {
                    cb(false);
                } else {
                    post.date = new Date(post.date);
                    post.content = md.render(file_content);
                    const doc = new jsdom.JSDOM(post.content);
                    post.description = doc.window.document.querySelector("p").textContent;
                    cb(post);
                }
            });
        });
    }

    static find_all_headers(cb) {
        get_posts_from_file(posts => {
            cb(posts);
        });
    }
};