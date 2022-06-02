import React from 'react';

function Thread(props) {
  let date = new Date(props.post.data.created * 1000).toLocaleString('en-GB');
  //a TRUE status indicates that the content will be shown
  if (props.status) {
    return (
      <button className='threadButton' onClick={props.onClick}>
        <p style={{fontSize: 18}}>Title: {props.post.data.title}</p>
        <p>User: {props.post.data.author}</p>
        <p>Time Posted: {date}</p>
        <p>Content:</p>
        <p className='content'>{props.post.data.selftext}</p>
      </button>
    );
  }

  return (
    <button className='threadButton' onClick={props.onClick}>
      <p style={{fontSize: 18}}>Title: {props.post.data.title}</p>
      <p>User: {props.post.data.author}</p>
      <p>Time Posted: {date}</p>
    </button>
  );
}

class PulledThreads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allThreads: [],
      threadVisible: false
    };

    this.createThread = this.createThread.bind(this);

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleThreadClick = this.handleThreadClick.bind(this);
    this.getSubreddit = this.getSubreddit.bind(this);
  }

  getSubreddit() {
    const searchInput = document.getElementById('searchInput').value;
    let indexCount = 0;
    let responseData;
    let tempAllThreads = [];

    fetch(`/r/${searchInput}.json?limit=10`)
      .then((response) => {
        if (response.status === 200) {
          response.json()
          .then((recievedData) => {

            responseData = recievedData.data.children;

            responseData.forEach((thread) => {
              // only add unique threads
              if (!this.state.allThreads.some(
                (post) => this.checkIfExisting(post, thread.data.title + thread.data.created)
              )) {
                // adding non-mod/stickied threads
                if (thread.data.distinguished === null && thread.data.stickied === false) {
                  tempAllThreads.push(this.createThread(thread, indexCount, this.state.threadVisible))
                  indexCount++;
                }
              }
            })

            this.setState({ allThreads: tempAllThreads });
          });
        } else 
          alert('Please enter a valid subreddit');
        
      }).catch(err => {
        alert('Please enter a valid subreddit');
        console.log(err);
      });
  }

  createThread(element, index, status) {
    return (
      <Thread
        key={element.data.title + element.data.created}
        post={element}
        status={status}
        onClick={() => this.handleThreadClick(index)}
      />
    )
  }

  handleButtonClick(bool) {
    let count = 0;
    let newThreadArr = [...this.state.allThreads];
    newThreadArr.forEach(thread => {
      let newThread = this.createThread(thread.props.post, count, bool)
      newThreadArr[count] = newThread;
      count++;
    });

    this.setState({ allThreads: newThreadArr });
  }

  handleThreadClick(index) {
    let newThreadArr = [...this.state.allThreads];
    let newElem = this.createThread(newThreadArr[index].props.post, index, !newThreadArr[index].props.status)
    newThreadArr[index] = newElem;
    this.setState({ allThreads: newThreadArr });
  }

  checkIfExisting(post, value) {
    return post["key"] === value;
  }

  render() {
    return (
      <body>
        <h1>Grabbing Data from Reddit</h1>
        <div className='buttons'>
          <input type="text" size={30} id='searchInput' placeholder='Enter a text-based subreddit...'></input>
          <button onClick={this.getSubreddit}>Get Subreddit</button>
          <button onClick={() => this.handleButtonClick(true)}>Open All</button>
          <button onClick={() => this.handleButtonClick(false)}>Close All</button>
        </div>
        <div className='threads'>
          {this.state.allThreads}
        </div>
      </body>
    );
  }
}

export default PulledThreads;