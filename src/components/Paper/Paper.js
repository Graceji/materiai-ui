import React, { Component } from 'react';

// function getStyles(props, context) {
//   return {

//   };
// }

class Paper extends Component {
  render() {
    const { children } = this.props;
    // const styles = getStyles(this.props, this.context);

    return (
      <div>
        {children}
      </div>
    );
  }
}

export default Paper;