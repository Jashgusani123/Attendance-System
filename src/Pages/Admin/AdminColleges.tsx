import { motion } from 'framer-motion';
import { Eye, Plus, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InnerNavbar from '../../Components/Admin/InnerNavbar';
import { useCreatecollegeMutation, useGetAllCollegesQuery, useSearchCollegeQuery } from '../../Redux/API/Admin';
import { AdminRequest } from '../../Types/API/AdminType';
import { Capitalize } from '../../Utils/toCapitalize';


const AdminColleges = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchtearm, setSearchtearm] = useState("");
  const [DebouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    collegename: string;
    place: string;
    category: string[];
    logo: File | null;
    image: File | null;
    department: string[];
  }>({
    collegename: '',
    place: '',
    category: [""],
    logo: null,
    image: null,
    department: [""]
  });
  const navigate = useNavigate();
  const [CreateCollege] = useCreatecollegeMutation();
  const { data: searchData } = useSearchCollegeQuery(DebouncedSearchTerm);
  const { data: AllColleges } = useGetAllCollegesQuery();
  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const colleges = DebouncedSearchTerm ? searchData?.colleges : AllColleges?.AllColleges;
  const handleSubmit = async () => {
    const form = new FormData();
    form.append('collegename', formData.collegename);
    form.append('place', formData.place);
    formData.category.forEach(cat => form.append('category[]', cat));
    formData.department.forEach(dep => form.append('department[]', dep));
    if (formData.logo) form.append('logo', formData.logo);
    if (formData.image) form.append('image', formData.image);

    const response = await CreateCollege(form as unknown as AdminRequest);

    if (response.data?.success) {
      navigate("/admin");
    } else {
      console.log(response.error);
    }
  };

  const handleViewOfCollege = (id: string) => {
    navigate("/admin/colleges/view", { state: { id: id } })
  }

  useEffect(()=>{
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchtearm);
    }, 600); // 300ms delay
    return ()=>{
      clearTimeout(handler);
    }
  },[searchtearm])

  useEffect(() => {
    if (DebouncedSearchTerm) {
    }
  }, [DebouncedSearchTerm]);

  return (
    <div className="p-6 w-full">
      {/* NAVBAR */}
      <InnerNavbar Name='All Colleges' Components={<div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search Here.."
          className="bg-white border-2 border-zinc-400 px-3 h-10 rounded-md text-sm outline-none"
          value={searchtearm}
          onChange={(e) => setSearchtearm(e.target.value)}
        />
        <Search className="bg-white border-zinc-400 border-2 text-blue-900 p-1 rounded-full shadow cursor-pointer h-10 w-10" />
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
        >
          <Plus className="w-4 h-4" />
          Add College
        </button>
      </div>} />

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges ? colleges.map((college) => (
          <motion.div key={college._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-100 overflow-hidden"
          >
            <img src={college.imageUrl} alt={college.collegename} className="w-full h-40 object-cover" />
            <div className="flex items-center gap-4 p-4">
              <img src={college.logoUrl} alt="logo" className="w-10 h-10 rounded-full object-cover border" />
              <div>
                <h2 className="text-lg font-semibold text-blue-800">{Capitalize(college.collegename)}</h2>
                <p className="text-sm text-zinc-500">ID: {college._id}</p>
              </div>
            </div>
            <div className="text-sm text-zinc-700 px-4 space-y-1">
              <p><strong>📍 Place:</strong> {Capitalize(college.place)}</p>
              <p><strong>🏷️ Category:</strong> {college.category.join(', ')}</p>
              <p><strong>🎓 Departments:</strong> {college.department.join(', ')}</p>
            </div>
            <div className="px-4 py-4">
              <button className="flex items-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full" onClick={() => handleViewOfCollege(college._id)}>
                <Eye className="w-4 h-4" />
                View
              </button>
            </div>
          </motion.div>
        )) : <p>Not Available</p>}
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-[#000000d9] bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl p-8 relative border border-blue-100">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute cursor-pointer top-4 right-4 text-zinc-600 hover:text-red-500"
            >
              <X />
            </button>

            {/* Stepper with Names */}
            <div className="flex justify-between items-center mb-8">
              {[
                { step: 1, label: 'Basic Info' },
                { step: 2, label: 'Media' },
                { step: 3, label: 'Departments' }
              ].map((item, idx, arr) => (
                <div key={item.step} className="flex items-center w-full">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full text-white text-sm flex items-center justify-center font-semibold shadow transition-all duration-300 ${step >= item.step ? 'bg-blue-600' : 'bg-zinc-300'
                        }`}
                    >
                      {item.step}
                    </div>
                    <span className="text-xs mt-2 text-center text-zinc-600 font-medium">
                      {item.label}
                    </span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div
                      className={`flex-1 h-[3px] mx-2 rounded-full transition-all duration-300 ${step > item.step ? 'bg-blue-600' : 'bg-zinc-300'
                        }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Step Forms */}
            {step === 1 && (
              <div className="space-y-4">
                <input
                  name="collegename"
                  value={formData.collegename}
                  onChange={handleChange}
                  placeholder="College Name"
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="Place"
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="Category (e.g., Engineering)"
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Logo</label>
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, logo: e.target.files?.[0] || null })
                    }
                    className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files?.[0] || null })
                    }
                    className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}


            {step === 3 && (
              <div className="space-y-4">
                <textarea
                  name="departments"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value.split(',').map(s => s.trim()) })}

                  placeholder="Departments (comma-separated)"
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className="bg-zinc-200 px-4 py-2 rounded-md text-sm hover:bg-zinc-300"
              >
                Previous
              </button>
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                >
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
