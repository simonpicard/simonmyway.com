const fs = require("fs");
const path = require("path");
const md = require("markdown-it")({
    html: true,
}).use(require("markdown-it-decorate"));

const pages_dir = path.join(
    path.dirname(require.main.filename),
    "content",
    "pages"
);

const pages_path = path.join(pages_dir, "pages.json");

const get_pages_from_file = (cb) => {
    fs.readFile(pages_path, (err, file_content) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(file_content));
        }
    });
};

module.exports = class Page {
    constructor(title, slug, content) {
        this.title = title;
        this.slug = slug;
        this.content = content;
    }

    static find_by_slug(slug, cb) {
        get_pages_from_file((pages) => {
            const page = pages.find((p) => p.slug === slug);
            const page_path = path.join(pages_dir, slug) + ".md";
            fs.readFile(page_path, "utf8", (err, file_content) => {
                if (err) {
                    cb(false);
                } else {
                    page.content = md.render(file_content);
                    cb(page);
                }
            });
        });
    }

    static find_all_headers(cb) {
        get_pages_from_file((pages) => {
            cb(pages);
        });
    }
};
