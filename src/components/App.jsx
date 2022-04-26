import Search from './Search.js';
import VideoPlayer from './VideoPlayer.js';
import VideoList from './VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {exampleVideoData, currentVideo: exampleVideoData[0]};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const title = event.target.innerText;
    let newVideo = this.state.currentVideo;
    for (let video of this.state.exampleVideoData) {
      if (video.snippet.title === title) {
        newVideo = video;
        break;
      }
    }
    this.setState({exampleVideoData: this.state.exampleVideoData, currentVideo: newVideo});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            {/* <div><h5><em>search</em> view goes here</h5></div> */}
            <Search />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {/* <div><h5><em>videoPlayer</em> view goes here</h5></div> */}
            <VideoPlayer video={this.state.currentVideo}/>
          </div>
          <div className="col-md-5">
            {/* <div><h5><em>videoList</em> view goes here</h5></div> */}
            <VideoList clickHandler={this.handleClick} videos={this.state.exampleVideoData} />
          </div>
        </div>
      </div>
    );
  }
}


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
