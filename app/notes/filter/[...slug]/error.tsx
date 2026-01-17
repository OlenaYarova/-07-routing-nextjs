
"use client";

interface ErrorProps {
  error: Error;
}

function Error({ error }: ErrorProps) {
  return (
    <div>
     <p>Could not fetch the list of notes. {error.message}</p>
      
    </div>
  );
}

export default Error;


