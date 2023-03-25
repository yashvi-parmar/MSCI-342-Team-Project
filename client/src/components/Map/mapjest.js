
import React from 'react';

function Button() {
    const [open, setOpen] = React.useState(false);

  
    const handleClickOpen = () => {
      setOpen(true);
    };
  return (
    <button onClick={handleClickOpen}>
      GO
    </button>
  );
}

export default Button;