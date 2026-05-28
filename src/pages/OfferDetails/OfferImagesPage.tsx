import { useLocation } from "react-router-dom";

const OfferImagesPage = () => {
  const location = useLocation();
  const { images } = location.state as { images: string[] };
    const baseUrl = import.meta.env.VITE_BASE_IMG_URL;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 items-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={baseUrl + '/' + image}
            alt={`Offer image ${index + 1}`}
            className="max-w-4xl w-full h-auto object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default OfferImagesPage;
