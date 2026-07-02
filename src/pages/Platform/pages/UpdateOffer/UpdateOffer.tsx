import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CloudUpload,
  Info,
  Wifi,
  Car,
  Wind,
  CookingPot,
  X,
  Dumbbell,
  ChefHat,
  Plus,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOfferDetails, updateOffer } from "../../../../services/api";

const getEmbedUrl = (input: string): string => {
  const trimmed = input.trim();
  if (trimmed.startsWith("<iframe")) {
    const match = trimmed.match(/src=["']([^"']+)["']/i);
    return match ? match[1] : trimmed;
  }
  return trimmed;
};

const isValidMapUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return (
      (parsed.hostname.includes("google.com") || parsed.hostname.includes("google.co")) &&
      parsed.pathname.includes("/maps")
    );
  } catch {
    return false;
  }
};

const validationSchema = Yup.object({
  title: Yup.string().required("العنوان مطلوب"),
  description: Yup.string().required("الوصف مطلوب"),
  price: Yup.number().positive("يجب أن يكون السعر رقمًا موجبًا").required("السعر مطلوب"),
  location: Yup.string().required("الموقع مطلوب"),
  rooms_count: Yup.number().min(1, "يجب أن يكون هناك غرفة واحدة على الأقل").required("عدد الغرف مطلوب"),
  amenities: Yup.array().of(Yup.string()),
  status: Yup.string().oneOf(["active", "inactive"]),
  images: Yup.array().min(1, "يجب تحميل صورة واحدة على الأقل"),
  map_embed_url: Yup.string().required("رابط الخريطة مطلوب"),
});

const UpdateOffer = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { offerId } = useParams<{ offerId: string }>();
  
  const { data: offerData } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: () => getOfferDetails(Number(offerId)),
    enabled: !!offerId,
  });

  const updateOfferMutation = useMutation({
    mutationFn: ({ offerId, offerData }: { offerId: number; offerData: FormData }) =>
      updateOffer(offerId, offerData),
    onSuccess: () => {
      navigate("/platform/my-offers");
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      rooms_count: 1,
      amenities: [] as string[],
      status: "active",
      images: [] as (string | File)[],
      map_embed_url: "",
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
      if (values.map_embed_url) {
        formData.append("map_embed_url", getEmbedUrl(values.map_embed_url));
      } else {
        formData.append("map_embed_url", "");
      }
      selectedImages.forEach((file) => {
        formData.append(`images`, file);
      });

      if (offerId) {
        updateOfferMutation.mutate({
          offerId: Number(offerId),
          offerData: formData,
        });
      }
    },
  });

  useEffect(() => {
    if (offerData) {
      const offer = offerData.offer;
      formik.setValues({
        title: offer.title,
        description: offer.description,
        price: offer.price,
        location: offer.location,
        rooms_count: offer.rooms_count,
        amenities: offer.amenities || [],
        status: offer.status,
        images: offer.images || [],
        map_embed_url: offer.map_embed_url || "",
      });
    }
  }, [offerData]);

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
              تحديث العقار
          </h1>
          <p className="text-gray-500 text-sm">
              قم بتحديث تفاصيل عقارك لجذب المزيد من الطلاب.
          </p>
        </header>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Existing Images Section */}
          {offerData && offerData.offer.images && offerData.offer.images.length > 0 && (
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                صور العقار الحالية
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                هذه هي الصور الحالية للعقار. يمكنك إضافة المزيد من الصور باستخدام قسم "صور العقار" أدناه.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {offerData.offer.images.map((image: string, index: number) => (
                  <div key={index} className="relative group">
                    <img
                      src={`${import.meta.env.VITE_BASE_IMG_URL}/${image}`}
                      alt={`existing image ${index}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

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
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
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
            <div>
              <label
                htmlFor="map_embed_url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                رابط تضمين الخريطة (Google Maps Embed Code / Link)
              </label>
              <textarea
                id="map_embed_url"
                rows={2}
                placeholder='أدخل كود iframe المضمن أو رابط الخريطة المباشر (مثل: <iframe src="https://www.google.com/maps/embed..." ...></iframe>)'
                className="w-full p-2 rounded-lg border-gray-300 bg-white text-gray-800 focus:border-teal-500 focus:ring-teal-500 shadow-sm"
                {...formik.getFieldProps("map_embed_url")}
              />
              <p className="text-xs text-gray-500 mt-1">
                يمكنك الحصول على هذا الكود من خرائط Google عبر الضغط على "مشاركة" ثم "تضمين خريطة" ونسخ الكود.
              </p>
              {formik.touched.map_embed_url && formik.errors.map_embed_url && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.map_embed_url}</div>
              )}
              {formik.values.map_embed_url && (
                (() => {
                  const extractedUrl = getEmbedUrl(formik.values.map_embed_url);
                  if (isValidMapUrl(extractedUrl)) {
                    return (
                      <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <iframe
                          src={extractedUrl}
                          width="100%"
                          height="300"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="معاينة خريطة العقار"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="text-amber-600 text-sm mt-2 flex items-center gap-1">
                        ⚠️ الرابط أو الكود المدخل غير صالح كخريطة Google Maps مضمنة. يرجى إدخال كود تضمين Google Maps بشكل صحيح.
                      </div>
                    );
                  }
                })()
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
                      checked={(formik.values.amenities as string[]).includes(amenity.name)}
                      onChange={formik.handleChange}
                      className="text-teal-600 rounded border-gray-400 focus:ring-teal-500"
                    />
                    {amenity.icon}
                    <span className="text-sm font-medium text-gray-800">{amenity.name}</span>
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
              disabled={updateOfferMutation.isPending}
              className="px-8 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 font-medium transition-colors shadow-sm flex items-center gap-2 disabled:bg-gray-400"
            >
              {updateOfferMutation.isPending ? "جاري التحديث..." : <><Plus /> تحديث العرض</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOffer;
