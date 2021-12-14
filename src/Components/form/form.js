import React from "react";
import useInputState from "../../Hooks/useInputState";
import "./form.style.css";
import categories from "../../utils/Categories";

function Form({ getQuestions }) {
  const [category, handleChangeCategory] = useInputState("");
  const [dificulty, handleChangeDificulty] = useInputState("");
  const [type, handleChangeType] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getQuestions(category, dificulty, type);
    // three of them must be chosen
    if (!(category || (dificulty && type))) {
      alert("Please Choose Category");

      // dificulty and type must be chosen
    } else if (category && !(dificulty && type)) {
      alert("Please Choose Dificulty and Type");
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="category">Choose Category:</label>
      <select value={category} id="category" name="category" onChange={handleChangeCategory}>
        {categories.map((select) => (
          <option value={select.value} key={select.value}>
            {select.category}
          </option>
        ))}
      </select>
      <label htmlFor="dificulty">Choose Dificulty :</label>
      <select value={dificulty} id="dificulty" name="dificulty" onChange={handleChangeDificulty}>
        <option></option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <label htmlFor="type">Select Type :</label>
      <select value={type} id="type" name="type" onChange={handleChangeType}>
        <option></option>
        <option value="multiple">Multiple Choise</option>
      </select>
      <button className={window.navigator.userAgent.match(/iphone/i) ? "iphone" : "form-btn"}>
        Get Questions
      </button>
    </form>
  );
}

export default Form;
