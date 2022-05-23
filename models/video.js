const fs = require('fs');
const path = require('path');
const axios = require('axios');


const ONE_DAY = 24 * 60 * 60 * 1000; /* ms */

const videos_path = path.join(
    path.dirname(require.main.filename),
    'content',
    'videos.json'
);

const get_videos_from_ytapi = (cb) => {
    const options = {
        method: 'GET',
        url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&channelId=${process.env.YOUTUBE_CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}&order=viewCount&type=video`
    };
    axios(options).then((result) => {
        const videos = result.data.items.map(item => {
            return {
                title: item.snippet.title,
                description: item.snippet.description,
                date: new Date(item.snippet.publishedAt),
                thumbnail: item.snippet.thumbnails.medium.url,
                video_id: item.id.videoId
            }
        });
        cb(videos);
    }).catch((error) => {
        cb([]);
    });
}


const get_videos_from_file = cb => {
    fs.readFile(videos_path, (err, file_content) => {
        if (err) {
            Video.refresh_all((res => {
                if (res) {
                    get_videos_from_file(cb)
                }
                else {
                    cb({ dt: Date.now(), data: [] });
                }
            }));
        } else {
            cb(JSON.parse(file_content));
        }
    });
};


class Video {
    constructor(title, description, date, thumbnail, video_id) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.thumbnail = thumbnail;
        this.video_id = video_id;
    }

    static refresh_all(cb) {
        get_videos_from_ytapi(videos_data => {
            const videos = { dt: Date.now(), data: videos_data };
            fs.writeFile(videos_path, JSON.stringify(videos), (err) => {
                if (err) {
                    cb(false);
                }
                else { cb(true); }
            });
        });
    }

    static find_all(cb) {
        get_videos_from_file(videos => {
            const last_update = videos.dt;
            if (Date.now() - last_update >= ONE_DAY) {
                Video.refresh_all((res => {
                    if (res) {
                        Video.find_all(cb)
                    }
                }));
            }
            videos.data.forEach(video => { video.date = new Date(video.date) });
            cb(videos.data);

        });
    }
};

module.exports = Video;