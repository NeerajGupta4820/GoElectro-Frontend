import React, { useState } from "react";
import {
  useFetchAllCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} from "../../../redux/api/couponAPI";
import { useGetAllProductsQuery } from "../../../redux/api/productAPI";
import { toast } from "react-toastify";
import "./CouponPage.css";

const CouponPage = () => {
  const { data: coupons, isLoading, error } = useFetchAllCouponsQuery();
  const { data: products } = useGetAllProductsQuery();

  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    products: [],
  });
  const [editCoupon, setEditCoupon] = useState(null);

  const handleAddCoupon = async () => {
    if (newCoupon.code && newCoupon.discount && newCoupon.products.length > 0) {
      try {
        await createCoupon(newCoupon).unwrap();
        setNewCoupon({ code: "", discount: "", products: [] });
        toast.success("Added successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          draggable: true,
          theme: "dark",
        });
      } catch (error) {
        toast.error(`Failed to add coupon: ${error.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          draggable: true,
          theme: "dark",
        });
        console.error("Failed to add coupon:", error);
      }
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditCoupon({
      ...coupon,
      products: coupon.products.map((product) => product._id),
    });
  };

  const handleUpdateCoupon = async () => {
    try {
      console.log(editCoupon);

      await updateCoupon(editCoupon).unwrap();
      setEditCoupon(null);
      toast.success("Updated successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error(`Failed to update coupon: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        draggable: true,
        theme: "dark",
      });
      console.error("Failed to update coupon:", error);
    }
  };

  const handleDeleteCoupon = async (coupon) => {
    try {
      await deleteCoupon(coupon._id).unwrap();
      toast.success("Deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error(`Failed to delete coupon: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        draggable: true,
        theme: "dark",
      });
      console.error(error);
    }
  };

  const toggleProductSelection = (productId) => {
    if (editCoupon) {
      const updatedProducts = editCoupon.products.includes(productId)
        ? editCoupon.products.filter((id) => id !== productId)
        : [...editCoupon.products, productId];
      setEditCoupon({ ...editCoupon, products: updatedProducts });
    } else {
      const updatedProducts = newCoupon.products.includes(productId)
        ? newCoupon.products.filter((id) => id !== productId)
        : [...newCoupon.products, productId];
      setNewCoupon({ ...newCoupon, products: updatedProducts });
    }
  };

  return (
    <div className="coupon-page">
      <h2>Coupons</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading coupons</p>
      ) : (
        <table className="coupon-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Products</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>₹{coupon.discount}</td>
                <td>{coupon.products.length}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditCoupon(coupon)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCoupon(coupon)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="coupon-form">
        <h3>{editCoupon ? "Update Coupon" : "Add New Coupon"}</h3>
        <input
          type="text"
          placeholder="Coupon Code"
          value={editCoupon ? editCoupon.code : newCoupon.code}
          onChange={(e) =>
            editCoupon
              ? setEditCoupon({ ...editCoupon, code: e.target.value })
              : setNewCoupon({ ...newCoupon, code: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Discount Amount"
          value={editCoupon ? editCoupon.discount : newCoupon.discount}
          onChange={(e) =>
            editCoupon
              ? setEditCoupon({ ...editCoupon, discount: e.target.value })
              : setNewCoupon({ ...newCoupon, discount: e.target.value })
          }
        />

        <div className="product-selection">
          <h4>Select Products</h4>
          <div className="product-table-scrollable">
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Title</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.products?.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={(editCoupon
                            ? editCoupon.products
                            : newCoupon.products
                          ).includes(product._id)}
                          onChange={() => toggleProductSelection(product._id)}
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>
                        <img
                          src={product.images[0].imageLinks[0]}
                          className="product-table-image"
                          alt="product"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={editCoupon ? handleUpdateCoupon : handleAddCoupon}
          className="submit-btn"
        >
          {editCoupon ? "Update Coupon" : "Add Coupon"}
        </button>
      </div>
    </div>
  );
};

export default CouponPage;
