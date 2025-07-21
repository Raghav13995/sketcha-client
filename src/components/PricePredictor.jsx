import React, { useEffect, useState } from "react";

export default function PricePredictor() {
  const [squareFeet, setSquareFeet] = useState(1000);
  const [bhk, setBHK] = useState(2);
  const [bath, setBath] = useState(2);
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch("https://sketcha-modelserver.onrender.com/get_location_names");
        const data = await res.json();
        setLocations(data.locations);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      }
    }
    fetchLocations();
  }, []);

const handleEstimatePrice = async () => {
  try {
    const formData = new URLSearchParams();
    formData.append("total_sqft", squareFeet);
    formData.append("location", location);
    formData.append("bhk", bhk);
    formData.append("bath", bath);
    console.log("total_srft - ",squareFeet);
    console.log("location - ",location);
    const res = await fetch("https://sketcha-modelserver.onrender.com/predict_home_price", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await res.json();
    setEstimatedPrice(data.estimated_price);
  } catch (err) {
    console.error("Prediction failed", err);
  }
};


  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center blur-[8px] -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      ></div>

      <form className="max-w-md mx-auto mt-12 bg-white bg-opacity-90 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-2">Area (Square Feet)</h2>
        <input
          type="number"
          className="w-full p-2 mb-4 rounded border"
          value={squareFeet}
          onChange={(e) => setSquareFeet(e.target.value)}
        />

        <h2 className="text-xl font-semibold mb-2">BHK</h2>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num}>
              <input
                type="radio"
                name="bhk"
                value={num}
                checked={bhk === num}
                onChange={() => setBHK(num)}
                className="hidden"
              />
              <span
                className={`px-4 py-2 border rounded cursor-pointer ${
                  bhk === num ? "bg-green-300" : "bg-gray-200"
                }`}
              >
                {num}
              </span>
            </label>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-2">Bath</h2>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num}>
              <input
                type="radio"
                name="bath"
                value={num}
                checked={bath === num}
                onChange={() => setBath(num)}
                className="hidden"
              />
              <span
                className={`px-4 py-2 border rounded cursor-pointer ${
                  bath === num ? "bg-green-300" : "bg-gray-200"
                }`}
              >
                {num}
              </span>
            </label>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-2">Location</h2>
        <select
          className="w-full p-2 mb-4 rounded border"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="" disabled>
            Choose a Location
          </option>
          {locations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleEstimatePrice}
          className="w-full bg-green-300 hover:bg-green-400 text-white py-2 rounded transition"
        >
          Estimate Price
        </button>

        {estimatedPrice !== null && (
          <div className="mt-4 p-2 bg-yellow-200 rounded text-center">
            <h2>{estimatedPrice} Lakh</h2>
          </div>
        )}
      </form>
    </div>
  );
}
