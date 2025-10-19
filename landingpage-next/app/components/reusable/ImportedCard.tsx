'use client';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ImportedCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  showButton?: boolean; // optional: display "Learn More" button
  compact?: boolean;    // optional: reduce spacing for compact display
}

const ImportedCard: React.FC<ImportedCardProps> = ({
  icon,
  title,
  description,
  showButton = true,
  compact = false,
}) => {
  return (
    <StyledWrapper compact={compact}>
      <div className="card">
        <div className="iconContainer">{icon}</div>
        <p className="heading">{title}</p>
        <p className="description">{description}</p>
        {showButton && !compact && (
          <div className="buttonContainer">
            <button className="acceptButton">Learn More</button>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'compact'
})<{ compact?: boolean }>`
  .card {
    width: 100%;
    max-width: 300px; /* maximum size on large screens */
    min-width: 200px; /* minimum size on smaller screens */
    height: ${({ compact }) => (compact ? '200px' : '240px')};
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${({ compact }) => (compact ? 'center' : 'space-between')};
    padding: ${({ compact }) => (compact ? '15px 20px' : '20px 25px')};
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    flex-shrink: 0; /* important for preventing shrinking in a flex/grid container */
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.15);
  }

  .iconContainer {
    font-size: 2rem;
    color: #7b57ff;
    margin-bottom: ${({ compact }) => (compact ? '6px' : '10px')};
  }

  .heading {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1a1a1a;
    text-align: center;
    margin: ${({ compact }) => (compact ? '2px 0' : '6px 0 0')};
  }

  .description {
    text-align: center;
    font-size: 0.85rem;
    color: #555;
    margin-top: ${({ compact }) => (compact ? '2px' : '5px')};
  }

  .buttonContainer {
    margin-top: 15px;
  }

  .acceptButton {
    background-color: #7b57ff;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .acceptButton:hover {
    background-color: #9173ff;
  }
`;

export default ImportedCard;
