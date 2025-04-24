import { useSelector, useDispatch } from "react-redux";
import { FaEuroSign } from "react-icons/fa";
import { openModal } from "../../features/capitalDepositSlice";

const WelcomeCard = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#161616]">
            Welcome ,{" "}
            {currentUser?.firstName + " " + currentUser?.lastName || "User"}!
          </h2>
          <p className="mt-1 text-gray-600">
            Here's an overview of your trading portfolio
          </p>
        </div>
        <div>
          <button
            onClick={handleOpenModal}
            className="flex items-center px-4 py-2 bg-[#e6edf5] text-[#041737] rounded-md hover:bg-[#ccdaeb] transition-colors"
          >
            <FaEuroSign className="mr-2" />
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
