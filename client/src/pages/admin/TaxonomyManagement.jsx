import React, { useState, useEffect } from 'react';
import categoryService from '../../services/categoryService';
import typeService from '../../services/typeService';
import brandService from '../../services/brandService';
import countryService from '../../services/countryService';
import Category from '../../models/Category';
import Type from '../../models/Type';
import Brand from '../../models/Brand';
import Country from '../../models/Country';

/**
 * TaxonomyManagement component provides a comprehensive interface for managing
 * product classification entities including categories, types, brands, and countries.
 * Supports CRUD operations with real-time API integration.
 */
const TaxonomyManagement = () => {
  // Taxonomy data state
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);
  
  // UI state management
  const [activeTab, setActiveTab] = useState('categories');
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  // Form state for entity creation/editing
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    description: '',
    parentId: '',
    isActive: true,
    filterMetadata: {}
  });
  
  // Status indicators
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch taxonomy data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch all taxonomy entities in parallel
        const [categoriesData, typesData, brandsData, countriesData] = await Promise.all([
          categoryService.getAllCategories(),
          typeService.getAllTypes(),
          brandService.getAllBrands(),
          countryService.getAllCountries()
        ]);
        
        // Update state with retrieved data
        setCategories(categoriesData);
        setTypes(typesData);
        setBrands(brandsData);
        setCountries(countriesData);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching taxonomy data:', err);
        setError('Failed to load taxonomy data. Please try again.');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle standard form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Generate URL-friendly slug from name
  const generateSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Auto-generate slug when name changes
  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      slug: '',
      description: '',
      parentId: '',
      isActive: true,
      filterMetadata: {}
    });
    setCurrentItem(null);
    setEditMode(false);
  };

  // Populate form with item data for editing
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.description || '',
      parentId: item.parentId || '',
      isActive: item.isActive !== false,
      filterMetadata: item.filterMetadata || {}
    });
    setCurrentItem(item);
    setEditMode(true);
  };

  // Delete an item after confirmation
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Delete from appropriate service based on active tab
      if (activeTab === 'categories') {
        await categoryService.deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
      } else if (activeTab === 'types') {
        await typeService.deleteType(id);
        setTypes(types.filter(t => t.id !== id));
      } else if (activeTab === 'brands') {
        await brandService.deleteBrand(id);
        setBrands(brands.filter(b => b.id !== id));
      } else if (activeTab === 'countries') {
        await countryService.deleteCountry(id);
        setCountries(countries.filter(c => c.id !== id));
      }
      
      setSuccessMessage('Item deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('Failed to delete item: ' + (error.message || 'Unknown error'));
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Create or update an item
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!formData.slug.trim()) {
      setError('Slug is required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      let savedItem;
      
      // Save to appropriate service based on active tab
      if (activeTab === 'categories') {
        const category = new Category(formData);
        savedItem = await categoryService.saveCategory(category);
        
        if (editMode) {
          setCategories(categories.map(c => c.id === savedItem.id ? savedItem : c));
        } else {
          setCategories([...categories, savedItem]);
        }
      } else if (activeTab === 'types') {
        const type = new Type(formData);
        savedItem = await typeService.saveType(type);
        
        if (editMode) {
          setTypes(types.map(t => t.id === savedItem.id ? savedItem : t));
        } else {
          setTypes([...types, savedItem]);
        }
      } else if (activeTab === 'brands') {
        const brand = new Brand(formData);
        savedItem = await brandService.saveBrand(brand);
        
        if (editMode) {
          setBrands(brands.map(b => b.id === savedItem.id ? savedItem : b));
        } else {
          setBrands([...brands, savedItem]);
        }
      } else if (activeTab === 'countries') {
        const country = new Country(formData);
        savedItem = await countryService.saveCountry(country);
        
        if (editMode) {
          setCountries(countries.map(c => c.id === savedItem.id ? savedItem : c));
        } else {
          setCountries([...countries, savedItem]);
        }
      }
      
      setSuccessMessage(editMode ? 'Item updated successfully' : 'Item created successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      resetForm();
    } catch (error) {
      setError('Failed to save item: ' + (error.message || 'Unknown error'));
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Get data for the currently active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case 'categories':
        return categories;
      case 'types':
        return types;
      case 'brands':
        return brands;
      case 'countries':
        return countries;
      default:
        return [];
    }
  };

  // Get parent options for hierarchical taxonomies
  const getParentOptions = () => {
    if (activeTab === 'categories') {
      return categories.filter(c => c.id !== formData.id);
    } else if (activeTab === 'types') {
      return categories;
    }
    return [];
  };

  // Loading indicator
  if (isLoading && !editMode) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Product Classifications</h1>
      
      {/* Navigation tabs */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              className={`inline-block py-2 px-4 ${
                activeTab === 'categories'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block py-2 px-4 ${
                activeTab === 'types'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('types')}
            >
              Types
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block py-2 px-4 ${
                activeTab === 'brands'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('brands')}
            >
              Brands
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block py-2 px-4 ${
                activeTab === 'countries'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('countries')}
            >
              Countries
            </button>
          </li>
        </ul>
      </div>
      
      {/* Status messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      
      {/* Form and data display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Entity creation/editing form */}
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">
              {editMode ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                ></textarea>
              </div>
              
              {(activeTab === 'categories' || activeTab === 'types') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {activeTab === 'categories' ? 'Parent Category' : 'Category'}
                  </label>
                  <select
                    name="parentId"
                    value={formData.parentId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">None</option>
                    {getParentOptions().map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : editMode ? 'Update' : 'Create'}
                </button>
                
                {editMode && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        {/* Entity listing table */}
        <div className="md:col-span-2">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} List
            </h2>
            
            {getCurrentData().length === 0 ? (
              <p className="text-gray-500">No items found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      {activeTab === 'categories' && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Parent
                        </th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getCurrentData().map(item => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.slug}
                        </td>
                        {activeTab === 'categories' && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.parentId ? 
                              categories.find(c => c.id === item.parentId)?.name || 'Unknown' 
                              : '-'}
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxonomyManagement; 