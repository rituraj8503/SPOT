import { useState } from "react";

export default function apiTest() {
  const [text, setText] = useState("");
  const submitQuery = () => {
    let data = {question: text}
    fetch(`/api/hello`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.status != 200) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (<div>
    <input type="text" value={text} className="w-96 text-black" onChange={(e) => setText(e.target.value)}></input>
    <button onClick={submitQuery} className="text-black w-96 h-96 bg-yellow-50">SUBMIT TEST</button>
  </div>);
}