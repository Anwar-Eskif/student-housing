type DeleteDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading: boolean;
};

const DeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
}: DeleteDialogProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl p-6 shadow-xl bg-white"
      >
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-full px-6 py-2 font-bold text-primary transition-colors "
            disabled={isLoading}
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full bg-red-400 px-6 py-2 font-bold text-on-error transition-opacity hover:opacity-90 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin" />
            ) : (
              "حذف"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
