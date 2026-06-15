import React, { useState } from 'react';
import { colors, font, fontWeight, radius } from './tokens';

export type InputType = 'text' | 'search' | 'dropdown' | 'password';

export type InputProps = {
  type?: InputType;
  label?: string;
  placeholder?: string;
  value?: string;
  supportingText?: string;
  error?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
  width?: number | string;
  onChange?: (value: string) => void;
  onClear?: () => void;
};

/* Glyphes 18×18 intégrés (sérialisables pour MDX) */
function LeadingGlyph({ type }: { type: InputType }) {
  if (type !== 'search') return null;
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function TrailingGlyph({ type }: { type: InputType }) {
  switch (type) {
    case 'dropdown':
      return (
        <svg width={18} height={18} viewBox="0 0 18 18" aria-hidden="true">
          <path d="M4 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case 'password':
      return (
        <svg width={18} height={18} viewBox="0 0 18 18" aria-hidden="true">
          <path d="M1 9s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="9" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    default:
      // ✕ clear pour text / search
      return (
        <svg width={18} height={18} viewBox="0 0 18 18" aria-hidden="true">
          <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

export default function Input({
  type = 'text',
  label,
  placeholder,
  value: valueProp,
  supportingText,
  error = false,
  disabled = false,
  showLabel = true,
  showLeadingIcon,
  showTrailingIcon = true,
  width = 210,
  onChange,
  onClear,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [hover, setHover] = useState(false);
  const [internal, setInternal] = useState(valueProp ?? '');
  const value = valueProp !== undefined ? valueProp : internal;
  const filled = value.length > 0;

  const leading = (showLeadingIcon ?? type === 'search') && type === 'search';
  const hasTrailing = showTrailingIcon;

  /* Bordure selon l'état (priorité : disabled > error > focus > hover > filled/default) */
  let border = `1px solid ${colors.inkAlpha20}`;
  let accent = colors.inkAlpha60; // couleur du label flottant
  if (error) {
    border = `1px solid ${colors.error}`;
    accent = colors.error;
  } else if (focused) {
    border = `2px solid ${colors.lime}`; // focus ring lime
    accent = colors.ink;
  } else if (hover && !disabled) {
    border = `1px solid ${colors.inkAlpha40}`;
  }

  const wrap: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width,
    opacity: disabled ? 0.5 : 1,
    fontFamily: font.sans,
  };

  const field: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    height: 48,
    padding: '4px 8px 4px 16px',
    background: colors.surface,
    border,
    borderRadius: radius.none,
    boxSizing: 'border-box',
  };

  const labelChip: React.CSSProperties = {
    position: 'absolute',
    top: -10,
    left: 12,
    padding: '0 4px',
    background: colors.surface,
    fontFamily: font.sans,
    fontSize: 12,
    lineHeight: '12px',
    color: error ? colors.error : focused ? colors.ink : colors.inkAlpha60,
  };

  const input: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: font.sans,
    fontWeight: fontWeight.regular,
    fontSize: 16,
    lineHeight: '22px',
    color: filled ? colors.ink : colors.inkAlpha60,
  };

  const iconWrap: React.CSSProperties = { display: 'inline-flex', color: colors.inkAlpha60, flexShrink: 0 };
  const clearBtn: React.CSSProperties = {
    ...iconWrap,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    color: colors.inkAlpha60,
  };

  const showClear = (type === 'text' || type === 'search') && filled && hasTrailing;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (valueProp === undefined) setInternal(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    if (valueProp === undefined) setInternal('');
    onClear?.();
    onChange?.('');
  };

  return (
    <div style={wrap}>
      <div
        style={field}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {showLabel && label && <span style={labelChip}>{label}</span>}
        {leading && (
          <span style={iconWrap}>
            <LeadingGlyph type={type} />
          </span>
        )}
        <input
          style={input}
          type={type === 'password' ? 'password' : type === 'search' ? 'search' : 'text'}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {showClear ? (
          <button type="button" style={clearBtn} aria-label="Effacer" onClick={handleClear}>
            <TrailingGlyph type="text" />
          </button>
        ) : (
          hasTrailing &&
          (type === 'dropdown' || type === 'password') && (
            <span style={iconWrap}>
              <TrailingGlyph type={type} />
            </span>
          )
        )}
      </div>
      {supportingText && (
        <span
          style={{
            padding: '4px 16px 0',
            fontFamily: font.sans,
            fontSize: 12,
            lineHeight: '22px',
            color: error ? colors.error : colors.inkAlpha60,
          }}
        >
          {supportingText}
        </span>
      )}
    </div>
  );
}
