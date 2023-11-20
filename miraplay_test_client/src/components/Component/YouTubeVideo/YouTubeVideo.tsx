import YouTube from 'react-youtube';

interface IYouTubeProps {
    videoUrl: string
}

const YouTubePlayer = ({ videoUrl }: IYouTubeProps ) => {
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);

        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = getYouTubeId(videoUrl);

    if (!videoId) {
        return <div>Invalid YouTube URL</div>;
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div>
            <YouTube videoId={videoId} opts={opts} />
        </div>
    );
};

export default YouTubePlayer;
