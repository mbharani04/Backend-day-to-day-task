
import  { useState } from 'react';

const SevenTask = () => { 
     // Task 33: State for the controlled input
  const [username, setUsername] = useState('');
  const [submittedData, setSubmittedData] = useState('');

  const handleChange = (e) => {
    // Task 33: Updating state on every keystroke
    setUsername(e.target.value);

    // Task 31 Demonstration:
    console.log("Current State:", username); 
    console.log("Immediate Event Value:", e.target.value);
  };

  const handleSubmit = (e) => {
    // Task 32: Prevent page refresh
    e.preventDefault();
    
    setSubmittedData(username);
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Setup</h2>
        
        {/* Task 32: Handling Form Submission */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            {/* Task 33: Controlled Input (value + onChange) */}
            <input
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Submit Data
          </button>
        </form>

        {/* Display Area */}
        <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Real-time (State):</span> {username || 'Waiting for input...'}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Submitted Value:</span> {submittedData || 'Form not submitted yet'}
          </p>
        </div>
      </div>
    </div>

    
    
    </>
  )
}

export default SevenTask
