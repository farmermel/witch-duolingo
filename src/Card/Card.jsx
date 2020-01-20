import React from 'react';

export const Card = ({prompt, children, currentText, handleSubmit, buttonState}) => (
    <>
      <h4>{prompt}</h4>
        <article className="lesson-card">
            <div>{currentText}</div>
            <form onSubmit={handleSubmit}>
            {children}
            <button className={`medium-button ${buttonState.className}`}
                type="submit"
                disabled={buttonState.disabled}>
          Check
        </button>
      </form>
      </article>
    </>
     
)