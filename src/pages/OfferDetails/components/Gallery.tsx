import { useNavigate } from "react-router-dom";

interface GalleryProps {
  images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/offer-images", { state: { images } });
  };

  const visibleImages = images.slice(0, 5);
  const remainingImages = images.length - visibleImages.length;
  const baseUrl = import.meta.env.VITE_BASE_IMG_URL;

  return (
    <div
      onClick={handleImageClick}
      className="grid grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[550px] mb-12 rounded-3xl overflow-hidden shadow-sm cursor-pointer"
    >
      <div
        className="col-span-2 row-span-2 bg-center bg-no-repeat bg-cover hover:brightness-95 transition-all"
        style={{ backgroundImage: `url("${baseUrl}/${images[0]}")` }}
      ></div>
      <div
        className="col-span-1 row-span-1 bg-center bg-no-repeat bg-cover hover:brightness-95 transition-all"
        style={{ backgroundImage: `url("${baseUrl}/${images[1]}")` }}
      ></div>
      <div
        className="col-span-1 row-span-1 bg-center bg-no-repeat bg-cover hover:brightness-95 transition-all"
        style={{ backgroundImage: `url("${baseUrl}/${images[2]}")` }}
      ></div>
      <div
        className="col-span-1 row-span-1 bg-center bg-no-repeat bg-cover hover:brightness-95 transition-all"
        style={{ backgroundImage: `url("${baseUrl}/${images[3]}")` }}
      ></div>
      <div
        className="col-span-1 row-span-1 bg-center bg-no-repeat bg-cover hover:brightness-95 transition-all relative"
        style={{ backgroundImage: `url("${baseUrl}/${images[4]}")` }}
      >
        {images.length > 5 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-white font-bold text-lg">
              +{remainingImages} صور
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
