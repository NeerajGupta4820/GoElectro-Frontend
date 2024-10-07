import  { useState, useEffect } from 'react';
import { useCreateCategoryMutation, useFetchAllCategoriesQuery } from '../../../redux/api/categoryAPI'; 
import { toast } from 'react-toastify'; 
import "./CreateCategory.css";

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [parentCategory, setParentCategory] = useState('');
  const [parentCategories, setParentCategories] = useState([]);
  
  const { data: categoriesData } = useFetchAllCategoriesQuery();
  const [createCategory, { isLoading, isSuccess, isError }] = useCreateCategoryMutation();

  // Fetch parent categories if available from the fetched data
  useEffect(() => {
    if (categoriesData) {
      setParentCategories(categoriesData.data); // Adjust according to your data structure
    }
  }, [categoriesData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Category created successfully!');
      setName('');
      setPhoto(null);
      setParentCategory('');
    }
    if (isError) {
      toast.error('Error creating category');
    }
  }, [isSuccess, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', photo);
    formData.append('parentCategory', parentCategory);

    createCategory(formData);
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        {/* Input for Category Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          required
        />

        {/* Input for Uploading Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        {/* Select for Parent Category */}
        <select
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">Select Parent Category</option>
          {parentCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Category'}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
