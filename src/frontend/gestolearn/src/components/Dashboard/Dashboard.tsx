import UserProfile from './UserProfile';
import ProgressBar from './ProgressBar';
import PostHistory from './PostHistory';
import Leaderboard from './Leaderboard';
import Rewards from './Rewards';
import ActivitiesCompleted from './ActivitiesCompleted';
import '../../../App.css';
import Copyright from '../Footer/Copyright';

interface DashboardProps {
  user: any;
}


function Dashboard ({user}: DashboardProps) {
  return (
    <div>
    <div className="container mx-auto p-4 mt-10 font-serif">
      <h2 className="text-center mb-9 font-bold font-serif underline underline-offset-8 decoration-blue-400 text-3xl">
        {" "}
        Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {/* User Profile */}
          <UserProfile user={user}/>
        
        {/* Lessons Completed */}
          <ActivitiesCompleted />
        
        <div className="space-y-4">
          {/* Progress */}
            <div className="p-4 rounded-lg space-y-6 shadow-lg bg-neutral-50">
              <h2 className="font-bold text-lg mb-4 text-center">Progress Overall</h2>
              <ProgressBar percentage={100} label="Category 1" />
              <ProgressBar percentage={75} label="Category 2" />
            </div>
            <Rewards />
        </div>
        {/* Post History */}
          <PostHistory />
        
        {/* Points & lives left */}
          <Leaderboard/>
      </div>
    </div>
    <Copyright />
    </div>
  );
};
export default Dashboard;
