import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductImageUploader from '../../components/admin/ProductImageUploader';
import categoryService from '../../services/categoryService';
import brandService from '../../services/brandService';
import typeService from '../../services/typeService';
import countryService from '../../services/countryService';
import productService from '../../services/productService';

/**
 * ProductEdit component for creating and editing products
 */
const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: '',
    salePrice: '',
    onSale: false,
    sku: '',
    stock: '',
    images: [],
    isActive: true,
    isHot: false,
    isFeatured: false,
    attributes: {},
    brandId: '',
    categoryIds: [],
    typeIds: [],
    countryId: ''
  });
  
  // Additional state
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  // Load data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch taxonomy data
        const [categoriesData, brandsData, typesData, countriesData] = await Promise.all([
          categoryService.getAllCategories(),
          brandService.getAllBrands(),
          typeService.getAllTypes(),
          countryService.getAllCountries()
        ]);
        
        setCategories(categoriesData);
        setBrands(brandsData);
        setTypes(typesData);
        setCountries(countriesData);
        
        // If edit mode, fetch product
        if (isEditMode) {
          const productData = await productService.getProductById(id);
          
          // Normalize data
          setFormData({
            ...productData,
            price: productData.price.toString(),
            salePrice: productData.salePrice?.toString() || '',
            stock: productData.stock?.toString() || '',
            // Ensure arrays
            categoryIds: Array.isArray(productData.categoryIds) ? productData.categoryIds : [],
            typeIds: Array.isArray(productData.typeIds) ? productData.typeIds : [],
            // Initialize attributes if missing
            attributes: productData.attributes || {}
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, isEditMode]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle select multiple changes (categories, types)
  const handleSelectMultiple = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prev => ({
      ...prev,
      [name]: selectedValues
    }));
  };
  
  // Handle attribute changes
  const handleAttributeChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [key]: value
      }
    }));
  };
  
  // Handle attribute deletion
  const handleDeleteAttribute = (key) => {
    setFormData(prev => {
      const updatedAttributes = { ...prev.attributes };
      delete updatedAttributes[key];
      return {
        ...prev,
        attributes: updatedAttributes
      };
    });
  };
  
  // Handle image changes
  const handleImagesChange = (images) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
  };
  
  // Generate slug from name
  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setFormData(prev => ({
      ...prev,
      slug
    }));
  };
  
  // Filter types based on selected categories
  useEffect(() => {
    if (formData.categoryIds.length > 0 && types.length > 0) {
      // Filter types that belong to any of the selected categories
      const filtered = types.filter(type => {
        // Check if any of the type's categories match the selected categories
        return type.categoryIds && type.categoryIds.some(catId => 
          formData.categoryIds.includes(catId) ||
          formData.categoryIds.includes(catId.toString())
        );
      });
      
      setFilteredTypes(filtered);
      
      // Remove any selected types that are no longer valid
      const validTypeIds = filtered.map(t => t.id || t._id);
      const updatedTypeIds = formData.typeIds.filter(id => 
        validTypeIds.includes(id) || validTypeIds.includes(id.toString())
      );
      
      if (JSON.stringify(updatedTypeIds) !== JSON.stringify(formData.typeIds)) {
        setFormData(prev => ({
          ...prev,
          typeIds: updatedTypeIds
        }));
      }
    } else {
      // If no categories selected, show all types
      setFilteredTypes(types);
    }
  }, [formData.categoryIds, types]);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (saving) return;
    
    setSaving(true);
    setError(null);
    
    try {
      // Create product object
      const productData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        salePrice: parseFloat(formData.salePrice) || 0,
        stock: parseInt(formData.stock, 10) || 0
      };
      
      // Save product
      let savedProduct;
      if (isEditMode && id) {
        savedProduct = await productService.saveProduct({
          ...productData,
          id
        });
      } else {
        savedProduct = await productService.saveProduct(productData);
      }
      
      console.log('Product saved successfully:', savedProduct);
      
      // Redirect to products list
      navigate('/admin/products');
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please check your data and try again.');
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? 'Edit Product' : 'Create New Product'}
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => !formData.slug && generateSlug()}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              {/* Product Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug*
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-l"
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="bg-gray-200 px-4 rounded-r border border-gray-300 border-l-0"
                  >
                    Generate
                  </button>
                </div>
              </div>
              
              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU*
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            {/* Short Description */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          
          {/* Pricing */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Regular Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Regular Price*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-2 pl-7 border border-gray-300 rounded"
                  />
                </div>
              </div>
              
              {/* Sale Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full p-2 pl-7 border border-gray-300 rounded"
                  />
                </div>
              </div>
              
              {/* On Sale */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="onSale"
                  id="onSale"
                  checked={formData.onSale}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="onSale" className="ml-2 text-sm text-gray-700">
                  Product is on sale
                </label>
              </div>
            </div>
          </div>
          
          {/* Images */}
          <div className="mb-8">
            <ProductImageUploader 
              images={formData.images} 
              onChange={handleImagesChange} 
            />
          </div>
          
          {/* Categories and Brands */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Classification</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select a brand</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categories*
                </label>
                <select
                  name="categoryIds"
                  multiple
                  value={formData.categoryIds}
                  onChange={handleSelectMultiple}
                  required
                  className="w-full p-2 border border-gray-300 rounded h-32"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Hold Ctrl (or Cmd) to select multiple categories
                </p>
              </div>
              
              {/* Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Types
                </label>
                <select
                  name="typeIds"
                  multiple
                  value={formData.typeIds}
                  onChange={handleSelectMultiple}
                  className="w-full p-2 border border-gray-300 rounded h-32"
                >
                  {filteredTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Hold Ctrl (or Cmd) to select multiple types
                </p>
              </div>
              
              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country of Origin
                </label>
                <select
                  name="countryId"
                  value={formData.countryId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select a country</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Attributes */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Attributes</h2>
            
            {/* Attribute List */}
            <div className="mb-4">
              {Object.entries(formData.attributes).map(([key, value]) => (
                <div key={key} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={key}
                    disabled
                    className="w-1/3 p-2 border border-gray-300 rounded-l bg-gray-100"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleAttributeChange(key, e.target.value)}
                    className="w-2/3 p-2 border border-gray-300 border-l-0"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteAttribute(key)}
                    className="bg-red-600 text-white p-2 rounded-r"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            {/* Add Attribute */}
            <div className="flex items-center">
              <input
                type="text"
                id="attrKey"
                placeholder="Attribute name"
                className="w-1/3 p-2 border border-gray-300 rounded-l"
              />
              <input
                type="text"
                id="attrValue"
                placeholder="Attribute value"
                className="w-2/3 p-2 border border-gray-300 border-l-0"
              />
              <button
                type="button"
                onClick={() => {
                  const key = document.getElementById('attrKey').value.trim();
                  const value = document.getElementById('attrValue').value.trim();
                  
                  if (key && value) {
                    handleAttributeChange(key, value);
                    document.getElementById('attrKey').value = '';
                    document.getElementById('attrValue').value = '';
                  }
                }}
                className="bg-blue-600 text-white p-2 rounded-r"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Product Options */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Product Options</h2>
            
            <div className="flex flex-wrap gap-6">
              {/* Is Active */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Product is active
                </label>
              </div>
              
              {/* Is Featured */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                  Featured product
                </label>
              </div>
              
              {/* Is Hot */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isHot"
                  id="isHot"
                  checked={formData.isHot}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="isHot" className="ml-2 text-sm text-gray-700">
                  Hot/New product
                </label>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 rounded ${
                saving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saving ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit; 