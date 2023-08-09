import React, { useState } from 'react';
import axios from 'axios';

const NumberList = () => {
  const [numbers, setNumbers] = useState([]);

  const fetchNumbers = async () => {
    const urls = [
      'http://20.244.56.144/numbers/primes',
      'http://20.244.56.144/numbers/fibo',
      'http://20.244.56.144/numbers/odd',
    ];

    const promises = urls.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers;
      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
        return [];
      }
    });

    const results = await Promise.all(promises);
    const mergedNumbers = Array.from(new Set(results.flat())).sort((a, b) => a - b);
    setNumbers(mergedNumbers);
  };
 return (
    <div>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberList;
