import React, { useState } from "react";
import data from "./data";
import SingleQuestion from "./Question";
function App() {
  const [questions, setQuestions] = useState(data);
  return (
    <main>
      <div className="container">
        <h3>Questions and answers about Login</h3>
        <section className="info">
          {questions.map((obj, index) => {
            return <SingleQuestion key={obj.id} {...obj} />;
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
