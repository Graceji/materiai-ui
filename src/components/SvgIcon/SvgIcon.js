import React, {Component, PropTypes} form 'react';
import transitions from '../styles/transitions';

class SvgIcon extends Component {
  static muiName = 'SvgIcon';

  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    style: PropTypes.object,
    viewBox: PropTypes.string
  };

  static defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    viewBox: '0 0 24 24'
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  state = {
    hovered: false
  };

  handleMouseEnter(e) {
    this.setState({hovered: true});
    this.props.onMouseEnter(e);
  }

  handleMouseLeave(e) {
    this.setState({hovered: false});
    this.props.onMouseLeave(e);
  }

  render() {
    const {
      children,
      color,
      hoverColor,
      onMouseLeave,
      onMouseEnter,
      style,
      viewBox,
      ...other
    } = this.props;

    const {
      svgIcon,
      prepareStyles
    } = this.context.muiTheme;

    const mergedStyles = Object.assign({
      display: 'inline-block',
      color: svgIcon.color,
      fill: this.state.hovered ? onColor : offColor,
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: transitions.easeOut()
    }, style);

    return (
      <svg
        {...other},
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={prepareStyles(mergedStyles)}
      >
        {children}
      </svg>
    );
  }
}

export default SvgIcon;