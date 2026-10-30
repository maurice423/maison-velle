import React from 'react';

export function Input(props) {
  const { id, label, error, hint, className = '', ...rest } = props;
  return (
    <div className={`mv-field ${className}`}>
      {label != null && (
        <label className="mv-field__label" htmlFor={id}>
          {label}
          {props.required ? <span className="mv-field__required" aria-hidden="true">*</span> : null}
        </label>
      )}
      <input
        id={id}
        className={`mv-field__control ${error ? 'mv-field__control--error' : ''}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...rest}
      />
      {error && (
        <p className="mv-field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mv-field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function Toggle(props) {
  const { id, label, children, ...rest } = props;
  return (
    <label className="mv-toggle" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        className="mv-toggle__control"
        {...rest}
      />
      <span className="mv-toggle__track" aria-hidden="true" />
      <span className="mv-toggle__label">{label}</span>
      {children}
    </label>
  );
}
