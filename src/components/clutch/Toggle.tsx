import React, { useState } from 'react';
import { colors, radius } from './tokens';

export type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  'aria-label'?: string;
};

export default function Toggle({
  checked: checkedProp,
  defaultChecked = false,
  disabled = false,
  onChange,
  ...rest
}: ToggleProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const checked = checkedProp !== undefined ? checkedProp : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    if (checkedProp === undefined) setInternal(next);
    onChange?.(next);
  };

  const track: React.CSSProperties = {
    position: 'relative',
    width: 40,
    height: 22,
    padding: 0,
    border: 'none',
    borderRadius: radius.none, // brutalisme : carré, pas de pill
    background: checked ? colors.violet : colors.inkAlpha20,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background 140ms ease',
    flexShrink: 0,
  };

  const knob: React.CSSProperties = {
    position: 'absolute',
    top: 2,
    left: checked ? 20 : 3,
    width: 18,
    height: 18,
    background: colors.snow,
    borderRadius: radius.none,
    transition: 'left 140ms ease',
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      style={track}
      {...rest}
    >
      <span style={knob} />
    </button>
  );
}
