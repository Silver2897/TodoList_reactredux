// Redux:
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Todolistoutput from './todo';
import './App.css';
import { Input,Row,Col } from 'antd';
const { Search } = Input;

const initialState = {
  list: []
};


const ADD = 'ADD';
const DELETE = 'DELETE';

const addMessage = (list) => {  //Define an action
  return {
    type: ADD,                     //action type
    list               //output for action
  }
};

const deleteMessage = (key) => {  //Define an action  
  return {
    type: DELETE,                     //action type
    key               //output for action
  }
};

const messageReducer = (state = initialState, action) => {  //define Reducer
  let copyList = [];
  switch (action.type) {    
    case ADD:
      copyList = state.list.slice();
      console
      copyList.push(action.list);
      return {
        ...state,
        list: copyList
      };
      case DELETE:
        copyList = state.list.slice();
        copyList.splice(action.key,1)
        return {...state, list: copyList};

    default:
      return state;
  }
};

const store = createStore(messageReducer); // Define store: createStore(_Reducer_)
//------------------------------------------------------------------------------------

// React:

// Change code below this line
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    
    // Remove property 'messages' from Presentational's local state
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    // this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <Search
                placeholder="Add a New ToDo Item"
                allowClear
                enterButton="ADD"
                size="large"
                onSearch={(v) => {
                  console.log("Here")
                  if(v){
                    this.props.addMessage(v)}
                  }
                  }  
                // onChange={this.handleChange}
            />   
        {/* <input
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="Add a New ToDo Item"
          />
        <button onClick={() => this.props.addMessage(this.state.input)}>Submit</button> */}
           {/* The messages state is mapped to Presentational's props; therefore, when rendering,
               you should access the messages state through props, instead of Presentational's
               local state. */}
          {/* {this.props.list.list.map( (message, idx) => {
              return (
                <div key={idx}> 
                  <p className="title-text">{idx}-{message}</p>
                  <button onClick={() => this.props.deleteMessage(idx)}>Delete</button>
                </div>
              )
            })
          } */}
      </div>
    );
  }
};
// Change code above this line

const mapStateToProps = state => {
  return {list:{...state}};
}
//Map the dispatchers or action creators to props.
const mapDispatchToProps = {
  addMessage,
  deleteMessage
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational); // used to connect redux with react. Acts as middle ware
const Container2 = connect(mapStateToProps, mapDispatchToProps)(Todolistoutput);
class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
        <Container2/>
      </Provider>
    );
  }
};

export default AppWrapper;