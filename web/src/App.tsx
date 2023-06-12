import './App.css'
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Home from "./components/Home.tsx";
import ChatPage from "./components/chat/ChatPage.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/chat" element={<ChatPage />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    </>
  )
}

export default App
