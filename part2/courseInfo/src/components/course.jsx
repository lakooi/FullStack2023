const Course = ({course}) => {
    const Header = (props) => {
      return (
        <h2>{props.course}</h2>
      )
    }

    const Content = (props) => {
      return (
        <div>
          {props.parts.map(part => 
            <Part part={part.name} exercises={part.exercises} key={part.id}/>
          )}
        </div>
      )
    }

    const Part = (props) => {
      return (
        <p>{props.part} {props.exercises}</p>
      )
    }

    const Total = (props) => {
      const sum = props.parts.reduce((sum, part) => sum + part.exercises, 0)

      return (
        <strong>total of {sum} exercises</strong>
      )
    }

    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts}/>
        </div>
    )
}

export default Course
