import React, { useState } from 'react';



const App = () => {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    addPrompt: '',
    pages: 0,
    theme: '',
    dimensions: ''
  });


  const handleRunScript = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/run-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! Status: ${response.status}`);
      }
  
      // Handle Mira API response structure
      setOutput(data.output?.result || data.output || data.error);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setSubmitted(false);  // Reset submission state
    }
  };




  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log(formData);
      setSubmitted(true);
      handleRunScript();
      setFormData({
        topic: '',
        addPrompt: '',
        pages: 0,
        theme: '',
        dimensions: ''
      });
    }
  };

  const isFormValid = 
    formData.topic.trim() !== '' &&
    formData.addPrompt.trim() !== '' &&
    formData.pages > 0 &&
    formData.theme !== '' &&
    formData.dimensions !== '';

  return (
    <>
      <div className='flex flex-row justify-center items-center  py-20'>

        <h2 className="text-5xl font-bold text-orange-800  text-center">Your Very Own AI Presentation Generator</h2>
      </div>
      <div className=''>

        <div className="max-w-xl mx-auto p-8 bg-orange-50 rounded-xl shadow-lg border border-orange-100">
          <h2 className="text-2xl font-bold text-orange-800 mb-6 text-center">Tell us about your presentation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-orange-700">
                Topic:
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-orange-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-500 bg-orange-25"
                  required
                />
              </label>
            </div>


            <div className="space-y-2">
              <label className="block text-sm font-medium text-orange-700">
                Number of Pages:
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 block w-full px-3 py-2 border border-orange-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-500 bg-orange-25"
                  required
                />
              </label>
            </div>








            <div className="space-y-2">
              <label className="block text-sm font-medium text-orange-700">
                Theme:
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-orange-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-500 bg-orange-25"
                  required
                >
                  <option value="">Select Option</option>
                  <option value="warm">Warm</option>
                  <option value="cold">Cold</option>
                </select>
              </label>
            </div>


            <div className="space-y-2">
              <label className="block text-sm font-medium text-orange-700">
                Dimensions:
                <select
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-orange-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-500 bg-orange-25"
                  required
                >
                  <option value="">Select Option</option>
                  <option value="16 : 9">16 : 9</option>
                  <option value="Standard PPt">Standard PPt</option>
                  <option value="A4 landscape">A4 landscape</option>
                  <option value="A4 portrait">A4 portrait</option>
                </select>
              </label>
            </div>


              <div className="space-y-2">
                <label className="block text-sm font-medium text-orange-700">
                  Additional Prompts:
                  <textarea
                    name="addPrompt"
                    value={formData.addPrompt}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-orange-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-500 h-32 bg-orange-25"
                    required
                  />
                </label>
              </div>



            <button
              type="submit"
              className={`w-full px-5 py-2.5 text-sm font-medium rounded-lg transition-colors
                ${!isFormValid || submitted ? 
                  'bg-amber-200 text-amber-600 cursor-not-allowed' : 
                  'bg-amber-600 hover:bg-amber-700 text-white focus:ring-4 focus:ring-amber-200'}
                  focus:outline-none`}
              disabled={!isFormValid || submitted}
            >
              {submitted ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>

        {output && (
          <div className="mt-4 p-4 bg-orange-50 rounded">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        )}        



      </div>
    </>
  );
};

export default App;