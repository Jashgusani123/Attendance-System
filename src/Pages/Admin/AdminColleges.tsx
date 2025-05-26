import { motion } from 'framer-motion';
import { Eye, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';

const colleges = [
    {
      id: 1,
      name: "ABC Engineering College",
      logo: "https://png.pngtree.com/png-vector/20230303/ourmid/pngtree-education-and-college-logo-design-template-vector-png-image_6627789.png",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSgg2_55kmn9bL9aE4dyljGN7nfyX1ehuvig&s",
      place: "Chennai, Tamil Nadu",
      category: "Engineering",
      departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL"]
    },
    {
      id: 2,
      name: "XYZ Medical College",
      logo: "https://t3.ftcdn.net/jpg/04/91/76/62/360_F_491766294_h4j7LbW2YgfbNHhq7F8GboIc1XyBSEY5.jpg",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSgg2_55kmn9bL9aE4dyljGN7nfyX1ehuvig&s",
      place: "Hyderabad, Telangana",
      category: "Medical",
      departments: ["MBBS", "BDS", "Pharmacy", "Nursing"]
    },
    {
      id: 3,
      name: "Global Business School",
      logo: "https://media.istockphoto.com/id/1475335566/vector/university-logo-design-vector.jpg?s=612x612&w=0&k=20&c=38yhifr8INb_gaS4C7WJ783XhJoK4YnnInwsmskH1ww=",
      image: "https://www.maitreyi.ac.in/assets/front/images/mainbanner/slide1.jpg",
      place: "Bangalore, Karnataka",
      category: "Business",
      departments: ["BBA", "MBA", "LLB", "BCOM"]
    },{
      id: 4,
      name: "VKM School",
      logo: "https://www.shutterstock.com/image-vector/college-logo-design-template-vector-600nw-2312781307.jpg",
      image: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?cs=srgb&dl=pexels-pixabay-159490.jpg&fm=jpg",
      place: "Pune",
      category: "Business",
      departments: ["BBA", "MBA", "LLB", "BCOM"]
    },
    {
      id: 5,
      name: "LLM College",
      logo: "https://media.istockphoto.com/id/1474929447/vector/university-logo-design-vector.jpg?s=612x612&w=0&k=20&c=99D0CpevgrD-6gYEnwOQc0_xHzYb5qnA2IbCl5106lQ=",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BCaMyiCus6EJW4RrMyxw3a25fyxd34m-dw&s",
      place: "Mumbai",
      category: "Engineering",
      departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL"]
    }
  ];

const AdminColleges = () => {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    image: '',
    place: '',
    category: '',
    departments: ''
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    // TODO: Call API here
    setShowForm(false);
    setStep(1);
  };

  return (
    <div className="p-6 w-full">
      {/* NAVBAR */}
      <nav className="bg-zinc-300 rounded-[10px] sticky top-0 z-50 w-full flex justify-between items-center px-4 py-3 mb-4">
        <h1 className="text-2xl font-bold text-zinc-800">All Colleges</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Here.."
            className="bg-white border-2 border-zinc-400 px-3 h-10 rounded-md text-sm outline-none"
          />
          <Search className="bg-white border-zinc-400 border-2 text-blue-900 p-1 rounded-full shadow cursor-pointer h-10 w-10" />
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
          >
            <Plus className="w-4 h-4" />
            Add College
          </button>
        </div>
      </nav>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <motion.div key={college.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-100 overflow-hidden"
          >
            <img src={college.image} alt={college.name} className="w-full h-40 object-cover" />
            <div className="flex items-center gap-4 p-4">
              <img src={college.logo} alt="logo" className="w-10 h-10 rounded-full object-cover border" />
              <div>
                <h2 className="text-lg font-semibold text-blue-800">{college.name}</h2>
                <p className="text-sm text-zinc-500">ID: {college.id}</p>
              </div>
            </div>
            <div className="text-sm text-zinc-700 px-4 space-y-1">
              <p><strong>📍 Place:</strong> {college.place}</p>
              <p><strong>🏷️ Category:</strong> {college.category}</p>
              <p><strong>🎓 Departments:</strong> {college.departments.join(', ')}</p>
            </div>
            <div className="px-4 py-4">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full">
                <Eye className="w-4 h-4" />
                View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-[#000000d9] bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-xl p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500">
              <X />
            </button>

            {/* Stepper Line */}
            <div className="flex justify-between mb-6">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex-1 flex items-center">
                  <div className={`w-8 h-8 rounded-full text-white text-sm flex items-center justify-center ${s <= step ? 'bg-blue-600' : 'bg-zinc-300'}`}>
                    {s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-[2px] ${s < step ? 'bg-blue-600' : 'bg-zinc-300'}`}></div>}
                </div>
              ))}
            </div>

            {/* Step Forms */}
            {step === 1 && (
              <div className="space-y-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="College Name" className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="place" value={formData.place} onChange={handleChange} placeholder="Place" className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="category" value={formData.category} onChange={handleChange} placeholder="Category (e.g., Engineering)" className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <input name="logo" value={formData.logo} onChange={handleChange} placeholder="Logo URL" className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <textarea name="departments" value={formData.departments} onChange={handleChange} placeholder="Departments (comma-separated)" className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
              <button onClick={handlePrev} disabled={step === 1} className="bg-zinc-200 px-4 py-2 rounded-md text-sm">
                Previous
              </button>
              {step < 3 ? (
                <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                  Next
                </button>
              ) : (
                <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm">
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminColleges;
