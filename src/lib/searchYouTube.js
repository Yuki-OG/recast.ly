import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';

$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});

var searchYouTube = (query, callback) => {

  $.get('https://youtube.googleapis.com/youtube/v3/search', {
    part: 'snippet',
    key: YOUTUBE_API_KEY,
    maxResults: 5,
    q: query,

  }).done(({items}) => {
    callback(items);
  });
};

export default searchYouTube;