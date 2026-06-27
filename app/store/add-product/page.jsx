"use client";

import { useMutation } from "@apollo/client/react";
import { CREATE_PRODUCT } from "@/src/graphql/mutations/product";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function StoreAddProduct() {
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Beauty & Health",
    "Toys & Games",
    "Sports & Outdoors",
    "Books & Media",
    "Food & Drink",
    "Hobbies & Crafts",
    "Others",
  ];

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    images: [],
    publicId: "",
  });

  const [loading, setLoading] = useState(false);

  const uploadProductImage = async (file) => {
    const formData = new FormData();
    formData.append("images", file);

    const res = await fetch(
      "https://marketplace-backend-vv3p.onrender.com/image/upload-product-image",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    return await res.json();
  };

  const onChangeHandler = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]:
        e.target.name === "price"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const selectedImages = Object.values(images).filter(Boolean);

      if (selectedImages.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      const uploadedImages = await Promise.all(
        selectedImages.map((file) => uploadProductImage(file))
      );

      const imageUrls = uploadedImages.flatMap(
        (img) => img.imageUrls || []
      );

      const publicIds = uploadedImages.flatMap(
        (img) => img.publicIds || []
      );

      const { data } = await createProduct({
        variables: {
            input: {
                name: productInfo.name,
                description: productInfo.description,
                price: Number(productInfo.price),
                category: productInfo.category,
                images: imageUrls,
                publicId: publicIds[0] || "",
              },
            },
      });

      toast.success(data?.createProduct?.message || "Product created");

      setProductInfo({
        name: "",
        description: "",
        price: 0,
        category: "",
        images: [],
        publicId: "",
      });

      setImages({
        1: null,
        2: null,
        3: null,
        4: null,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="text-slate-500 mb-28"
    >
      <h1 className="text-2xl">
        Add New <span className="text-slate-800 font-medium">Products</span>
      </h1>

      <p className="mt-7">Product Images</p>

      <div htmlFor="" className="flex gap-3 mt-4">
        {Object.keys(images).map((key) => (
          <label key={key} htmlFor={`images${key}`}>
            <Image
              width={300}
              height={300}
              className="h-15 w-auto border border-slate-200 rounded cursor-pointer"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.upload_area
              }
              alt=""
            />

            <input
              type="file"
              accept="image/*"
              id={`images${key}`}
              onChange={(e) =>
                setImages({
                  ...images,
                  [key]: e.target.files[0],
                })
              }
              hidden
            />
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-2 my-6">
        Name
        <input
          type="text"
          name="name"
          onChange={onChangeHandler}
          value={productInfo.name}
          placeholder="Enter product name"
          className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded"
          required
        />
      </label>

      <label className="flex flex-col gap-2 my-6">
        Description
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={productInfo.description}
          placeholder="Enter product description"
          rows={5}
          className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded resize-none"
          required
        />
      </label>

      <div className="flex gap-5">
        <label className="flex flex-col gap-2">
          Price ($)
          <input
            type="number"
            name="price"
            onChange={onChangeHandler}
            value={productInfo.price}
            placeholder="0"
            className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded resize-none"
            required
          />
        </label>
      </div>

      <select
        onChange={(e) =>
          setProductInfo({
            ...productInfo,
            category: e.target.value,
          })
        }
        value={productInfo.category}
        className="w-full max-w-sm p-2 px-4 my-6 outline-none border border-slate-200 rounded"
        required
      >
        <option value="">Select a category</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <br />

      <button
        disabled={loading}
        className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}