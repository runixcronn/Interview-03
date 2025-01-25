import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  return <GenerateList />;
}

const GenerateList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handleGenerateActivity = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        // Rastgele bir todo seçelim
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setItems((prevItems) => [...prevItems, response.data[randomIndex]]);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    const generateButton = document.querySelector(".generate-btn");
    if (generateButton) {
      generateButton.addEventListener("click", handleGenerateActivity);
    }

    return () => {
      if (generateButton) {
        generateButton.removeEventListener("click", handleGenerateActivity);
      }
    };
  }, []);

  return (
    <div className="list-container">
      <button
        className="generate-btn"
        style={{
          padding: "8px 16px",
          margin: "10px",
          borderRadius: "4px",
        }}
      >
        Generate Activity
      </button>
      {items.map((item, index) => (
        <ExpandableListItem key={index} item={item} />
      ))}
    </div>
  );
};

const ExpandableListItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        margin: "10px",
        padding: "10px",
        borderRadius: "4px",
      }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>{item.title}</h3>
        <button
          style={{
            padding: "4px 12px",
            borderRadius: "4px",
          }}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>
      {isExpanded && (
        <div style={{ marginTop: "10px" }}>
          <p>userId: {item.userId}</p>
          <p>id: {item.id}</p>
          <p>completed: {item.completed ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default App;
