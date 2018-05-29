import React, { Component } from "react";
import "./App.css";

// let helloword = "Welcome to React";
// const list = [
//   {
//     title: "React",
//     url: "https://facebook.github.io/react/",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0
//   },
//   {
//     title: "Redux",
//     url: "https://github.com/reactjs/redux",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1
//   }
// ];
const user = {
  firsname: "Tom",
  lastname: "Jack"
};
const { firsname, lastname } = user;
console.log(firsname + "" + lastname);
const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

const users = ["Robin", "Andrew", "Dan"];
const [userOne, userTwo, userThree] = users;
console.log(userOne, userThree, userTwo);
// ES6
// function isSearched(searchTerm) {
//   return function(item) {
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   };
// }
// // // ES6
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: { hits: [] },
      searchTerm: DEFAULT_QUERY
    };
    this.onDismiss = this.onDismiss.bind(this);
    // this.onClickMe = this.onClickMe.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }
  setSearchTopStories(result) {
    this.setState({ result });
  }
  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.result.hits.filter(isNotId);
    this.setState({ result: { hits: updatedList } });
  }
  // onClickMe() {
  //   console.log(this);
  // }
  onClickMe = () => {
    console.log(this);
  };
  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  render() {
    const { searchTerm, result } = this.state;
    // console.log(result);
    // console.log(result.hits);
    if (!result) {
      return null;
    }

    return (
      <div className="App">
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          onClickMe={this.onClickMe}
        />
        <Search
          searchTerm={searchTerm}
          value={searchTerm}
          onChange={this.onSearchChange}
        />
        <Button />
      </div>
    );
  }
}
class Table extends Component {
  render() {
    const { list, onDismiss, onClickMe, pattern } = this.props;

    return (
      <div>
        {list.filter(isSearched(pattern)).map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button onClick={() => onDismiss(item.objectID)} type="button">
                Dismiss
              </button>
            </span>
            <p onClick={onClickMe}>点我</p>
          </div>
        ))}
      </div>
    );
  }
}
// class Search extends Component {
//   render() {
//     const {value, onChange ,children} = this.props;
//     return (
//       <form>
//         {children}
//         <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         />
//       </form>
//     );
//   }
// }
const Search = ({ value, onChange, children }) => (
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>
);
// class Button extends Component {
//   render() {
//     const {
//       onClick,
//       className,
//       children,
//     } = this.props;
//     return (

//     );
//   }
// }
const Button = ({ onClick, className, children }) => (
  <button onClick={onClick} className={className} type="button">
    按钮
    {children}
  </button>
);
export default App;
