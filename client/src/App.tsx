import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Compiler from "./pages/Compiler"
import NotFound from "./pages/NotFound"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"


function App() {


  return (
    <>
      <Toaster theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/compiler/:urlId?" element={<Compiler />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>

    </>
  )
}

export default App
