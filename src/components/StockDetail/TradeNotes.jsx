import { useState, useEffect } from "react";
import useStockCall from "../../hooks/useStockCall";
import LoadingButton from "../../components/LoadingButton";

const TradeNotes = ({ stockId, initialNotes = "" }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [isSaving, setIsSaving] = useState(false);
  const { addStockNotes } = useStockCall();

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const handleSaveNotes = async () => {
    if (!stockId) return;

    setIsSaving(true);

    await addStockNotes(stockId, notes);
    setIsSaving(false);
  };

  return (
    <div className="pt-6 mt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-[#161616] mb-4">Position Notes</h2>

      <div className="p-6 rounded-lg shadow-sm bg-gray-50">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              Trading Journal
            </h3>
            <div className="text-xs text-gray-500">
              {notes.length}/1000 characters
            </div>
          </div>

          <textarea
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-[#041737] focus:border-[#041737] min-h-[150px] text-gray-700"
            rows="6"
            placeholder="Document your trading strategy, lessons learned, and reasons for closing this position..."
            value={notes}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                setNotes(e.target.value);
              }
            }}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <LoadingButton
            onClick={handleSaveNotes}
            className="px-4 py-2 text-sm font-medium text-white bg-[#041737] rounded-md hover:bg-[#0F2743] transition-colors"
            isLoading={isSaving}
            loadingText="Saving..."
          >
            Save Notes
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default TradeNotes;
