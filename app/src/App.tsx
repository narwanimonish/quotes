import React, { useEffect, useState } from 'react';
import Quote from './components/Quote';
import axios from 'axios';

const QUOTE_URL =
  'https://ibmy4e3i76.execute-api.us-east-1.amazonaws.com/quote';

function App() {
  const [quote, setQuote] = useState<string[]>([]);

  useEffect(() => {
    axios.get(QUOTE_URL).then((response) => {
      const quoteItem = response.data.quote;
      setQuote(quoteItem.split('--'));
    });
  }, []);
  return (
    <div className="continer">
      <Quote quote={quote}></Quote>
    </div>
  );
}

export default App;
