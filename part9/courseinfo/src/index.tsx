import React from "react";
import ReactDOM from "react-dom";

const Header: React.FC<{ courseName: string}> = ({ courseName }) => {
  return (
    <h2>{courseName}</h2>
  );
};

interface CourseInfo {
  name: string;
  exerciseCount: number;
}

interface CourseProps {
  courseParts: Array<CourseInfo>;
}

const Content: React.FC<CourseProps> = ({ courseParts }) => {
  return (
    <div>
      { courseParts.map((part, index) => <p key={index}> {part.name} {part.exerciseCount} </p>) }
    </div>
  )
};

const Total: React.FC<CourseProps> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
