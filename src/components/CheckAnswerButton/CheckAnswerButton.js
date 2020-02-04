import React from 'react';

export const CheckAnswerButton = ({theme, buttonState}) => (
  <button className={`${theme} medium-button ${buttonState}`}
    type="submit"
    disabled={buttonState === "disabled"}>
              Check
  </button>
);