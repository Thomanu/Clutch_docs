import React from 'react';
import { colors, radius } from './tokens';

export type ProgressBarProps = {
  /** 0–100 */
  value: number;
  height?: number;
  width?: number | string;
};

export default function ProgressBar({ value, height = 4, width = '100%' }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));

  const track: React.CSSProperties = {
    width,
    height,
    background: colors.inkAlpha10,
    borderRadius: radius.none,
    overflow: 'hidden',
  };

  const fill: React.CSSProperties = {
    width: `${pct}%`,
    height,
    background: `linear-gradient(90deg, ${colors.violet}, ${colors.lime})`,
    borderRadius: radius.none,
    transition: 'width 220ms ease',
  };

  return (
    <div
      style={track}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div style={fill} />
    </div>
  );
}
