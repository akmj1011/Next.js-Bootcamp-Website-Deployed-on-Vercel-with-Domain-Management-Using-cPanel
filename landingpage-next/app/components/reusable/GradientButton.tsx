'use client';

import React from 'react';
import styled from 'styled-components';

interface GradientButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ label, onClick, className }) => {
  return (
    <Wrapper
      onClick={onClick}
      className={className}
      type="button"
      aria-label={label}
    >
      <Visual>{label}</Visual>
    </Wrapper>
  );
};

export default GradientButton;

/* ===== Styling =====
   - Wrapper is the real clickable element and never moves or resizes.
   - Visual is purely decorative and animates on hover. It uses pointer-events:none so
     the visual transform cannot remove the hit area under the cursor.
   - z-index/high pointer settings reduce chance of invisible overlays stealing pointer.
*/
const Wrapper = styled.button`
  display: inline-block;
  position: relative;
  border: none;
  background: transparent;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  z-index: 60;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  width: auto;

  &.w-full {
    width: 100%; /* full width wrapper */
  }

  &:hover,
  &:focus {
    cursor: pointer;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.12);
    border-radius: 6px;
  }
`;

const Visual = styled.span`
  display: inline-block;
  pointer-events: none;
  padding: 0.7em 2em;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  color: #000;
  background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.9) 100%);
  border-radius: 6px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.12);
  transition:
    background 240ms ease,
    color 240ms ease,
    box-shadow 240ms ease;
  width: auto;

  /* stretch visual if wrapper has w-full */
  ${Wrapper}.w-full & {
    display: block;
    width: 100%;
    text-align: center;
  }

  ${Wrapper}:hover &,
  ${Wrapper}:focus & {
    background-image: linear-gradient(90deg, #a855f7 0%, #ec4899 100%);
    color: #fff;
    box-shadow: 0px 14px 30px rgba(168, 85, 247, 0.30);
  }
`;
