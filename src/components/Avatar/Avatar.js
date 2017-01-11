import React, { Component, PropTypes } from 'react';

getStyles(props, context) {
  const {
    backgroundColor,
    color,
    size
  } = props;

  const {avatar} = context.muiTheme;

  const styles = {
    root: {
      color: color || avatar.color,
      backgroundColor: backgroundColor || avatar.backgroundColor,
      userSelect: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size / 2,
      borderRadius: '50%',
      height: size,
      width: size
    },
    icon: {
      color: color || avatar.color,
      width: size * 0.6,
      height: size * 0.6,
      fontSize: size * 0.6,
      margin: size * 0.2
    }
  };

  return styles;
}

class Avatar extends Component {
  static muiName = 'Avatar';
  
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  static propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.element,
    size: PropTypes.number,
    src: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    size: 40
  };


  render() {
    const {
      backgroundColor,
      icon,
      className,
      color,
      style,
      src,
      ...other
    } = this.props;
    
    const styles = getStyles(this.props, this.context);
    const {preparseStyles} = this.context.muiTheme;

    if (src) {
      return (
        <img
          style={preparseStyles(Object.assign(styles.root, style))}
          src={src}
          className={className}
          {...other}
        />
      );
    } else {
      return (
        <div
          {...other}
          style={preparseStyles(Object.assign(styles.root, style))}
          className={className}
        >
          {icon && React.cloneElement(icon, {
            color: styles.icon.color,
            style: Object.assign(styles.icon, icon.props.style)
          })}
          {this.props.children}
        </div>
      );
    }
  }
}

export default Avatar;