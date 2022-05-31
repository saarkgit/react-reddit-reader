import React from 'react';

function Thread(props) {
  let date = new Date(props.post.data.created * 1000).toLocaleString('en-GB');
  if (props.status) {
    return (
      <button onClick={props.onClick}>
        <p>Title: {props.post.data.title}</p>
        <p>User: {props.post.data.author}</p>
        <p>Time: {date}</p>
        <p>Content: {props.post.data.selftext}</p>
      </button>
    );
  }

  return (
    <button onClick={props.onClick}>
      <p>Title: {props.post.data.title}</p>
      <p>User: {props.post.data.author}</p>
      <p>Time: {date}</p>
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

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleThreadClick = this.handleThreadClick.bind(this);
    this.createThread = this.createThread.bind(this);
    this.getSubreddit = this.getSubreddit.bind(this);
  }

  getSubreddit() {
    const searchInput = document.getElementById('searchInput').value;
    let indexCount = 0;
    let responseData;
    let tempAllThreads = [];

    fetch(`/r/${searchInput}.json?limit=10`)
      .then((response) => {
        response.json()
          .then((recievedData) => {
            responseData = recievedData.data.children;

            responseData.forEach((thread) => {
              if (!this.state.allThreads.some(
                (post) => this.checkIfExisting(post, thread.data.title)
              )) {
                this.state.allThreads.push(this.createThread(thread, indexCount, this.state.threadVisible))
                tempAllThreads.push(this.createThread(thread, indexCount, this.state.threadVisible))
                indexCount++;
              }
            })

            this.setState({ allThreads: tempAllThreads });
          });
      }).catch(err => {
        console.log(err);
      });
  }

  createThread(element, index, status) {
    return (
      <Thread
        key={element.data.title}
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
      <div>
        <h1>Grabbing Data from Reddit</h1>
        <input type="text" size={30} id='searchInput' placeholder='Enter a text-based subreddit...'></input>
        <button onClick={this.getSubreddit}>Get Subreddit</button>
        <button onClick={() => this.handleButtonClick(true)}>Open All</button>
        <button onClick={() => this.handleButtonClick(false)}>Close All</button>
        <div>{this.state.allThreads}</div>
      </div>
    );
  }
}

export default PulledThreads;