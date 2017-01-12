import React, { Component, PropTypes } from 'react';
import {fade} from '../utils/colorManipulator';
import IconButton from '../IconButton';
import OpenIcon from '../svg-icons/navigation/expand-less';
import CloseIcon from '../svg-icons/navigation/expand-more';

function getStyles(props, context, state) {
  const {
    insetChildren,
    leftAvatar,
    leftCheckbox,
    leftIcon,
    nestedLevel,
    rightAvatar,
    rightIcon,
    rightIconButton,
    rightToggle,
    secondaryText,
    secondaryTextLines,
  } = props;

  const {muiTheme} = context;
  const {listItem} = muiTheme;

  const textColor = muiTheme.baseTheme.palette.textColor;
  const hoverColor = props.hoverColor || fade(textColor, 0.1);
  const singleAvatar = !secondaryText && (leftAvatar || rightAvatar);
  const singleNoAvatar = !secondaryText && !(leftAvatar || rightAvatar);
  const twoLine = secondaryText && secondaryTextLines === 1;
  const threeLine = secondaryText && secondaryTextLines > 1;

  const styles = {
    root: {
      backgroundColor: (state.isKeyboardFocused || state.hovered) &&
      !state.rightIconButtonHovered &&
      !state.rightIconButtonKeyboardFocused ? hoverColor : null,
      color: textColor,
      display: 'block',
      fontSize: 16,
      lineHeight: '16px',
      position: 'relative',
      transition: transitions.easeOut(),
    },

    // This inner div is needed so that ripples will span the entire container
    innerDiv: {
      marginLeft: nestedLevel * listItem.nestedLevelDepth,
      paddingLeft: leftIcon || leftAvatar || leftCheckbox || insetChildren ? 72 : 16,
      paddingRight: rightIcon || rightAvatar || rightIconButton ? 56 : rightToggle ? 72 : 16,
      paddingBottom: singleAvatar ? 20 : 16,
      paddingTop: singleNoAvatar || threeLine ? 16 : 20,
      position: 'relative',
    },

    icons: {
      height: 24,
      width: 24,
      display: 'block',
      position: 'absolute',
      top: twoLine ? 12 : singleAvatar ? 4 : 0,
      margin: 12,
    },

    leftIcon: {
      left: 4,
    },

    rightIcon: {
      right: 4,
    },

    avatars: {
      position: 'absolute',
      top: singleAvatar ? 8 : 16,
    },

    label: {
      cursor: 'pointer',
    },

    leftAvatar: {
      left: 16,
    },

    rightAvatar: {
      right: 16,
    },

    leftCheckbox: {
      position: 'absolute',
      display: 'block',
      width: 24,
      top: twoLine ? 24 : singleAvatar ? 16 : 12,
      left: 16,
    },

    primaryText: {
    },

    rightIconButton: {
      position: 'absolute',
      display: 'block',
      top: twoLine ? 12 : singleAvatar ? 4 : 0,
      right: 4,
    },

    rightToggle: {
      position: 'absolute',
      display: 'block',
      width: 54,
      top: twoLine ? 25 : singleAvatar ? 17 : 13,
      right: 8,
    },

    secondaryText: {
      fontSize: 14,
      lineHeight: threeLine ? '18px' : '16px',
      height: threeLine ? 36 : 16,
      margin: 0,
      marginTop: 4,
      color: listItem.secondaryTextColor,

      // needed for 2 and 3 line ellipsis
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: threeLine ? null : 'nowrap',
      display: threeLine ? '-webkit-box' : null,
      WebkitLineClamp: threeLine ? 2 : null,
      WebkitBoxOrient: threeLine ? 'vertical' : null,
    },
  };

  return styles;
}

class ListItem extends Component {
  static muiName = 'listItem';

  static propTypes = {
    autoGenerateNestedIndicator: PropTypes.bool,
    children: PropTypes.node,
    disableKeyboardFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    hoverColor: PropTypes.string,
    initiallyOpen: PropTypes.bool,
    innerDivStyle: PropTypes.object,
    insetChildren: PropTypes.bool,
    leftAvatar: PropTypes.element,
    leftCheckbox: PropTypes.element,
    leftIcon: PropTypes.element,
    nestedItems: PropTypes.arrayOf(PropTypes.element),
    nestedLevel: PropTypes.number,
    nestedListStyle: PropTypes.object,
    onKeyborardFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onNestedListToggle: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: propTypes.func,
    onTouchTap: PropTypes.func,
    open: PropTypes.bool,
    primaryText: PropTypes.node,
    primaryTogglesNestedList: PropTypes.bool,
    rightAvatar: PropTypes.element,
    rightIcon: PropTypes.element,
    rightIconButton: PropTypes.element,
    rightToggle: PropTypes.element,
    secondaryText: PropTypes.node,
    secondaryTextLines: PropTypes.oneOf([1,2]),
    style: PropTypes.object
  };

