import Container from "./components/Container.jsx";
import TicTacToeContainer from "./components/TicTicToeContainer.jsx";

export default function App() {
    return (
        <Container>
            <header>
                <h1 className="text-2xl font-extrabold uppercase mb-8">tic tac toe</h1>
            </header>
            <main>
                <TicTacToeContainer />
            </main>
        </Container>
    );
}