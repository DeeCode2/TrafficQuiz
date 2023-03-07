import { Link } from "react-router-dom";

function Homescreen() {
    return (
        <section id="homescreen">
            <h1>The Traffic Sign Quiz</h1>
            <Link to="/questions" className="defaultBtn">START</Link>
        </section>
    )
};

export default Homescreen;