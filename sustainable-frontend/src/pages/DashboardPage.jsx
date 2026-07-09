import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Dashboard from "../components/Dashboard";
import CsvUpload from "../components/CsvUpload";
import ChartSection from "../components/ChartSection";
import HistorySection from "../components/HistorySection";
import Footer from "../components/Footer";

function DashboardPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Dashboard />
      <CsvUpload />
      <ChartSection />
      <HistorySection />
      <Footer />
    </>
  );
}

export default DashboardPage;