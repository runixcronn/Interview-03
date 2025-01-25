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
    <div className="p-4">
      <button className="generate-btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4">
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
    <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm transition-transform duration-300">
          <span
            className={`inline-block transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 text-gray-600">
            <p>userId: {item.userId}</p>
            <p>id: {item.id}</p>
            <p>completed: {item.completed ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
