import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5000/api';

/**
 * ProductEdit component for adding or editing products
 * Handles both creation of new products and editing existing ones
 */
const ProductEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isNewProduct = productId === 'new';
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: 0,
    salePrice: 0,
    onSale: false,
    sku: '',
    stock: 0,
    images: [{ url: '', alt: '', isPrimary: true }],
    isActive: true,
    isHot: false,
    isFeatured: false,
    attributes: {},
    categoryIds: [],
    brandId: '',
    typeIds: [],
    countryId: ''
  });
  
  // State for taxonomy data
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);
  
  // State for loading and errors
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch categories, types, brands, and countries
        const [categoriesRes, typesRes, brandsRes] = await Promise.all([
          axios.get(`${API_URL}/categories`),
          axios.get(`${API_URL}/types`),
          axios.get(`${API_URL}/brands`)
        ]);
        
        // Set taxonomy data
        setCategories(categoriesRes.data.data || []);
        setTypes(typesRes.data.data || []);
        setBrands(brandsRes.data.data || []);
        setCountries([]); // No countries endpoint yet
        
        // If editing an existing product, fetch its data
        if (!isNewProduct) {
          const productRes = await axios.get(`${API_URL}/products/${productId}`);
          if (productRes.data && productRes.data.data) {
            setFormData(productRes.data.data);
          } else {
            setError('Product not found');
          }
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [productId, isNewProduct]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (attributes)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'number' ? parseFloat(value) : value
        }
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle select changes for multi-select fields (categories, types)
  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prev => ({ ...prev, [name]: selectedValues }));
  };

  // Handle image URL changes
  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };

  // Add a new image input field
  const addImageField = () => {
    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, { url: '', alt: '', isPrimary: false }],
    }));
  };

  // Remove an image input field
  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const updatedImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, images: updatedImages }));
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (formData.categoryIds.length === 0) newErrors.categoryIds = 'At least one category is required';
    if (!formData.brandId) newErrors.brandId = 'Brand is required';
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to create/update a product
      // For now, just simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setError('Product saved successfully!');
      
      // Redirect to products list after a brief delay
      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
    } catch (error) {
      setError('Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
          <p>Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isNewProduct ? 'Add New Product' : 'Edit Product'}
        </h1>
        <button
          onClick={() => navigate('/admin/products')}
          className="btn-outline py-2 px-4"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${validationErrors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
            </div>
            
            {/* SKU */}
            <div>
              <label className="block mb-1">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${validationErrors.sku ? 'border-red-500' : 'border-gray-300'}`}
              />
              {validationErrors.sku && <p className="text-red-500 text-sm mt-1">{validationErrors.sku}</p>}
            </div>
            
            {/* Price */}
            <div>
              <label className="block mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full p-2 border rounded ${validationErrors.price ? 'border-red-500' : 'border-gray-300'}`}
              />
              {validationErrors.price && <p className="text-red-500 text-sm mt-1">{validationErrors.price}</p>}
            </div>
            
            {/* Stock */}
            <div>
              <label className="block mb-1">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className={`w-full p-2 border rounded ${validationErrors.stock ? 'border-red-500' : 'border-gray-300'}`}
              />
              {validationErrors.stock && <p className="text-red-500 text-sm mt-1">{validationErrors.stock}</p>}
            </div>
          </div>
          
          {/* Description */}
          <div className="mt-4">
            <label className="block mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full p-2 border rounded ${validationErrors.description ? 'border-red-500' : 'border-gray-300'}`}
            ></textarea>
            {validationErrors.description && <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>}
          </div>
          
          {/* Status Toggles */}
          <div className="mt-4 flex space-x-6">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="mr-2"
                />
                Active (Available for Purchase)
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isHot"
                  checked={formData.isHot}
                  onChange={handleChange}
                  className="mr-2"
                />
                Hot Product (Highlighted)
              </label>
            </div>
          </div>
        </div>
        
        {/* Categories, Types and Brand */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Categories & Classifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categories */}
            <div>
              <label className="block mb-1">
                Categories <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryIds"
                multiple
                value={formData.categoryIds}
                onChange={handleMultiSelectChange}
                className={`w-full p-2 border rounded h-32 ${validationErrors.categoryIds ? 'border-red-500' : 'border-gray-300'}`}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
              {validationErrors.categoryIds && <p className="text-red-500 text-sm mt-1">{validationErrors.categoryIds}</p>}
            </div>
            
            {/* Types */}
            <div>
              <label className="block mb-1">
                Types
              </label>
              <select
                name="typeIds"
                multiple
                value={formData.typeIds}
                onChange={handleMultiSelectChange}
                className="w-full p-2 border border-gray-300 rounded h-32"
              >
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
            </div>
            
            {/* Brand */}
            <div>
              <label className="block mb-1">
                Brand <span className="text-red-500">*</span>
              </label>
              <select
                name="brandId"
                value={formData.brandId}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${validationErrors.brandId ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {validationErrors.brandId && <p className="text-red-500 text-sm mt-1">{validationErrors.brandId}</p>}
            </div>
            
            {/* Country */}
            <div>
              <label className="block mb-1">
                Country of Origin
              </label>
              <select
                name="countryId"
                value={formData.countryId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Attributes */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Product Attributes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Alcohol Percentage */}
            <div>
              <label className="block mb-1">
                Alcohol Percentage (%)
              </label>
              <input
                type="number"
                name="attributes.alcohol_percentage"
                value={formData.attributes.alcohol_percentage}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            {/* Volume */}
            <div>
              <label className="block mb-1">
                Volume (ml)
              </label>
              <input
                type="number"
                name="attributes.volume_ml"
                value={formData.attributes.volume_ml}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            {/* Year */}
            <div>
              <label className="block mb-1">
                Year (for wine/vintage)
              </label>
              <input
                type="number"
                name="attributes.year"
                value={formData.attributes.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        
        {/* Images */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                value={image.url}
                onChange={(e) => handleImageChange(index, { ...image, url: e.target.value })}
                placeholder="Image URL"
                className="flex-1 p-2 border border-gray-300 rounded mr-2"
              />
              
              <button
                type="button"
                onClick={() => removeImageField(index)}
                disabled={formData.images.length <= 1}
                className={`p-2 ${
                  formData.images.length <= 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                } rounded`}
              >
                Remove
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
          >
            Add Image URL
          </button>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="btn-outline py-2 px-6"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="btn-primary py-2 px-6"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit; 