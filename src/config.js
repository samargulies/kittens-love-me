
const youtubeApiKey = 'AIzaSyAlBbdkOK-rWk-ibc0xXgrgHYy7lGzV-k0';
const youtubeSearchRequest = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&videoCategoryId=15&order=date&q=kattungar%7Cgatinhos%7Ckocięta%7Cgattini%7Ckittens%7Cchatons%7Cкотята%7Cgatitos%7C子猫&type=video&videoDuration=short&videoEmbeddable=true&videoSyndicated=true&key=${youtubeApiKey}`;

export default {
  youtubeSearchRequest,
};
