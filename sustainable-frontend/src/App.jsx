import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import HistorySection from "./components/HistorySection";
import ChartSection from "./components/ChartSection";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Dashboard />
      <ChartSection />
      <HistorySection />
      <Footer />
    </>
  );
}

export default App;