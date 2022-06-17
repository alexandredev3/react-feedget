import React from 'react';
import ReactDOM from 'react-dom/client';

function Example() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>
);
