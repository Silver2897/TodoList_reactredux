// Redux:
const ADD = 'ADD';  //Declare action type as variable

const addMessage = (message) => {   // Define a new action
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => { // define a reducer
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};



const store = Redux.createStore(messageReducer); // Create a store

// React:

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {  
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const Provider = ReactRedux.Provider; //Provider: A redux component to render react componets

class AppWrapper extends React.Component {
  // Render the Provider below this line
render(){
  return(
<Provider store={store}>    {/*Pass store in provider to access the store and redux*/}
  <DisplayMessages />
</Provider>
  )
  
}

  // Change code above this line
};