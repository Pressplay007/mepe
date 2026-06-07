import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Megaphone,
  Calendar,
  FolderKanban,
  TrendingUp,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { getDashboardStats, type DashboardStats } from "../../services/dashboard";
import { getRecentActivity, type ActivityItem } from "../../services/activity";

const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
};

const Dashboard = () => {
  const [counts, setCounts] = useState<DashboardStats>({
    team: 0,
    announcements: 0,
    upcomingEvents: 0,
    liveProjects: 0,
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    getDashboardStats().then(setCounts).catch(() => {});
    getRecentActivity().then(setRecentActivity).catch(() => {});
  }, []);

  const stats = [
    {
      name: "Total Team",
      value: String(counts.team),
      icon: Users,
      change: "Executive directory",
      color: "bg-blue-500",
    },
    {
      name: "Announcements",
      value: String(counts.announcements),
      icon: Megaphone,
      change: "Published & drafts",
      color: "bg-mda-pink",
    },
    {
      name: "Upcoming Events",
      value: String(counts.upcomingEvents),
      icon: Calendar,
      change: "On the calendar",
      color: "bg-purple-500",
    },
    {
      name: "Live Projects",
      value: String(counts.liveProjects),
      icon: FolderKanban,
      change: "In progress",
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="space-y-10 animate-reveal ">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display text-mda-maroon uppercase leading-tight">
            SYSTEM <span className="text-mda-pink">OVERVIEW</span>
          </h1>
          <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide">
            Welcome back, here is what's happening today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-[15px] border border-mda-maroon/5 shadow-sm hover:shadow-xl hover:shadow-mda-maroon/5 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 rounded-[10px] ${stat.color} bg-opacity-10 text-mda-maroon group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={24} className="text-mda-maroon" />
              </div>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <h3 className="text-3xl font-display text-mda-maroon">
              {stat.value}
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 mt-1">
              {stat.name}
            </p>
            <div className="mt-4 pt-4 border-t border-mda-maroon/5 flex items-center justify-between">
              <span className="text-[10px] font-medium text-mda-maroon/60">
                {stat.change}
              </span>
              <ArrowUpRight size={12} className="text-mda-pink" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-mda-maroon/5 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-mda-maroon/5 flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-mda-maroon">
              Recent Activity
            </h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-mda-pink hover:text-mda-maroon transition-colors">
              View All
            </button>
          </div>
          <div className="divide-y divide-mda-maroon/5">
            {recentActivity.length === 0 && (
              <div className="p-8 text-center text-[10px] font-bold uppercase tracking-widest text-mda-maroon/30">
                No activity yet.
              </div>
            )}
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-6 flex items-center justify-between hover:bg-mda-cream/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-mda-cream rounded-xl flex items-center justify-center">
                    <Activity size={16} className="text-mda-maroon/40" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-mda-maroon uppercase ">
                      {activity.action}
                    </p>
                    <p className="text-[10px] text-mda-maroon/40 mt-1 font-medium">
                      {activity.type} • {timeAgo(activity.createdAt)}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-mda-maroon/5 rounded-lg transition-colors">
                  <ArrowUpRight size={14} className="text-mda-maroon/20" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-mda-maroon px-2">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <Link
              to="/admin/announcements"
              className="bg-mda-maroon text-white p-6 rounded-[15px] flex items-center justify-between hover:scale-[1.02] transition-all shadow-lg shadow-mda-maroon/20 group"
            >
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest mb-1">
                  New Announcement
                </p>
                <p className="text-[9px] text-white/50 font-medium">
                  Broadcast to the community
                </p>
              </div>
              <Megaphone
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
            </Link>
            <Link
              to="/admin/team"
              className="bg-mda-pink text-mda-maroon p-6 rounded-[15px] flex items-center justify-between hover:scale-[1.02] transition-all shadow-lg shadow-mda-pink/10 group"
            >
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest mb-1">
                  Add Team Member
                </p>
                <p className="text-[9px] text-mda-maroon/50 font-medium">
                  Update the directory
                </p>
              </div>
              <Users
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
            </Link>
            <Link
              to="/admin/events"
              className="bg-white border border-mda-maroon/5 p-6 rounded-[15px] flex items-center justify-between hover:scale-[1.02] transition-all shadow-sm group"
            >
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-mda-maroon mb-1">
                  Create Event
                </p>
                <p className="text-[9px] text-mda-maroon/40 font-medium">
                  Schedule a new activity
                </p>
              </div>
              <Calendar
                size={20}
                className="text-mda-maroon/20 group-hover:rotate-12 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes reveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `,
        }}
      />
    </div>
  );
};

export default Dashboard;
