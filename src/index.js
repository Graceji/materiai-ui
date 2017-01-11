import 'core-js/fn/object/assign';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppBar from './components/Main';

// class Button extends Component {
//   static contextTypes = {
//     color: React.PropTypes.string
//   }

//   render() {
//     return (
//       <button style={{background: this.context.color}}>
//         {this.props.children}
//       </button>
//     );
//   }
// }

// Button.contextTypes = {
//   color: React.PropTypes.string
// }

// class Message extends Component {
//   render() {
//     return (
//       <div>
//         {this.props.text}
//         <Button>Delete</Button>
//       </div>
//     );
//   }
// }

// class MessageList extends Component {
//   getChildContext() {
//     return {color: 'purple'}
//   }

//   render() {
//     // const color = 'purple';
//     const children = this.props.messages.map(message =>
//       <Message text={message.text} />
//     );

//     return (
//       <div>{children}</div>
//     );
//   }
// }

// MessageList.childContextTypes = {
//   color: React.PropTypes.string
// };

// const messages = [{
//   text: 'first3'
// }, {
//   text: 'second3'
// }];

// ReactDOM.render(<MessageList messages={messages} />, document.getElementById('app'));
// Render the main component into the dom
ReactDOM.render(<AppBar />, document.getElementById('app'));
