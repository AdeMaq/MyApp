import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const ImageInputSelector = ({ value, onChange }) => {
  const [inputType, setInputType] = useState('file');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e) => {
    onChange(e.target.value); 
  };

  return (
    <>
      <Form.Group className="mb-7">
        <Form.Label className="text-white">Image Input Type</Form.Label>
        <Form.Select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="file">Upload from File</option>
          <option value="url">Paste Image URL</option>
        </Form.Select>
      </Form.Group>

      {inputType === 'file' ? (
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Choose File</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>
      ) : (
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Enter Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://example.com/image.jpg"
            value={value}
            onChange={handleUrlChange}
          />
        </Form.Group>
      )}
    </>
  );
};

export default ImageInputSelector;