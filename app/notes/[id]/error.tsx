"use client"

interface ErrProps {
  error: Error;
}

function Error({ error }: ErrProps) {
  return (
    <div>
     <p>Could not fetch note details. {error.message}</p>
      
    </div>
  );
}

export default Error;


