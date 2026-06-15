import React from 'react';
import { colors, font, fontWeight, radius, shadow } from './tokens';

export type StepperProps = {
  /** 1-based : étape courante */
  currentStep: number;
  steps: string[];
};

export default function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: font.sans }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {steps.map((label, i) => {
          const n = i + 1;
          const done = n < currentStep;
          const active = n === currentStep;
          const filled = done || active;

          const stepBox: React.CSSProperties = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: radius.none,
            background: filled ? colors.lime : colors.inkAlpha04,
            border: `1px solid ${filled ? colors.lime : colors.inkAlpha10}`,
            boxShadow: active ? shadow.glowViolet : 'none',
            fontFamily: font.sans,
            fontWeight: fontWeight.bold,
            fontSize: 16,
            color: filled ? colors.ink : colors.inkAlpha60,
          };

          const connector: React.CSSProperties = {
            width: 48,
            height: 2,
            flexShrink: 0,
            background: done ? colors.lime : colors.inkAlpha10,
          };

          return (
            <React.Fragment key={label}>
              <div style={stepBox}>{n}</div>
              {i < steps.length - 1 && <div style={connector} />}
            </React.Fragment>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {steps.map((label, i) => (
          <React.Fragment key={label}>
            <div
              style={{
                width: 36,
                textAlign: 'center',
                fontFamily: font.sans,
                fontWeight: fontWeight.bold,
                fontSize: 9,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: i + 1 <= currentStep ? colors.ink : colors.inkAlpha40,
              }}
            >
              {label}
            </div>
            {i < steps.length - 1 && <div style={{ width: 48 }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
