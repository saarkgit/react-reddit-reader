import React from 'react';

function Thread(props) {
  // const [openStatus, setOpenStatus] = useState(true);

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

// function handleClick(data) {
//   if (data.length > 0) {
//     data.forEach(element => {
//       element.setOpenStatus({ status: false });
//     });
//   }
// }

class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      externalData: [
        
      ],
      status: false
    };

    let count = 0;
    const status = false;
    this.props.data.forEach((element) => {
      if (!this.state.externalData.some(
        (post) => this.checkIfExisting(post, element.title)
      )) {
        this.state.externalData.push(this.createPost(element, count, status))
        count++;
      }
    })

    // this.handleClick = this.handleClick.bind(this);
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



  // handleClick() {
  //   this.state.externalData.forEach(element => {
  //     element.setOpenStatus(false);
  //   });
  // }

  handlePostClick(index) {
    let arr = [...this.state.externalData];
    // let newElem = JSON.parse(JSON.stringify(arr[index]));
    let newElem = this.createPost(arr[index].props.post, index, !arr[index].props.status)
    // newElem.props.status = !newElem.props.status;
    arr[index] = newElem;
    this.setState({ externalData: arr });
    // this.setState({externalData[index]: 0}); //[index][0]: externalData[index][0]

  }

  checkIfExisting(post, value) {
    return post["key"] === value;
  }

  render() {
    return (
      <div>
        <h1>using local json file</h1>
        {/* <button onClick={this.handleClick}>Open All</button> */}
        <div>
          {this.state.externalData}
        </div>
      </div>
    );
  }
}

export default AllPosts;