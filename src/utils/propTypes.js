import PropTypes from "prop-types";

// Common PropTypes for reusability
export const commonPropTypes = {
  // Basic types
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,

  // Common data types
  text: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),

  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

  // Function types
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,

  // Boolean flags
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isRequired: PropTypes.bool,
  isVisible: PropTypes.bool,

  // Size and variant
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "success",
    "warning",
  ]),

  // Responsive props
  responsive: PropTypes.shape({
    mobile: PropTypes.object,
    tablet: PropTypes.object,
    desktop: PropTypes.object,
  }),

  // Theme-related props
  theme: PropTypes.oneOf(["light", "dark"]),
  colorScheme: PropTypes.oneOf(["blue", "red", "green", "gray", "purple"]),

  // Array of specific types
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      value: PropTypes.any,
    }),
  ),

  // Complex object shapes
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.oneOf(["admin", "user", "guest"]),
  }),

  // Error handling
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]),
};

// Common defaultProps
export const defaultProps = {
  className: "",
  style: {},
  isDisabled: false,
  isLoading: false,
  isRequired: false,
  isVisible: true,
  size: "medium",
  variant: "primary",
  theme: "light",
  colorScheme: "blue",
};

// Specific component propTypes
export const themePropTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  // onClick: PropTypes.func,
  children: PropTypes.node,
};

export const logoPropTypes = {
  ...commonPropTypes,
  src: PropTypes.string,
  alt: PropTypes.string,
  to: PropTypes.string,
};

export const buttonPropTypes = {
  ...commonPropTypes,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  icon: PropTypes.element,
  isFullWidth: PropTypes.bool,
};

export const inputPropTypes = {
  ...commonPropTypes,
  type: PropTypes.oneOf(["text", "password", "email", "number", "tel", "url"]),
  placeholder: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
};

export const selectPropTypes = {
  ...commonPropTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ),
  multiple: PropTypes.bool,
};

export const formPropTypes = {
  ...commonPropTypes,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
};

// Usage example in a component:
/*
import { buttonPropTypes, defaultProps } from './propTypes';

const Button = ({ label, onClick, variant, isDisabled }) => {
  return (
    <button className={variant} onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
};

Button.propTypes = buttonPropTypes;
Button.defaultProps = {
  ...commonDefaultProps,
  label: 'Click me',
  isDisabled: false,
};
*/
