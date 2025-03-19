import React, { useState, useRef } from 'react';
import uploadService from '../../services/uploadService';

/**
 * Component for uploading and managing product images with Cloudinary
 */
const ProductImageUploader = ({ images = [], onChange, maxImages = 5 }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if maximum images reached
    if (images.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG and WebP images are allowed.');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('File size exceeds 5MB limit.');
      return;
    }

    // Clear previous errors
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload to server using our uploadService
      const uploadResult = await uploadService.uploadImage(file, {
        folder: 'products'
      });

      // Add the new image to the product
      const newImage = {
        url: uploadResult.url,
        alt: file.name.split('.')[0], // Use filename as alt text
        isPrimary: images.length === 0, // First image is primary by default
        publicId: uploadResult.publicId
      };

      // Call onChange with the updated images array
      onChange([...images, newImage]);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Set an image as primary
  const handleSetPrimary = (index) => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }));
    onChange(updatedImages);
  };

  // Delete an image
  const handleDelete = async (index) => {
    const imageToDelete = images[index];
    
    try {
      // If image has a publicId, attempt to delete from Cloudinary
      if (imageToDelete.publicId) {
        await uploadService.deleteImage(imageToDelete.publicId);
      }
      
      // Remove the image from the array
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      
      // If we deleted the primary image, set the first remaining image as primary
      if (imageToDelete.isPrimary && updatedImages.length > 0) {
        updatedImages[0].isPrimary = true;
      }
      
      onChange(updatedImages);
    } catch (err) {
      console.error('Error deleting image:', err);
      setError(err.response?.data?.message || 'Failed to delete image');
    }
  };

  return (
    <div className="product-image-uploader">
      <h3 className="text-lg font-medium mb-2">Product Images</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative border rounded overflow-hidden ${
                image.isPrimary ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <img 
                src={image.url} 
                alt={image.alt || 'Product image'} 
                className="w-full h-32 object-cover"
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="flex gap-2">
                  {!image.isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(index)}
                      className="bg-blue-600 text-white p-1 rounded"
                      title="Set as primary image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 text-white p-1 rounded"
                    title="Delete image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {image.isPrimary && (
                <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1 py-0.5 rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Upload Button */}
      <div className="mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          disabled={isUploading}
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || images.length >= maxImages}
          className={`px-4 py-2 rounded ${
            isUploading || images.length >= maxImages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
        
        <span className="text-sm ml-2 text-gray-600">
          {images.length} of {maxImages} images
        </span>
      </div>
      
      {/* Upload Progress */}
      {isUploading && (
        <div className="w-full bg-gray-200 rounded h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded" 
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
      
      {/* Help Text */}
      <p className="text-sm text-gray-600">
        Supported formats: JPEG, PNG, WebP. Maximum file size: 5MB.
        {images.length === 0 && ' The first image you upload will be set as the primary image.'}
      </p>
    </div>
  );
};

export default ProductImageUploader; 