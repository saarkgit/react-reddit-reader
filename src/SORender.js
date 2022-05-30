import {useState} from 'react';

const App = () => {
  const [retrievedData, setRetrievedData] = useState([])
  
  const runSearch = async() => {
    const searchInput = document.getElementById('searchInput').value
    const searchUrl = '/r/' + searchInput + '/new/.json?limit=10'
    const response = await fetch(searchUrl)
    const redditResponse = await response.json()
    if (redditResponse.data.children && redditResponse.data.children.length) {
      setRetrievedData(redditResponse.data.children)
    }
  }

  return (
    <>
      <section>
        <input type="text" id='searchInput' placeholder='Enter a subreddit...'></input>
        <button onClick={runSearch}>
          Get Data
        </button>
        <div>
          {
            retrievedData.map((children, index) => {
              return (
                <div key={children.data.author + index}>
                    <hr></hr>
                  <div>Kind: { children.kind }</div>
                  <div>Author: { children.data.author }</div>
                  <div>Title: { children.data.title }</div>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  );
};

export default App;