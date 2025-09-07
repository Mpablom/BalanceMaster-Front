import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark transition-colors duration-300">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
