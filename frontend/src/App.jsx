import { FilterProvider } from "./context/FilterContext";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <FilterProvider>
      <Dashboard />
    </FilterProvider>
  );
}
