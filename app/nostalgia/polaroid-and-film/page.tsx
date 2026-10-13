const polaroidInventory = [
  { sku: "CAM-001", name: "Polaroid SX-70 Sonar OneStep", price: "$380.00", type: "CAMERA", style: "border-zinc-800" },
  { sku: "CAM-002", name: "Polaroid Sun 660 Autofocus", price: "$120.00", type: "CAMERA", style: "border-zinc-600" },
  { sku: "CAM-003", name: "Expired Polaroid 600 Film (Sealed 2004)", price: "$45.00", type: "FILM", style: "border-blue-500" },
  { sku: "CAM-004", name: "Polaroid Impulse AF", price: "$95.00", type: "CAMERA", style: "border-red-500" },
  { sku: "CAM-005", name: "Polaroid SX-70 Leather Case", price: "$65.00", type: "ACCESSORY", style: "border-amber-700" }
];

export default function PolaroidFilmPage() {
  return (
    <main className="min-h-screen bg-zinc-100 text-black p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b-8 border-transparent" style={{ borderImage: "linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff) 1" }}>
          <h1 className="text-5xl md:text-7xl font-black uppercase text-zinc-900 pb-4">Polaroid & Film</h1>
          <p className="mt-2 text-zinc-500 font-medium pb-6">Refurbished instant cameras and expired film stock.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {polaroidInventory.map((item) => (
            <div key={item.sku} className={`bg-white border-2 ${item.style} p-6 rounded-sm shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow`}>
              <div>
                <span className="text-[10px] font-bold bg-zinc-200 text-zinc-600 px-2 py-1 uppercase">{item.type}</span>
                <h2 className="text-xl font-bold mt-3">{item.name}</h2>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-2xl font-black">{item.price}</span>
                <button className="bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase px-4 py-2">Capture</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
