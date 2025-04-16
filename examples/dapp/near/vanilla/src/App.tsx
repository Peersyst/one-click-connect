import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { NearDAppProvider } from "./providers/NearDAppProvider";
import Home from "./pages/Home";
import Main from "./pages/Main";
import "./App.css";

function App() {
    return (
        <NearDAppProvider>
            <Router>
                <div className="app">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/main">Main</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/main" element={<Main />} />
                    </Routes>
                </div>
            </Router>
        </NearDAppProvider>
    );
}

export default App;
