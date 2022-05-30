import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount(){
        fetch('/r/TwoSentenceHorror.json?limit=10')
        .then((response) => {
            console.log("in response");
            console.log(response);
            response.json()
                .then((commits) => {
                    console.log("in commits");
                    console.log(commits.data.children);
                    this.setState({ data: commits.data.children });
                });
        });
    }

    render() {
        return this.state.data.map((item, i) => (
            <div key={item.data.author + i}>
                <p>{item.data.title}</p>
                <p>{item.data.author}</p>
                <hr/>
            </div>
        ));
    }
}


export default App;
