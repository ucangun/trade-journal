import Navbar from "../components/Navbar";
import WelcomeCard from "../components/Profile/WelcomeCard";
import DepositModal from "../components/Profile/DepositModal";
import StocksList from "../components/Profile/StocksList";
import AddStockModal from "../components/Profile/AddStockModal";
import UpdateStockModal from "../components/Profile/UpdateStockModal";
import StatisticsCard from "../components/Profile/StatisticsCard";
import TransactionModal from "../components/Profile/TransactionModal";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navbar />
      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <WelcomeCard />
        <StatisticsCard />
        <StocksList />

        {/* Modals */}
        <DepositModal />
        <AddStockModal />
        <UpdateStockModal />
        <TransactionModal />
      </main>
    </div>
  );
};

export default Profile;
