import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import AddInboundForm from "@/pages/AddInbound";
import Dashboard from "@/pages/Dashboard";
import InventoryList from "@/pages/InventoryList";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/add" element={<AddInboundForm />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
