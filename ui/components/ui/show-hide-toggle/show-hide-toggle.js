import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IconEye from '../icon/icon-eye';
import IconEyeSlash from '../icon/icon-eye-slash';

const ShowHideToggle = ({
  id,
  shown,
  onChange,
  ariaLabelHidden,
  ariaLabelShown,
  className,
  'data-testid': dataTestId,
  disabled,
  title
}) => (
  <div className={classnames('show-hide-toggle', className)}>
    <input
      className="show-hide-toggle__input"
      id={id}
      type="checkbox"
      checked={shown}
      onChange={onChange}
      data-testid={dataTestId}
      disabled={disabled}
    />
    <label htmlFor={id} className="show-hide-toggle__label" title={title}>
      {shown ? 
        <IconEye ariaLabel={ariaLabelShown} className="show-hide-toggle__icon" /> : 
        <IconEyeSlash ariaLabel={ariaLabelHidden} className="show-hide-toggle__icon" />}
    </label>
  </div>
);

ShowHideToggle.propTypes = {
  id: PropTypes.string.isRequired,
  shown: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  ariaLabelHidden: PropTypes.string.isRequired,
  ariaLabelShown: PropTypes.string.isRequired,
  className: PropTypes.string,
  'data-testid': PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string
};

export default ShowHideToggle;
