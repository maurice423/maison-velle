import React from 'react';

export function Button(props) {
  const {
    variant = 'primary',
    size = 'default',
    loading = false,
    icon,
    iconRight,
    children,
    className = '',
    ...rest
  } = props;

  const classes = [
    'mv-btn',
    `mv-btn--${variant}`,
    `mv-btn--${size}`,
    loading ? 'mv-btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={rest.disabled || loading} {...rest}>
      {loading && <span className="mv-btn__loader" aria-hidden="true" />}
      {icon && <span className="mv-btn__icon" aria-hidden="true">{icon}</span>}
      <span className="mv-btn__label">{children}</span>
      {iconRight && <span className="mv-btn__icon mv-btn__icon--right" aria-hidden="true">{iconRight}</span>}
    </button>
  );
}
