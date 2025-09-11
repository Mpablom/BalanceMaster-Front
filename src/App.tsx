import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark transition-colors duration-300">
      <Router>
        <Toaster position="top-right" />
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
