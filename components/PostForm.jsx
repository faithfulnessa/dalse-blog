"use client";
import Image from "next/image";
import React, { useState } from "react";
const PostForm = ({ action, initialData, submitLabel = "Publish post" }) => {
  const [preview, setPreview] = useState(initialData?.image ?? null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(null);
  const MAX_IMAGE_BYTES = 0.9 * 1024 * 1024; // 5MB
  async function handleSubmit(formData) {
    alert("handle submitted");
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > MAX_IMAGE_BYTES) {
      setImageError(
        `That image is ${(imageFile.size / (1024 * 1024)).toFixed(1)}MB. Please choose one under 1MB.`,
      );
      return;
    }
    setIsSubmitting(true);
    try {
      await action(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }
  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError(
        `That image is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Please choose one under 1MB.`,
      );
      e.target.value = ""; // clear the invalid selection so it can't be submitted
      setPreview(initialData?.image ?? null);
      return;
    }
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }
  return (
    <form
      action={handleSubmit}
      className="max-w-2xl mx-auto flex flex-col gap-5 mt-8 px-5 pb-16"
    >
      {/* {error && (
        <p className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
          {error}
        </p>
      )} */}

      <div>
        <label
          htmlFor="title"
          className="block font-bold text-sm mb-2 uppercase"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialData?.title}
          placeholder="Post title"
          className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block font-bold text-sm mb-2 uppercase"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={initialData?.description}
          placeholder="Short summary shown on the homepage"
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block font-bold text-sm mb-2 uppercase"
        >
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          required
          defaultValue={initialData?.category}
          placeholder="Post category (Tech, Travel, Food...)"
          className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="image"
          className="block font-bold text-sm mb-2 uppercase"
        >
          Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!initialData}
          className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-primary file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-black file:text-white file:text-xs cursor-pointer"
        />
        {imageError && (
          <p c lassName="text-xs text-red-600 mt-2">
            {imageError}
          </p>
        )}
        {preview && (
          <div className="relative w-full h-48 mt-3 rounded-2xl overflow-hidden bg-gray-100">
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
        )}
        {initialData && (
          <p className="text-xs text-gray-500 mt-2">
            Leave empty to keep the current image.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="block font-bold text-sm mb-2 uppercase"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          defaultValue={initialData?.content}
          placeholder="Write your blog post here..."
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white font-semibold rounded-full py-3 mt-2 hover:bg-primary transition-colors disabled:opacity-60 cursor-pointer"
      >
        Publish Now
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
};

export default PostForm;
