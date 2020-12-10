import React from 'react';

export default props => {
  // props
  const { userData } = props;

  // condition for the component to render - this might be because of the state of user data or something else
  function shouldRender() {
    return userData;
  }

  return shouldRender() ? (
    <div>Value if the component is available.</div>
  ) : (
    <div>
      Value if the component is not available.
      {/* Normally blank but might have a step the user can take to enable,
                e.g., "you must join an organization before building a pitch" */}
    </div>
  );
};
