import React from 'react';
import { useState } from 'react';
function Post(props) {
  const [openStatus, setStatus] = useState(true);

  if (openStatus) {
    return (
      // <button onClick={() => setStatus(!props.post.isOpen) props.handleClick}>
      
      <button onClick={() => setStatus(!openStatus)}>
        <p>Title: {props.post.title}</p>
        <p>User: {props.post.user}</p>
        <p>Time: {props.post.time}</p>
        <p>Content: {props.post.content}</p>
        <hr />
      </button>
    );
  }

  return (
    // <button onClick={props.handleClick}>
      <button onClick={() => setStatus(!openStatus)}>
      <p>Title: {props.post.title}</p>
      <p>User: {props.post.user}</p>
      <p>Time: {props.post.time}</p>
      <hr />
    </button>
  );
}

class AllPosts extends React.Component {
  renderPost(element) {
    return (
      <Post
        key={element.title}
        post={element}
        onClick={() => this.props.onClick(element)}
      />
    )
  }

  checkIfExisting(post, key, value) {
    return post[key] === value;
  }

  render() {
    // might have dupes
    this.props.data.forEach((element) => {
      if (!this.props.threads.some(
        (post) => this.checkIfExisting(post, "key", element.title)
      )) {
        this.props.threads.push(this.renderPost(element))
      }
    })
    return (
      <div>
        {this.props.threads}
      </div>
    )
  }
}

class NewReddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      externalData: [],
    };
  }

  handleClose() {

  }

  handleClick(i) {
    this.setState({
      // threads[i]: 
    });
  }

  render() {
    // const isOpen = { isOpen: true };
    // let dataPlus = Object.assign(this.props.data, isOpen);
    // dataPlus.forEach(element => { Object.assign(element, isOpen) });

    return (
      <div className="game">
        <h1>using local json file</h1>
        <div className="game-board">
          <AllPosts
            data={this.props.data}
            onClick={i => this.handleClick(i)}
            threads={this.state.externalData}
          />
        </div>
        <button onClick={this.handleClose}>Close All</button>
      </div>
    );
  }
}

export default NewReddit;