  static defaultProps = {
    autoGenerateNestedIndicator: true,
    disableKeyboardFocus: false,
    disabled: false,
    initiallyOpen: false,
    insetChildren: false,
    nestedItems: [],
    nestedLevel: 0,
    onKeyborardFocus: () => {},
    onMouseLeave: () => {},
    onMouseEnter: () => {},
    onNestedListToggle: () => {},
    onTouchStart: () => {},
    onTouchEnd: () => {},
    open: null,
    primaryTogglesNestedList: false,
    secondaryTextLines: 1
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  state = {
    hovered: false,
    isKeyborardFocused: false,
    open: false,
    rightIconButtonHovered: false,
    rightIconButtonKeyborardFocused: false,
    touch: false
  }

  pushElement(children, element, baseStyles, additionalProps) {
    if (element) {
      const styles = Object.assign({}, baseStyles, element.props.style);
      children.push(
        React.cloneElement(element, {
          key: children.length,
          style: styles,
          ...additionalProps
        })
      );
    }
  }

  render() {
    const {
      autoGenerateNestedIndicator,
      children,
      disabled,
      disableKeyboardFocus,
      hoverColor, // eslint-disable-line no-unused-vars
      initiallyOpen, // eslint-disable-line no-unused-vars
      innerDivStyle,
      insetChildren, // eslint-disable-line no-unused-vars
      leftAvatar,
      leftCheckbox,
      leftIcon,
      nestedItems,
      nestedLevel,
      nestedListStyle,
      onKeyboardFocus, // eslint-disable-line no-unused-vars
      onMouseEnter, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      onNestedListToggle, // eslint-disable-line no-unused-vars
      onTouchStart, // eslint-disable-line no-unused-vars
      onTouchTap,
      rightAvatar,
      rightIcon,
      rightIconButton,
      rightToggle,
      primaryText,
      primaryTogglesNestedList,
      secondaryText,
      secondaryTextLines, // eslint-disable-line no-unused-vars
      style,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const contentChildren = [children];

    if (leftIcon) {
      const additionalProps = {
        color: leftIcon.props.color || this.context.muiTheme.listItem.leftIconColor
      };

      this.pushElement(
        contentChildren,
        leftIcon,
        Object.assign({}, styles.icons, styles.leftIcon),
        additionalProps
      );
    }

    if (rightIcon) {
      const additionalProps = {
        color: rightIcon.props.color || this.context.muiTheme.listItem.rightIconColor
      };
      this.pushElement(
        contentChildren,
        rightIcon,
        Object.assign({}, styles.icons, style.rightIcon),
        additionalProps
      );
    }

    if (rightAvatar) {
      this.pushElement(
        contentChildren,
        rightAvatar,
        Object.assign({}, styles.avatars, styles.rightAvatar)
      );
    }

    if (leftAvatar) {
      this.pushElement(
        contentChildren,
        leftAvatar,
        Object.assign({}, styles.avatars, styles.leftAvatar)
      );
    }

    if (leftCheckbox) {
      this.pushElement(
        contentChildren,
        leftCheckbox,
        Object.assign({}, styles.leftCheckbox)
      );
    }

    const hasNestListItems = nestedItems.length;
    const hasRightElement = rightAvatar || rightIcon || rightIconButton || rightToggle;
    const needsNestedIndicator = hasNestListItems && autoGenerateNestedIndicator && !hasRightElement;

    if (rightIconButton || needsNestedIndicator) {
      let rightIconButtonElement = rightIconButton;
      const rightIconButtonHandlers = {
        onKeyboardFocus: this.handleRightIconButtonKeyboardFocus,
        onMouseEnter: this.handleRightIconButtonMouseEnter,
        onMouseLeave: this.handleRightIconButtonMouseLeave,
        onTouchTap: this.handleRightIconButtonTouchTap,
        onMouseDown: this.handleRightIconButtonMouseUp,
        onMouseUp: this.handleRightIconButtonMouseUp
      };

      if (needsNestedIndicator) {
        rightIconButtonElement = this.state.open ?
          <IconButton><OpenIcon /></IconButton> :
          <IconButton><CloseIcon /></IconButton>;
        rightIconButtonHandlers.onTouchTap = this.handleNestedListToggle;
      }

      this.pushElement(
        contentChildren,
        rightIconButtonElement,
        Object.assign({}, styles.rightIconButton),
        rightIconButtonHandlers
      );
    }


  }
}