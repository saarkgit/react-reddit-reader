import React from 'react';

function Thread(props) {
  if (props.status) {
    return (
      <button onClick={props.onClick}>
        <p>Title: {props.post.title}</p>
        <p>User: {props.post.user}</p>
        <p>Time: {props.post.time}</p>
        <p>Content: {props.post.content}</p>
      </button>
    );
  }

  return (
    <button onClick={props.onClick}>
      <p>Title: {props.post.title}</p>
      <p>User: {props.post.user}</p>
      <p>Time: {props.post.time}</p>
    </button>
  );
}

class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      status: false
    };

    let count = 0;
    const status = false;
    const dataArray = this.props.data;
    let allPostsArr = [];

    dataArray.forEach((element) => {
      if (!this.state.allPosts.some(
        (post) => this.checkIfExisting(post, element.title)
      )) {
        this.state.allPosts.push(this.createPost(element, count, status))
        allPostsArr.push(this.createPost(element, count, status))
        count++;
      }
    })

    this.setState({allPosts: allPostsArr});

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  createPost(element, index, status) {
    return (
      <Thread
        key={element.title}
        post={element}
        status={status}
        onClick={() => this.handlePostClick(index)}
      />
    )
  }

  handleButtonClick(bool) {
    let count = 0;
    let arr = [...this.state.allPosts];
    arr.forEach(element => {
      let newElem = this.createPost(element.props.post, count, bool)      
      arr[count] = newElem;
      count++;
    });
    
    this.setState({ allPosts: arr });
  }

  handlePostClick(index) {
    let arr = [...this.state.allPosts];
    let newElem = this.createPost(arr[index].props.post, index, !arr[index].props.status)
    arr[index] = newElem;
    this.setState({ allPosts: arr });
  }

  checkIfExisting(post, value) {
    return post["key"] === value;
  }

  render() {
    return (
      <div>
        <h1>using local json file</h1>
        <button onClick={() => this.handleButtonClick(true)}>Open All</button>
        <button onClick={() => this.handleButtonClick(false)}>Close All</button>
        <div>
          {this.state.allPosts}
        </div>
      </div>
    );
  }
}

export default AllPosts;