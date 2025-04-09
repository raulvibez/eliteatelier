// File: frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const brands = [
  "acnestudios", "adidas", "amazon", "apple", "arcteryx", "balenciaga", "bape",
  "breuninger", "brokenplanet", "burberry", "canadagoose", "cartier", "chanel",
  "chewforever", "chromehearts", "chrono24", "coolblue", "crtz", "culturekings",
  "denimtears", "dior", "dyson", "ebayauth", "end", "farfetch", "farfetchold",
  "fightclub", "flannels", "gallerydept", "goat", "grailed", "hermes", "jdsports",
  "legitapp", "loropiana", "lv", "maisonmargiela", "moncler", "nike", "nosauce",
  "offwhite", "pandora", "prada", "ralphlauren", "sephora", "snkrs", "spider",
  "stockx", "stussy", "test", "tnf", "trapstar", "zalandode", "zalandous", "zara"
];

function BrandForm() {
  const { brand } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch("https://tuo-backend.onrender.com/api/genera-scontrino", {

      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Scontrino inviato via email!");
    } else {
      alert("Errore nell'invio dello scontrino.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Crea Scontrino - {brand.toUpperCase()}</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input type="hidden" name="brand" value={brand} />
        <Input name="prodotto" placeholder="Nome del prodotto" required />
        <Input name="prezzo" placeholder="Prezzo" required type="number" step="0.01" />
        <Textarea name="descrizione" placeholder="Dettagli o descrizione" />
        <Input name="immagine" type="file" accept="image/*" />
        <Input name="email" type="email" placeholder="Email destinatario" required />
        <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black">
          Invia Scontrino
        </Button>
      </form>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Seleziona un brand</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <Button
            key={brand}
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-semibold"
            onClick={() => navigate(`/form/${brand}`)}
          >
            {brand.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/:brand" element={<BrandForm />} />
      </Routes>
    </Router>
  );
}

export default App;
