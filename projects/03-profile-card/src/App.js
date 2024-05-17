import "./App.css"

const skills = [
  {
    text: "HTML + CSS",
    bg: "blue",
    emoji: "💪"
  },
  {
    text: "JavaScript",
    bg: "yellow",
    emoji: "💪"
  },
  {
    text: "Web Design",
    bg: "lightgreen",
    emoji: "💪"
  },
  {
    text: "Git + GitHub",
    bg: "orange",
    emoji: "💪"
  },
  {
    text: "HTML + CSS",
    bg: "lightblue",
    emoji: "💪"
  },
  {
    text: "Svelte",
    bg: "red",
    emoji: "💪"
  }
]


function App() {
  return (
    <main className="card-container">
      <CardImage />
      <CardBody />
      <section className="skills">
        {skills.map(skill => (
          <Skill skill={skill} />
        ))}
      </section>
    </main>
  )
}

function CardImage() {
  return (
    <img src="profilepic.jpg" alt="Nate Sobeck, software developer" className="profile-pic" />
  )
}

function CardBody() {
  return (
    <div className="card-body">
      <h1 className="card-header">Nate Sobeck</h1>
      <p className="lorem">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nemo modi culpa facilis esse soluta provident exercitationem quod dolores. Itaque provident obcaecati dignissimos et earum nam est. Eum, sit facilis?</p>
    </div>
  )
}

function Skill({ skill }) {

  return (
    <div className="skill" style={{"background-color": `${skill.bg}`}}>
      {`${skill.text} ${skill.emoji}`}
    </div>
  )
}

export default App
