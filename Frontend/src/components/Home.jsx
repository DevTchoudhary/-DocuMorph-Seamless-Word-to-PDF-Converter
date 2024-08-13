import React, { useState } from 'react';
import { FaFileWord } from 'react-icons/fa';
import axios from 'axios';

function Home() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [convertStatus, setConvertStatus] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setConvertStatus("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setConvertStatus("");
            setError("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/convertFile", formData, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            setSelectedFile(null);
            setConvertStatus("File Converted Successfully");
            setError("");
        } catch (error) {
            console.error("Conversion error:", error);
            setError("Error converting file. Please try again.");
            setConvertStatus("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-black'>
            <div className='w-full max-w-lg px-6 py-8 md:px-12 bg-black text-orange-400'>
                <div className='border-2 border-dashed px-6 py-4 md:px-8 md:py-6 border-orange-500 rounded-lg shadow-xl bg-black'>
                    <h1 className='text-4xl font-extrabold text-center mb-6 text-orange-400'>Convert Word To PDF</h1>
                    <p className='text-md text-center mb-6 text-orange-300'>
                        Easily convert Word documents to PDF format online, without installing any software.
                    </p>
                    <hr />
                    <marquee behavior="" direction="right-left" className="text-orange-600">AN APPLICATION BY TUSHAR (Full Stack Developer)</marquee>
                    <hr />
                    

                    <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-6'>
                        <input
                            type="file"
                            accept='.doc,.docx'
                            onChange={handleFileChange}
                            className='hidden'
                            id='fileInput'
                        />
                        <label
                            htmlFor="fileInput"
                            className='flex items-center justify-center px-6 py-4 bg-orange-600 text-white rounded-lg shadow-md cursor-pointer border-2 border-orange-500 hover:bg-orange-700 transition-colors duration-300'
                        >
                            <FaFileWord className='text-4xl mr-4' />
                            <span className='text-xl'>
                                {selectedFile ? selectedFile.name : "Choose File"}
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={!selectedFile || isLoading}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 
                            ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'} 
                            ${!selectedFile ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500'} 
                            text-white`}
                        >
                            {isLoading ? "Converting..." : "Convert File"}
                        </button>

                        {convertStatus && <p className='text-orange-400 text-lg'>{convertStatus}</p>}
                        {error && <p className='text-red-500 text-lg'>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
