import Search from './Search.js';
import VideoPlayer from './VideoPlayer.js';
import VideoList from './VideoList.js';
// import exampleVideoData from '../data/exampleVideoData.js';
import searchYouTube from '../lib/searchYouTube.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {videoData: null, currentVideo: null, autoplay: true};
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    // make searchyoutube
    // dont resolve constructor unstil searchyoutube is done
  }

  componentDidMount() {
    searchYouTube('cute%20cat%20video', (videos) => {
      const newData = [];
      for (const video of videos) {
        newData.push(video);
      }
      this.setState({videoData: newData, currentVideo: newData[0]});
    });
  }

  // loadData() {

  // }

  handleTitleClick(event) {
    const title = event.target.innerText;
    // reference!
    let newVideo = this.state.currentVideo;
    for (let video of this.state.videoData) {
      if (video.snippet.title === title) {
        this.setState({videoData: this.state.videoData, currentVideo: video});
        break;
      }
    }
  }

  handleSearch(event) {
    let query = document.getElementsByClassName('form-control')[0].value.trim();
    query = query.split(' ').join('%20');
    if (this.state.autoplay) {
      query += '&autoplay=1';
    }
    searchYouTube(query, (videos) => {
      let videoData = [];
      for (let video of videos) {
        videoData.push(video);
      }
      this.setState({videoData: videoData, currentVideo: videoData[0]});
    });
  }

  render() {
    if (!this.state.videoData) {
      return <div />;
    }
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            {/* <div><h5><em>search</em> view goes here</h5></div> */}
            <Search searchHandler={this.handleSearch}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {/* <div><h5><em>videoPlayer</em> view goes here</h5></div> */}
            <VideoPlayer video={this.state.currentVideo}/>
          </div>
          <div className="col-md-5">
            {/* <div><h5><em>videoList</em> view goes here</h5></div> */}
            <VideoList clickHandler={this.handleTitleClick} videos={this.state.videoData} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
