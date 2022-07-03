import React, { useEffect, useState } from 'react';
import Quote from './components/Quote';
import { quotes } from './quotes/quotes';

function App() {
  const [quote, setQuote] = useState<string[]>([]);

  const randomIndex = () => Math.floor(Math.random() * (quotes.length - 1));

  useEffect(() => {
    setQuote(quotes[randomIndex()].split('--'));
  }, []);
  return (
    <div className="continer">
      <Quote quote={quote}></Quote>
    </div>
  );
}

export default App;
