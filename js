import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response data and update UI
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleFileUpload}>Upload</button>
      {/* Display extracted text and analysis in an interactive table */}
    </div>
  );
};

export default Home;
import multer from 'multer';
import { processPdf, analyzeText } from '../../utils/extractor';

const upload = multer({ dest: 'uploads/' });

const handler = async (req, res) => {
  try {
    const file = req.file;
    const text = await processPdf(file.path);
    const analysis = await analyzeText(text);

    res.status(200).json({ text, analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
import fs from 'fs';
import { Langchain } from 'langchain';  // Adjust import based on actual usage

export const processPdf = async (filePath) => {
  // Implement PDF text extraction logic
  // You can use pdf-parse or another library for this
};

export const analyzeText = async (text) => {
  const analysis = await Langchain.analyze(text);  // Replace with actual Langchain usage
  return analysis;
};
