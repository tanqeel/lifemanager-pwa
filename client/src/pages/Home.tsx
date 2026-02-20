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
  ArrowRight,
  Smartphone,
  Lock,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated && user) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">LifeManager</h1>
              <p className="text-xs text-muted-foreground">AlwaysOn</p>
            </div>
          </div>
          <a href={getLoginUrl()}>
            <Button className="gap-2">
              Login <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              🌙 Islamic Discipline-First Life Operating System
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Transform Your Life with Structure & Discipline
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            LifeManager/AlwaysOn is not just an app. It's a comprehensive Islamic life operating system that replaces chaos with structure, enforces discipline, and helps you achieve excellence in academics, career, health, and spirituality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href={getLoginUrl()}>
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>

          {/* Hero Features Grid */}
          <div className="rounded-2xl border-2 border-border bg-card/50 backdrop-blur p-12 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-primary/5 border border-primary/20">
                <Compass className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="font-semibold">Prayer Times</p>
                <p className="text-sm text-muted-foreground mt-2">Track prayers with Qibla compass</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-accent/5 border border-accent/20">
                <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="font-semibold">Study Engine</p>
                <p className="text-sm text-muted-foreground mt-2">Syllabus to exam mastery</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-secondary/5 border border-secondary/20">
                <Brain className="w-12 h-12 text-secondary mx-auto mb-4" />
                <p className="font-semibold">AI Coaching</p>
                <p className="text-sm text-muted-foreground mt-2">Islamic motivational support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Complete Life Management System
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: <Compass className="w-8 h-8" />,
                title: "Prayer Times & Islamic Content",
                description: "Daily Hadith/Quran lessons, prayer tracking, Qibla compass, and Islamic calendar",
                color: "text-primary",
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Study & Syllabus Engine",
                description: "Upload syllabus, generate study plans, create exam-ready notes, MCQ generator",
                color: "text-accent",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Agentic Planner",
                description: "Natural language task ingestion, voice input, subtask decomposition, calendar sync",
                color: "text-secondary",
              },
              {
                icon: <Flame className="w-8 h-8" />,
                title: "Habits & Consistency",
                description: "Streak tracking, anchor routines, root-cause analytics, adaptive nudges",
                color: "text-orange-600",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Health & Immunity",
                description: "Sleep tracking, exercise reminders, anti-sedentary detection, energy cycles",
                color: "text-red-600",
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "AI-Powered Coaching",
                description: "Islamic motivational coaching, Socratic dialogues, personalized guidance",
                color: "text-blue-600",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all border-border/50 hover:border-primary/50">
                <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Philosophy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Discipline > Motivation",
                description:
                  "Structure that works even when motivation fades. Enforce responsibility through systematic design.",
              },
              {
                title: "Islamic First",
                description:
                  "Allah (ﷻ) priority, Qur'an alignment, authentic Hadith, and Sunnah implementation.",
              },
              {
                title: "Plan → Monitor → Correct → Execute",
                description:
                  "A complete cycle that ensures you not only plan but actually execute with accountability.",
              },
              {
                title: "Knowledge → Amal → Character",
                description:
                  "Transform knowledge into action and character. Build discipline as your identity.",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-all">
                <h3 className="text-lg font-bold mb-2 text-primary">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why LifeManager?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">PWA Ready</h3>
              <p className="text-muted-foreground">
                Install on any device. Works offline. Syncs when online.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Your data is yours. End-to-end encryption. No tracking.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Optimized performance. Instant interactions. No lag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <p className="text-muted-foreground">Features & Capabilities</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">20+</div>
              <p className="text-muted-foreground">Integrated Modules</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">100%</div>
              <p className="text-muted-foreground">Islamic Aligned</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">∞</div>
              <p className="text-muted-foreground">Scalability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students, professionals, and seekers who are building discipline, consistency, and excellence through LifeManager.
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="gap-2">
              Start Your Journey Today <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">LifeManager</h3>
              <p className="text-sm text-muted-foreground">
                Islamic discipline-first life operating system.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 LifeManager. All rights reserved. Built with Islamic principles.</p>
            <p className="mt-2 italic">"Indeed, with hardship comes ease." - Quran 94:5</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
