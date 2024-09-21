import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAllProductsQuery,
  useCreateProductMutation,
  useCreateReviewMutation,
  useDeleteProductMutation,
  useGetNewProductsQuery,
  useGetProductByIdQuery,
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useGetTopProductsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";

import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed! Try again");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product creation failed! Try again");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
      console.log(res.image);
      console.log(imageUrl);
    } catch (error) {
      toast.error(Error?.data?.message || error.message);
    }
  };

  return (
    <div className="container xl:mx-[4.3rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        {/* AdminMenu */}
        <div className="md:w-3/4 p-3">
          <div className="h-6">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product image"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 py-11 block w-full text-center rounded-lg cursor-pointer font-bold">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex fex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name=""
                  className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id=""
                />
              </div>

              <div className="tow ml-10">
                <label htmlFor="name block">Price</label>
                <input
                  type="number"
                  name=""
                  className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id=""
                />
              </div>
            </div>

            <div className="flex fex-wrap">
              <div className="one ">
                <label htmlFor="name block">Quantity</label>
                <input
                  type="number"
                  name=""
                  className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  id=""
                />
              </div>

              <div className="tow ml-10">
                <label htmlFor="name block">Brand</label>
                <input
                  type="text"
                  name=""
                  className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  id=""
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              name=""
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[100%] text-white"
              id=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  name=""
                  id=""
                />
              </div>

              <div>
                <label htmlFor="">Category</label>
                <br />
                <select
                  name=""
                  id=""
                  placeholder="Choose Category"
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-4 mb-3 w-[27rem] border rounded-lg bg-[#101011] text-white"
                >
                  {categories?.map((product) => (
                    <option value={product._id} key={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
