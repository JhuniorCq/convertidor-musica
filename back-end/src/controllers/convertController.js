const fs = require('fs');
const ytdl = require('ytdl-core'); 
const path = require('path');

const convertMusic = async (req, res) => {
    try {
        const { url } = req.body;
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
        const videoPath = path.join(__dirname, '..', '..', '..', 'front-end', 'public', 'music', `${title}.mp4` );

        console.log('El titulo es: ', title);

        if(fs.existsSync(videoPath)) {
            return res.json({ success: true, titulo: `${title}.mp4` });
        }

        const videoStream = ytdl(url, { filter: 'audioonly' });
        videoStream.pipe(fs.createWriteStream(videoPath));

        videoStream.on('end', () => {
            res.json({ success: true, titulo: `${title}.mp4` });
        });

    } catch(err) {
        console.error('', err);
        res.status(500).json({ success: false, message: 'Error al obtener la información del video' });
    }
}

module.exports = {
    convertMusic
}

//CONVERSIÓN A MP3 EXITOSO