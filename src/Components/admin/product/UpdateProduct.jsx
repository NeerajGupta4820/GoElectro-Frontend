import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { useFetchAllCategoriesQuery } from "../../../redux/api/categoryAPI";
import { FaSave } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const { data: productData, isLoading: productLoading } =
    useGetProductByIdQuery(id);
  const { data: categories } = useFetchAllCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [newImages,setNewImages] = useState([{color:"",images:[]}]);
  const [colorImages, setColorImages] = useState([
    { color: "", images: [], _id: "" },
  ]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (productData) {
      setProductName(productData.product.title);
      setPrice(productData.product.price);
      setDescription(productData.product.description);
      setCategory(productData.product.category);
      setBrand(productData.product.brand);
      setColorImages(
        productData.product.images || [{ color: "", images: [], _id: "" }]
      );
    }
  }, [productData]);

  const handleImageChange = (index, e, color) => {
    const files = Array.from(e.target.files);
  
    // Check if the color already exists in the newImages array
    const colorExists = newImages.find(imageObj => imageObj.color === color);
  
    let updatedImages;
    
    if (colorExists) {
      // If color exists, replace the images with the new files (don't append multiple times)
      updatedImages = newImages.map(imageObj =>
        imageObj.color === color
          ? { ...imageObj, images: [...files] } // Replace images with new files
          : imageObj
      );
    } else {
      // If color doesn't exist, create a new object with the color and files
      updatedImages = [
        ...newImages,
        { color: color, images: [...files] }
      ];
    }
  
    setNewImages(updatedImages);
  };
  
  


  const handleColorChange = (index, e) => {
    const updatedColorImages = [...colorImages];
    updatedColorImages[index].color = e.target.value;
    setNewImages(updatedColorImages);
  };

  const addColorImage = () => {
    setNewImages([...colorImages, { color: "", images: [] }]);
  };

  const handleUpload = async (files) => {
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const uploadedImages = [];

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "IBM_Project");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        return response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image.");
        return null;
      }
    });

    setUploading(true);
    try {
      const results = await Promise.all(uploadPromises);
      uploadedImages.push(...results.filter((url) => url !== null));
    } catch (error) {
      console.error("Error during bulk upload:", error);
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }

    return uploadedImages;
  };

  const mergeImagesByColor = (colorImages, productImages) => {
    // Initialize combinedImages by mapping productImages and ensuring the field is imageLinks
    let combinedImages = productImages.map(productImage => ({
      color: productImage.color,
      imageLinks: productImage.imageLinks || [] 
    }));
  
    colorImages.forEach((colorImage) => {
      const existingColor = combinedImages.find(
        (productImage) => productImage.color === colorImage.color
      );
  
      if (existingColor) {
        // Merge imageLinks from colorImages into imageLinks of existingColor
        existingColor.imageLinks = [
          ...existingColor.imageLinks,
          ...(colorImage.imageLinks || []) // Ensure imageLinks exists
        ];
      } else {
        // If the color doesn't exist, add it with imageLinks
        combinedImages.push({
          color: colorImage.color,
          imageLinks: colorImage.imageLinks || [] 
        });
      }
    });
  
    return combinedImages;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productImages = [];
    console.log(newImages);
    for (const colorImage of newImages) {
      console.log(colorImage);
      if (colorImage.color && colorImage.images.length > 0) {
        const uploadedImages = await handleUpload(colorImage.images);
        console.log(uploadedImages);
        if (uploadedImages.length > 0) {
          productImages.push({
            color: colorImage.color,
            imageLinks: uploadedImages,
          });
        }
      }
    }
    console.log("productImages: ",productImages);
    console.log("colorImages: ",colorImages);

    const newim = mergeImagesByColor(colorImages,productImages);
    console.log(newim);

    const updatedProductData = {
      title: productName,
      price,
      description,
      category,
      brand,
      images:newim
    };
    console.log(updatedProductData)

    try {
      await updateProduct({ id, productData: updatedProductData }).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/product");
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product.");
    }
  };

  if (productLoading) return <div>Loading...</div>;

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      <form
        className="update-product-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories?.data.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        {colorImages.map((colorImage, index) => (
          <div key={colorImage._id} className="form-group color-image-group">
            <label htmlFor={`color-${index}`}>Color</label>
            <input
              type="text"
              id={`color-${index}`}
              value={colorImage.color}
              onChange={(e) => handleColorChange(index, e)}
              placeholder="Enter color name"
              required
            />
            <label htmlFor={`images-${index}`}>Upload New Images</label>
            <input
              type="file"
              id={`images-${index}`}
              multiple
              accept="image/*"
              onChange={(e) => handleImageChange(index, e,colorImage.color)}
            />
            <div className="image-preview">
              {colorImage.imageLinks && colorImage.imageLinks.length === 0 ? (
                <p>No images uploaded for this color</p>
              ) : (
                colorImage.imageLinks &&
                colorImage.imageLinks.map((imageLink, i) => (
                  <img
                    key={i}
                    src={imageLink}
                    alt={`preview-${i}`}
                    className="image-thumbnail"
                  />
                ))
              )}
            </div>
          </div>
        ))}
        <button type="button" className="add-color-btn" onClick={addColorImage}>
          Add Another Color and Images
        </button>
        <button className="submit-btn" type="submit" disabled={uploading}>
          <FaSave /> Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
