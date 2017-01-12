import React, { PropTypes } from 'react';


const Subheader = (props, context) => {
  const {
    children,
    inset,
    style,
    ...other
  } = props;

  const {
    prepareStyles,
    subheader
  } = context;

  const styles = {
    root: {
      boxSizing: 'border-box',
      color: subheader.color,
      fontSize: 14,
      fontWeight: subheader.fontWeight,
      lineHeight: '48px',
      paddingLeft: inset ? 72 : 16,
      width: '100%'
    }
  };
  return (
    <div
      {...other}
      style={prepareStyles(Object.assign(styles, style))}
    >
      {children}
    </div>
  );
}

Subheader.muiName = 'Subheader';

Subheader.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  inset: PropTypes.bool
};

Subheader.defaultProps = {
  inset: false
};

Subheader.contextTypes = {
  muiName: PropTypes.object.isRequired
};

export default Subheader;
