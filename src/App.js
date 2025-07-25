import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [tapeTitle, setTapeTitle] = useState("");
  const [vhsList, setVhsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedList = localStorage.getItem("vhsList");
    if (savedList) setVhsList(JSON.parse(savedList));
  }, []);

  useEffect(() => {
    localStorage.setItem("vhsList", JSON.stringify(vhsList));
  }, [vhsList]);

  const addTape = () => {
    if (tapeTitle.trim() !== "") {
      setVhsList([...vhsList, tapeTitle.trim()]);
      setTapeTitle("");
    }
  };

  const deleteTape = (index) => {
    const newList = [...vhsList];
    newList.splice(index, 1);
    setVhsList(newList);
  };

  const filteredList = vhsList.filter((tape) =>
    tape.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📼 VHS Tracker</h1>
      <input
        type="text"
        placeholder="Enter VHS title..."
        value={tapeTitle}
        onChange={(e) => setTapeTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTape()}
      />
      <button onClick={addTape}>➕ Add to List</button>

      <input
        type="text"
        placeholder="Search your list..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredList.map((tape, index) => (
          <li key={index}>
            <a
              href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(tape)}+vhs`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tape}
            </a>
            <button onClick={() => deleteTape(index)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;