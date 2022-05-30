import React from 'react';

function Thread(props) {
  console.log("in thread");
  console.log(props);
  if (props.status) {
    return (
      <button onClick={props.onClick}>
        <p>Title: {props.post.data.title}</p>
        <p>User: {props.post.data.author}</p>
        <p>Time: {props.post.data.created}</p>
        <p>Content: {props.post.data.selftext}</p>
      </button>
    );
  }

  return (
    <button onClick={props.onClick}>
      <p>Title: {props.post.data.title}</p>
      <p>User: {props.post.data.author}</p>
      <p>Time: {props.post.data.created}</p>
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

    // let count = 0;
    // const status = false;
    // const dataArray = this.props.data;
    // let allPostsArr = [];

    // dataArray.forEach((element) => {
    //   if (!this.state.allPosts.some(
    //     (post) => this.checkIfExisting(post, element.title)
    //   )) {
    //     this.state.allPosts.push(this.createPost(element, count, status))
    //     allPostsArr.push(this.createPost(element, count, status))
    //     count++;
    //   }
    // })

    // this.setState({allPosts: allPostsArr});

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    let count = 0;
    const status = false;
    let dataArray;
    let allPostsArr = [];

    fetch('/r/TwoSentenceHorror.json?limit=10')
      .then((response) => {
        console.log("in response");
        console.log(response);
        response.json()
          .then((commits) => {
            console.log("in commits");
            console.log(commits.data.children);
            dataArray = commits.data.children;

            dataArray.forEach((element) => {
              if (!this.state.allPosts.some(
                (post) => this.checkIfExisting(post, element.data.title) //item.data.title
              )) {
                this.state.allPosts.push(this.createPost(element, count, status))
                allPostsArr.push(this.createPost(element, count, status))
                count++;
              }
            })

            this.setState({ allPosts: allPostsArr });
          });
      }).catch(err => {
        console.log(err);
      });
  }

  createPost(element, index, status) {
    return (
      <Thread
        key={element.data.title}
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
        <h1>using twosentencehorro.json link</h1>
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