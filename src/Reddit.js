import React from 'react';
import Data from './exData.json';

const isOpen = { isOpen: true };
let dataPlus = Object.assign(Data, isOpen);
dataPlus.forEach(element => { Object.assign(element, isOpen) });

class Reddit extends React.Component {
  render() {
    return (
      <div className="Reddit">
        <h1>using local json file</h1>
        <AllPosts data={dataPlus} />
      </div>
    )
  };
}

class AllPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: "banana",
      // posts: []
    }

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.data.forEach((ele) => {
      ele.isOpen = !ele.isOpen;
    })
    this.setState({ a: "apple" })
  }

  checkIfExisting(post, key, value) {
    return post[key] === value;
  }

  render() {
    const posts = [];
    this.props.data.forEach((element) => {
      if (!posts.some(
        (post) => this.checkIfExisting(post, "key", element.title)
      )) {
        let createdPost =
          <Post
            key={element.title}
            post={element}
          // parentState={this.state.openAll}
          // parentData={this.props.data}
          />;
        posts.push(createdPost);
      }
    });

    return (
      <div>
        {posts}
        <button onClick={this.handleClose}>Toggle All</button>
      </div>
    )

  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openStatus: this.props.post.isOpen
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.post.isOpen = !this.props.post.isOpen;
    this.setState({ openStatus: this.props.post.isOpen })
    // console.log(this.state.openStatus);
  }

  componentWillReceiveProps() {
    // this.setState({openStatus: !this.props.parentState})
    this.setState({ openStatus: this.props.post.isOpen })
  }
  // static getDerivedStateFromProps() {
  //   this.setState({openStatus: false})
  // }

  render() {
    const post = this.props.post;

    let buttonRender = null;
    if (this.state.openStatus) {
      buttonRender = (
        <button onClick={this.handleClick}>
          <p>Title: {post.title}</p>
          <p>User: {post.user}</p>
          <p>Time: {post.time}</p>
          <p>Content: {post.content}</p>
          <hr />
        </button>
      )
    } else {
      buttonRender = (
        <button onClick={this.handleClick}>
          <p>Title: {post.title}</p>
          <p>User: {post.user}</p>
          <p>Time: {post.time}</p>
          <hr />
        </button>
      )
    }

    return (buttonRender)
  }
}

export default Reddit;