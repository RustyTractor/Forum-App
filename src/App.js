import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ForumProvider } from "./contexts/ForumContext";
import User from "./components/User";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Content from "./components/Content";
import Home from "./components/Home";
import QuestionAdd from "./components/questions/QuestionAdd";
import Answers from "./components/Answers";

const App = () => {
  return (
    <div className="App">
      <ForumProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forum" element={<Content />}>
              <Route path="/forum/user" element={<User />} />
              <Route path="/forum/home" element={<Home />} />
              <Route path="/forum/ask" element={<QuestionAdd />} />
              <Route path="/forum/answers" element={<Answers />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ForumProvider>
    </div>
  );
};

export default App;
