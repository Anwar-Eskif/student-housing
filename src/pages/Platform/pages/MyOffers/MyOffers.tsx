import { Link } from "react-router-dom";
import OfferCard from "./OfferCard";
import { Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteOffer, getlandLordOffers } from "../../../../services/api";
import { Offer } from "../../../../types/types";
import { useState } from "react";
import DeleteDialog from "./components/DeleteDialog";

const MyOffers = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["landlord-offers"],
    queryFn: getlandLordOffers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landlord-offers"] });
      setIsDeleteDialogOpen(false);
      setSelectedOfferId(null);
    },
  });

  const handleDelete = (id: number) => {
    setSelectedOfferId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedOfferId) {
      deleteMutation.mutate(selectedOfferId);
    }
  };

  const offers = data?.offers || [];

  const totalOffers = offers.length;
  const activeOffers = offers.filter(
    (offer: Offer) => offer.status === "active"
  ).length;
  const rentedOffers = totalOffers - activeOffers;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching offers</div>;
  }

  return (
    <>
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <header className="flex justify-between items-end">
            <div>
              <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">
                إدارة عروضي
              </h1>
              <p className="text-on-surface-variant">
                قم بإدارة ومتابعة جميع عقاراتك المعروضة.
              </p>
            </div>
            <button className="bg-primary  text-stone-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
              <Link className="flex" to="/platform/add-offer">
                <Plus />
                إضافة عرض
              </Link>
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl shadow-xl flex flex-col gap-2">
              <span className="text-on-surface-variant text-sm font-medium">
                إجمالي العروض
              </span>
              <span className="text-3xl font-bold text-primary">
                {totalOffers}
              </span>
            </div>
            <div className="p-6 rounded-2xl shadow-xl flex flex-col gap-2">
              <span className="text-on-surface-variant text-sm font-medium">
                عروض نشطة
              </span>
              <span className="text-3xl font-bold text-secondary">
                {activeOffers}
              </span>
            </div>
            <div className="p-6 rounded-2xl shadow-xl flex flex-col gap-2">
              <span className="text-on-surface-variant text-sm font-medium">
                عروض غير نشطة
              </span>
              <span className="text-3xl font-bold text-red-400">
                {rentedOffers}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer: Offer) => (
              <OfferCard key={offer.id} offer={offer} onDelete={handleDelete} />
            ))}
          </div>

          {/* <div className="flex justify-end mt-4">
          <div className="flex items-center gap-2">
            <button disabled>
              <ChevronRight />
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container font-bold">1</button>
            <button className="w-10 h-10 rounded-lg">2</button>
            <button className="w-10 h-10 rounded-lg">3</button>
            <button>
              <ChevronLeft />
            </button>
          </div>
        </div> */}
        </div>
      </main>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد أنك تريد حذف هذا العرض؟ لا يمكن التراجع عن هذا الإجراء."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default MyOffers;
