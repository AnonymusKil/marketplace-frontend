"use client";
import { useMutation } from "@apollo/client/react";
import { BECOME_SELLER } from "@/src/graphql/mutations/store";
import useAuth from "../../../hook/useAuth";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";
import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading";
export default function CreateStore() {
  const [becomeSeller] = useMutation(BECOME_SELLER);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { user, authloading, error } = useAuth();
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!image) return;

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  useEffect(() => {
    if (authloading) return;

    if (error || !user) {
      router.replace("/");
      return;
    }

    if (user.role === "seller") {
      router.replace("/");
    }
  }, [authloading, error, user, router]);
  if (authloading) {
    return <Loading />;
  }

  const uploadImage = async () => {
    if (!image) {
      throw new Error("Please select a store logo");
    }
    const formData = new FormData();
    formData.append("logo", image);

    const res = await fetch(
      "https://marketplace-backend-vv3p.onrender.com/image/upload-logo",
      {
        method: "POST",
        body: formData,
      },
    );
    if (!res.ok) {
      throw new Error("Image upload failed");
    }
    const data = await res.json();
    return {
      imageUrl: data.url,
      publicId: data.publicId,
    };
  };

  const becomeSellerHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Submitting your application...");
    try {
      setSubmitting(true);
      if (!name || !description || !email || !contact || !address) {
        toast.error("Please fill in all fields", {
          id: toastId,
        });

        return;
      }
      if (contact.length < 11) {
        toast.error("Please enter a valid phone number", { id: toastId });
        return;
      }

      if (!image) {
        toast.error("Please upload a logo", {
          id: toastId,
        });

        return;
      }

      const { imageUrl, publicId } = await uploadImage();

      const { data } = await becomeSeller({
        variables: {
          storeName: name,
          description: description,
          businessEmail: email,
          businessPhone: contact,
          businessAddress: address,
          businessLogo: imageUrl,
          publicId: publicId,
        },
      });
      const response = data?.becomeASeller;

      if (!response) {
        throw new Error("Application submission failed");
      }

      if (response.sellerStatus === "Failed") {
        throw new Error(response.message);
      }

      toast.success(response.message, { id: toastId, duration: 5000 });
      router.push("/");
      console.log("Become seller response:", data);
      setName("");
      setDescription("");
      setEmail("");
      setContact("");
      setAddress("");
      setImage(null);
      setPreview("");
    } catch (error) {
      toast.error(error.message || "Failed to submit application", {
        id: toastId,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="mx-6 min-h-[70vh] my-16">
        <form
          onSubmit={becomeSellerHandler}
          className="max-w-7xl mx-auto flex flex-col items-start gap-3 text-slate-500"
        >
          {/* Title */}
          <div>
            <h1 className="text-3xl ">
              Add Your <span className="text-slate-800 font-medium">Store</span>
            </h1>
            <p className="max-w-lg">
              To become a seller on GoCart, submit your store details for
              review. Your store will be activated after admin verification.
            </p>
          </div>

          <label className="mt-10 cursor-pointer">
            Store Logo
            <Image
              src={preview || assets.upload_area}
              className="rounded-lg mt-2 h-16 w-auto"
              alt="store Logo"
              width={150}
              height={100}
            />
            <input
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file) return;

                if (file.size > 5 * 1024 * 1024) {
                  toast.error("Logo must be under 5MB");
                  return;
                }

                setImage(file);
              }}
              type="file"
              disabled={submitting}
              accept="image/*"
              hidden
            />
          </label>

          <p>Name</p>
          <input
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter your store name"
            className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded"
          />

          <p>Description</p>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={5}
            placeholder="Enter your store description"
            className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded resize-none"
          />

          <p>Email</p>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your store email"
            className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded"
          />

          <p>Contact Number</p>
          <input
            name="contact"
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            type="text"
            placeholder="Enter your store contact number"
            className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded"
          />

          <p>Address</p>
          <textarea
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            rows={5}
            placeholder="Enter your store address"
            className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded resize-none"
          />

          <button
            disabled={submitting}
            className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting Application..." : "Become Seller"}{" "}
          </button>
        </form>
      </div>
    </>
  );
}
