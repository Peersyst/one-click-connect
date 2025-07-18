import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Sign from "./pages/Sign";
import "./App.css";
import { NearWalletProvider } from "./providers/NearWalletProvider";

function App() {
    return (
        <NearWalletProvider>
            <Router>
                <div className="app">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/sign">Sign</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sign" element={<Sign />} />
                    </Routes>
                </div>
            </Router>
        </NearWalletProvider>
    );
}

export default App;
