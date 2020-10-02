import React from "react";
import ReactDOM from "react-dom";

const Header: React.FC<{ courseName: string}> = ({ courseName }) => {
  return (
    <h2>{courseName}</h2>
  );
};


// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "Testing";
  buzzword: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

interface CourseProps {
  courseParts: Array<CoursePart>;
}

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: React.FC<PartProps> = ({ part }) => {
  switch(part.name) {
    case "Fundamentals":
      return <p>{part.name} {part.exerciseCount} {part.description}</p>
    case "Using props to pass data":
      return <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
    case "Deeper type usage":
      return <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
    case "Testing":
      return <p>{part.name} {part.exerciseCount} {part.description} {part.buzzword}</p>
    default:
      return assertNever(part)
  }
}

const Content: React.FC<CourseProps> = ({ courseParts }) => {
  return (
    <div>
      { courseParts.map((part, index) => <Part key={index} part={part} /> )}
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Testing",
      exerciseCount: 6,
      description: "How to test!",
      buzzword: "Jest"
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
