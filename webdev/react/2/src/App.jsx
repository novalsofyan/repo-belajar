import { useState } from "react";

function Header({ name }) {
  return <h1>Belajar React Bersasma {name ? name : "Bu Guru"} 🚀</h1>;
}

function App() {
  const students = ["Nosora", "Esther", "Joy"];
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header name="Pak Guru" />
      <p>Murid: </p>
      <ul>
        {students.map((student) => (
          <li key={student}> {student} </li>
        ))}
      </ul>
      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  );
}

export default App;
