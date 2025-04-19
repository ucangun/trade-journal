import Navbar from "../components/Navbar";
import WelcomeCard from "../components/Profile/WelcomeCard";
import DepositModal from "../components/Profile/DepositModal";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navbar />
      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <WelcomeCard />
        <DepositModal />
      </main>
    </div>
  );
};

export default Profile;
