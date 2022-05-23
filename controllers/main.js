const Page = require('../models/page');
const Post = require('../models/post');
const Video = require('../models/video');

const youtube_key = process.env.YOUTUBE_API_KEY;
const youtube_channel_id = process.env.YOUTUBE_CHANNEL_ID;

exports.get_page = (req, res, next) => {
    const page_slug = req.params.page_slug;
    if (!page_slug) { return res.redirect('/'); }

    Page.find_by_slug(page_slug, page => {

        if (!page) { return res.redirect('/'); }
        Page.find_all_headers(pages => {
            res.render('page', {
                title: page.title,
                page: page,
                pages: pages
            });
        });
    });
};

exports.get_index = (req, res, next) => {
    Post.find_all_headers(posts => {
        Page.find_all_headers(pages => {
            res.render('index', {
                title: "Simon Myway",
                posts: posts,
                pages: pages
            });
        });
    });
};

exports.get_post = (req, res, next) => {
    const post_slug = req.params.post_slug;
    if (!post_slug) { return res.redirect('/'); }

    Post.find_by_slug(post_slug, post => {
        if (!post) { return res.redirect('/'); }
        Page.find_all_headers(pages => {
            res.render('post', {
                title: post.title,
                post: post,
                pages: pages
            });
        });
    });
};

exports.get_videos = (req, res, next) => {
    Video.find_all(videos => {
        Page.find_all_headers(pages => {
            return res.render('videos', {
                title: 'Videos',
                videos: videos,
                pages: pages
            });
        });
    });
};

exports.get_videos_bkp = (req, res, next) => {
    fetch_videos(youtube_channel_id, youtube_key).then(response => {
        const videos = response.items.map(item => {
            return {
                title: item.snippet.title,
                description: item.snippet.description,
                date: new Date(item.snippet.publishedAt),
                thumbnail: item.snippet.thumbnails.medium.url,
                video_id: item.id.videoId
            }
        });
        console.log(JSON.stringify(videos));
        Page.find_all_headers(pages => {
            return res.render('videos', {
                title: 'Videos',
                videos: videos,
                pages: pages
            });
        });
    }).catch(err => {
        return res.redirect("/");
    });
};