import Incidentlist from "../components/Incidentlist";
import Incidentplayer from "../components/Incidentplayer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-800 p-4 text-white">
      <div className="flex gap-4 h-[500px]">
        
        
        <div className="flex-[4] bg-gray-800 rounded-lg overflow-hidden">
          <div className="h-full">
            <Incidentplayer />
          </div>
        </div>

        
        <div className="flex-[3] bg-gray-800 rounded-lg overflow-hidden">
          <div className="h-[460px] overflow-y-auto p-2 no-scrollbar">
            <Incidentlist />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
