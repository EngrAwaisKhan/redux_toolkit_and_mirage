import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([{}]);
  useEffect(() => {
    setInterval(() => {
      fetch('/api/books')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBooks(data);
        });
    }, 2000);
  }, []);

  const addBookHandler = () => {
    const title = prompt('Enter Book Title');
    const author = prompt('Enter Book Author');
    // console.log(title, author);

    if (!title || !author) return false;
    try {
      fetch('/api/add', {
        method: 'POST',
        body: JSON.stringify({ title, author }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log('Error', error);
    }
  };
  if (!books.length) return <h2>Loading...</h2>;
  return (
    <div className="App">
      <h2>Available Books</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {books.map((bookObj, ind) => {
            return (
              <tr key={ind}>
                <td>{bookObj.title}</td>
                <td>{bookObj.author}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={addBookHandler}>Add Book</button>
      <h5>created by: Muhammad Awais Khan</h5>
    </div>
  );
}

export default App;
