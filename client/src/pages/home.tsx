import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TriviaContext } from "../contexts/TriviaContext";
import Categories from "../data/categories.json";
import brainLeft from "../assets/images/home/brain-left.svg"
import brainRight from "../assets/images/home/brain-right.svg"

const Home: React.FC = () => {
  const triviaContext = useContext(TriviaContext)!;
  const { updateTriviaParams, triviaParams } = triviaContext;

  const [category, setCategory] = useState(triviaParams.category);
  const [categoryName, setCategoryName] = useState(triviaParams.categoryName);
  const [difficulty, setDifficulty] = useState(triviaParams.difficulty);

  const navigate = useNavigate();



  const handleStartQuiz = () => {
    updateTriviaParams?.({ category, categoryName, difficulty });
    navigate("/quiz");
  };

  return (
    <>
      <h1 className="text-center text-primary text-3xl md:text-6xl py-10">Quiz Night</h1>
      <form>
        <label>
        <h3 className="text-center mb-4 text-primary">Choose category:</h3>
        <select
  className="block mx-auto mb-10"
  value={category}
  onChange={(e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedLabel = selectedOption.text;
    setCategory(e.target.value);
    setCategoryName(selectedLabel);
  }}
>
  {Categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
</select>
        </label>
        
        <label>
        <h3 className="text-center mb-4 text-primary">Choose difficulty:</h3>
          <select className="block mx-auto mb-14" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      
        <button type="button" className="block text-lg mb-5 mx-auto p-3 lg:p-4 bg-secondary hover:bg-secondaryHover hover:text-tertiary" onClick={handleStartQuiz} data-testid="start-btn"> start quiz » 
        </button>

      </form>
      <div className="flex justify-between">
        <img className="w-28 md:w-40" src={brainLeft} alt="Smiling brain" /> 
        <img className="w-28 md:w-40" src={brainRight} alt="Thinking brain" />
      </div>
    </>
  );
};

export default Home;
