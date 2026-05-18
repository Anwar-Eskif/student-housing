import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addNewOffer } from "../../../../services/api";
import {
  CloudUpload,
  Info,
  Plus,
  Wifi,
  Car,
  Wind,
  CookingPot,
  X,
  Dumbbell,
  ChefHat,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  title: Yup.string().required("العنوان مطلوب"),
  description: Yup.string().required("الوصف مطلوب"),
  price: Yup.number().positive("يجب أن يكون السعر رقمًا موجبًا").required("السعر مطلوب"),
  location: Yup.string().required("الموقع مطلوب"),
  rooms_count: Yup.number().min(1, "يجب أن يكون هناك غرفة واحدة على الأقل").required("عدد الغرف مطلوب"),
  amenities: Yup.array().of(Yup.string()),
  status: Yup.string().oneOf(["active", "inactive"]),
  images: Yup.array().min(1, "يجب تحميل صورة واحدة على الأقل"),
});

const AddOffer = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addNewOffer,
    onSuccess: () => {
      // Invalidate and refetch
      console.log("Offer added successfully!");
      navigate("/platform/my-offers");
    },
    onError: (error) => {
      console.error("Error adding offer:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      rooms_count: 1,
      amenities: [],
      status: "active",
      images: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("location", values.location);
      formData.append("rooms_count", values.rooms_count.toString());
      formData.append("amenities", JSON.stringify(values.amenities));
      formData.append("status", values.status);
      selectedImages.forEach((file) => {
        formData.append(`images`, file);
      });
      mutation.mutate(formData);
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...files]);
      formik.setFieldValue("images", [...formik.values.images, ...files]);
      event.target.value = ""; // Clear the input
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevSelected) => prevSelected.filter((_, i) => i !== index));
    formik.setFieldValue(
      "images",
      formik.values.images.filter((_, i) => i !== index)
    );
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-1 p-4 md:p-8 pt-20 pb-24 md:pb-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            إضافة عرض جديد
          </h1>
          <p className="text-gray-500 text-sm">
            أدخل تفاصيل العقار الجديد لعرضه للطلاب.
          </p>
        </header>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CloudUpload className="text-teal-600" />
              صور العقار
            </h2>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center bg-white relative overflow-hidden group cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={handleBoxClick}
            >
              {selectedImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview ${index}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div
                        onClick={(e) => {
                          e.stopPropagation(); // prevent opening file dialog
                          handleRemoveImage(index);
                        }}
                        className="absolute top-1 right-1 z-10 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center">
                  <CloudUpload className="text-4xl text-gray-400 mb-2 group-hover:text-teal-600 transition-colors" />
                  <p className="text-gray-400 text-sm">
                   انقر لاختيار ملفات
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0"
                onChange={handleImageChange}
                style={{ pointerEvents: "none" }}
              />
            </div>
            {formik.touched.images && formik.errors.images && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.images}</div>
            )}
          </section>

          {/* Basic Information */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Info className="text-teal-600" />
              المعلومات الأساسية
            </h2>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                عنوان العرض
              </label>
              <input
                type="text"
                id="title"
                placeholder="مثال: غرفة واسعة في سكن مشترك قريب من الجامعة"
                className="w-full p-2 rounded-lg border-gray-300 bg-white text-gray-800 focus:border-teal-500 focus:ring-teal-500 shadow-sm"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                تفاصيل العرض
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="صف العقار بالتفصيل..."
                className="w-full p-2 rounded-lg border-gray-300 bg-white text-gray-800 focus:border-teal-500 focus:ring-teal-500 shadow-sm"
                {...formik.getFieldProps("description")}
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  السعر الشهري (دولار / شهر)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="price"
                    placeholder="0"
                    className="w-full p-2 rounded-lg border-gray-300 bg-white text-gray-800 focus:border-teal-500 focus:ring-teal-500 shadow-sm"
                    {...formik.getFieldProps("price")}
                  />
                </div>
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="rooms_count"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  عدد الغرف
                </label>
                <select
                  id="rooms_count"
                  className="w-full py-1 rounded-lg border-gray-300 bg-white text-gray-800 focus:border-teal-500 focus:ring-teal-500 shadow-sm"
                  {...formik.getFieldProps("rooms_count")}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5+</option>
                </select>
                {formik.touched.rooms_count && formik.errors.rooms_count && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.rooms_count}</div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                الموقع (العنوان / الحي)
              </label>
              <input
                type="text"
                id="location"
                placeholder="مثال: حي الجامعة، شارع الملك عبدالله"
                className="w-full p-2 rounded-lg border-gray-300 bg-white text-gray-800 focus:border-teal-500 focus:ring-teal-500 shadow-sm"
                {...formik.getFieldProps("location")}
              />
              {formik.touched.location && formik.errors.location && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.location}</div>
              )}
            </div>
          </section>

          {/* Amenities & Status */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Info className="text-teal-600" />
              الملحقات والحالة
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                الملحقات (Amenities)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: "واي فاي", icon: <Wifi className="text-sm text-gray-500" /> },
                  { name: "غسيل ملابس", icon: <CookingPot className="text-sm text-gray-500" /> },
                  { name: "مواقف سيارات", icon: <Car className="text-sm text-gray-500" /> },
                  { name: "تكييف", icon: <Wind className="text-sm text-gray-500" /> },
                  { name: "يحتوي على مطبخ", icon: <ChefHat className="text-sm text-gray-500" /> },
                  { name: "صالة رياضية", icon: <Dumbbell className="text-sm text-gray-500" /> },
                ].map((amenity) => (
                  <label key={amenity.name} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={amenity.name}
                      onChange={formik.handleChange}
                      className="text-teal-600 rounded border-gray-400 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700 flex items-center gap-1">
                      {amenity.icon} {amenity.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">
                    حالة العرض
                  </h3>
                  <p className="text-xs text-gray-500">
                    تحديد ما إذا كان العرض متاحاً للطلاب الآن.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formik.values.status === "active"}
                    onChange={(e) => formik.setFieldValue("status", e.target.checked ? "active" : "inactive")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-8 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 font-medium transition-colors shadow-sm flex items-center gap-2 disabled:bg-gray-400"
            >
              {mutation.isPending ? "جاري النشر..." : <><Plus /> نشر العرض</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;
