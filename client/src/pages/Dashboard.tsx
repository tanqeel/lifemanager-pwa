import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Compass,
  BookOpen,
  Zap,
  Heart,
  Brain,
  TrendingUp,
  CheckCircle2,
  Flame,
  Moon,
  LogOut,
  Settings,
  Bell,
  Menu,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect to home if not authenticated
  if (!isAuthenticated || !user) {
    window.location.href = "/";
    return null;
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">LifeManager</h1>
              <p className="text-xs text-muted-foreground">{today}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-accent/10 rounded-lg transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex items-center gap-2 p-2 hover:bg-accent/10 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">{user.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed lg:relative lg:translate-x-0 left-0 top-16 lg:top-0 w-64 h-[calc(100vh-4rem)] lg:h-screen bg-card border-r border-border transition-transform duration-300 z-30 overflow-y-auto`}
        >
          <nav className="p-6 space-y-2">
            {[
              { icon: Compass, label: "Prayer Times", href: "#prayer" },
              { icon: BookOpen, label: "Study", href: "#study" },
              { icon: Zap, label: "Tasks", href: "#tasks" },
              { icon: Flame, label: "Habits", href: "#habits" },
              { icon: Heart, label: "Health", href: "#health" },
              { icon: Brain, label: "Coaching", href: "#coaching" },
              { icon: TrendingUp, label: "Analytics", href: "#analytics" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors text-foreground hover:text-primary"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}

            <div className="border-t border-border my-4 pt-4">
              <a
                href="#settings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors text-foreground hover:text-primary"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </a>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-colors text-foreground hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              As-salamu alaikum, {user.name?.split(" ")[0] || "Friend"}! 👋
            </h2>
            <p className="text-muted-foreground">
              Welcome back to your Islamic life operating system. Let's make today count.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-border/50 hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Consistency Score</p>
                  <p className="text-3xl font-bold text-primary">85%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary/50" />
              </div>
            </Card>

            <Card className="p-6 border-border/50 hover:border-accent/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prayer Streak</p>
                  <p className="text-3xl font-bold text-accent">12 days</p>
                </div>
                <Compass className="w-8 h-8 text-accent/50" />
              </div>
            </Card>

            <Card className="p-6 border-border/50 hover:border-secondary/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tasks Today</p>
                  <p className="text-3xl font-bold text-secondary">5/8</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-secondary/50" />
              </div>
            </Card>

            <Card className="p-6 border-border/50 hover:border-orange-600/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Study Hours</p>
                  <p className="text-3xl font-bold text-orange-600">3.5h</p>
                </div>
                <BookOpen className="w-8 h-8 text-orange-600/50" />
              </div>
            </Card>
          </div>

          {/* Prayer Times Section */}
          <section id="prayer" className="mb-8">
            <h3 className="text-2xl font-bold mb-4">🕌 Prayer Times Today</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { name: "Fajr", time: "5:30 AM", completed: true },
                { name: "Dhuhr", time: "12:45 PM", completed: true },
                { name: "Asr", time: "3:30 PM", completed: false },
                { name: "Maghrib", time: "6:15 PM", completed: false },
                { name: "Isha", time: "7:45 PM", completed: false },
              ].map((prayer, idx) => (
                <Card
                  key={idx}
                  className={`p-4 text-center border-2 transition-all cursor-pointer ${
                    prayer.completed
                      ? "border-primary/50 bg-primary/5"
                      : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold text-lg mb-2">{prayer.name}</p>
                  <p className="text-sm text-muted-foreground mb-3">{prayer.time}</p>
                  {prayer.completed ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                      ✓ Completed
                    </span>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full">
                      Mark Done
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </section>

          {/* Daily Lesson Section */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-4">📖 Daily Islamic Lesson</h3>
            <Card className="p-6 border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">
                    Surah Al-Asr (Chapter 103)
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    "By the passage of time, indeed, mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience."
                  </p>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    This Surah reminds us that time is precious and we are accountable for how we spend it. Our salvation lies in faith, good deeds, and mutual support in truth and patience.
                  </p>
                  <Button variant="outline" size="sm">
                    Reflect on this lesson
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* Today's Tasks */}
          <section id="tasks" className="mb-8">
            <h3 className="text-2xl font-bold mb-4">✅ Today's Tasks</h3>
            <div className="space-y-3">
              {[
                {
                  title: "Complete Math Assignment",
                  priority: "high",
                  completed: false,
                },
                {
                  title: "Review Islamic Studies Notes",
                  priority: "critical",
                  completed: true,
                },
                { title: "Exercise - 30 mins", priority: "medium", completed: false },
                { title: "Prepare for Tomorrow's Class", priority: "high", completed: false },
                { title: "Read Quran - Juz 15", priority: "critical", completed: true },
              ].map((task, idx) => (
                <Card
                  key={idx}
                  className={`p-4 flex items-center gap-4 border-border/50 hover:border-primary/50 transition-all cursor-pointer ${
                    task.completed ? "bg-primary/5" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        task.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.priority === "critical"
                        ? "bg-red-500/20 text-red-700"
                        : task.priority === "high"
                          ? "bg-orange-500/20 text-orange-700"
                          : "bg-blue-500/20 text-blue-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </Card>
              ))}
            </div>
          </section>

          {/* Habits Section */}
          <section id="habits" className="mb-8">
            <h3 className="text-2xl font-bold mb-4">🔥 Today's Habits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Morning Adhkar", streak: 15, completed: true },
                { name: "Study Session", streak: 8, completed: false },
                { name: "Exercise", streak: 12, completed: false },
              ].map((habit, idx) => (
                <Card
                  key={idx}
                  className={`p-4 border-border/50 hover:border-primary/50 transition-all ${
                    habit.completed ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold">{habit.name}</h4>
                    {habit.completed && <span className="text-primary">✓</span>}
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-1">Streak</p>
                    <p className="text-2xl font-bold text-accent">{habit.streak}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {habit.completed ? "Completed ✓" : "Mark Complete"}
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-4">⚡ Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-16 gap-2">
                <Zap className="w-5 h-5" />
                <span>Add Task</span>
              </Button>
              <Button variant="outline" className="h-16 gap-2">
                <Brain className="w-5 h-5" />
                <span>AI Coaching</span>
              </Button>
              <Button variant="outline" className="h-16 gap-2">
                <Moon className="w-5 h-5" />
                <span>Log Sleep</span>
              </Button>
              <Button variant="outline" className="h-16 gap-2">
                <BookOpen className="w-5 h-5" />
                <span>Study Now</span>
              </Button>
            </div>
          </section>

          {/* Motivational Quote */}
          <section className="mb-8">
            <Card className="p-8 border-2 border-primary/50 bg-gradient-to-r from-primary/10 to-accent/10 text-center">
              <p className="text-lg italic text-foreground mb-2">
                "Indeed, with hardship comes ease."
              </p>
              <p className="text-sm text-muted-foreground">Quran 94:5</p>
            </Card>
          </section>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
