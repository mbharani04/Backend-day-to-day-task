import{ useState } from 'react';

export default function UserProcessForm() {
  // 1. State to manage the current form input object
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'Developer' // Default value
  });

  // 2. State to manage the array of submitted objects
  const [dataList, setDataList] = useState([]);

  // Handle input changes dynamically for any field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Ensure fields aren't empty
    if (!formData.username.trim() || !formData.email.trim()) {
      alert("Please fill out all fields!");
      return;
    }

    // Add a unique ID to the object before pushing it to the array
    const newDataItem = {
      ...formData,
      id: Date.now()
    };

    // Update the array state
    setDataList((prevList) => [...prevList, newDataItem]);

    // Reset the form fields
    setFormData({
      username: '',
      email: '',
      role: 'Developer'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
          Process Management Panel
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- FORM SECTION --- */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Entry</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg text-black  bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                >
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm"
              >
                Add to Process List
              </button>
            </form>
          </div>

          {/* --- DATA DISPLAY SECTION --- */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex justify-between items-center">
              <span>Submitted Data List</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {dataList.length} Items
              </span>
            </h2>

            {dataList.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg p-6">
                <p>No data added yet.</p>
                <p className="text-xs mt-1">Fill the form on the left to populate this list.</p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[350px] pr-2">
                {dataList.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.username}</h3>
                      <p className="text-sm text-gray-500">{item.email}</p>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {item.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}