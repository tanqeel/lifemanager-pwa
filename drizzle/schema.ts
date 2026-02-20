import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  decimal,
  json,
  date,
  time,
  mediumtext,
  foreignKey,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User preferences and settings
 */
export const userPreferences = mysqlTable("user_preferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  theme: mysqlEnum("theme", ["light", "dark", "auto"]).default("light").notNull(),
  language: mysqlEnum("language", ["en", "ur", "ar"]).default("en").notNull(),
  timezone: varchar("timezone", { length: 50 }).default("UTC").notNull(),
  notificationsEnabled: boolean("notificationsEnabled").default(true).notNull(),
  emailNotifications: boolean("emailNotifications").default(true).notNull(),
  whatsappNotifications: boolean("whatsappNotifications").default(false).notNull(),
  smsNotifications: boolean("smsNotifications").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserPreference = typeof userPreferences.$inferSelect;
export type InsertUserPreference = typeof userPreferences.$inferInsert;

/**
 * Courses and academic management
 */
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  examDate: date("examDate"),
  totalMarks: int("totalMarks"),
  passingMarks: int("passingMarks"),
  status: mysqlEnum("status", ["active", "completed", "dropped"]).default("active").notNull(),
  syllabus: mediumtext("syllabus"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

/**
 * Course topics for structured learning
 */
export const topics = mysqlTable("topics", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  weightage: int("weightage").default(0).notNull(),
  status: mysqlEnum("status", ["not_started", "in_progress", "completed"]).default("not_started").notNull(),
  studyHours: decimal("studyHours", { precision: 5, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Topic = typeof topics.$inferSelect;
export type InsertTopic = typeof topics.$inferInsert;

/**
 * Study notes and materials
 */
export const studyNotes = mysqlTable("study_notes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  topicId: int("topicId"),
  courseId: int("courseId"),
  title: varchar("title", { length: 255 }).notNull(),
  content: mediumtext("content").notNull(),
  format: mysqlEnum("format", ["text", "markdown", "html"]).default("markdown").notNull(),
  type: mysqlEnum("type", ["summary", "detailed", "exam_answer", "mcq", "flashcard"]).default("summary").notNull(),
  tags: json("tags"),
  isExamReady: boolean("isExamReady").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StudyNote = typeof studyNotes.$inferSelect;
export type InsertStudyNote = typeof studyNotes.$inferInsert;

/**
 * Study plans and schedules
 */
export const studyPlans = mysqlTable("study_plans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  totalHours: int("totalHours").notNull(),
  completedHours: int("completedHours").default(0).notNull(),
  status: mysqlEnum("status", ["draft", "active", "completed"]).default("draft").notNull(),
  schedule: json("schedule"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StudyPlan = typeof studyPlans.$inferSelect;
export type InsertStudyPlan = typeof studyPlans.$inferInsert;

/**
 * Goals and objectives
 */
export const goals = mysqlTable("goals", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["academic", "career", "health", "spiritual", "personal"]).notNull(),
  type: mysqlEnum("type", ["smart", "habit", "project", "milestone"]).default("smart").notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high", "critical"]).default("medium").notNull(),
  startDate: date("startDate").notNull(),
  targetDate: date("targetDate").notNull(),
  status: mysqlEnum("status", ["active", "completed", "abandoned"]).default("active").notNull(),
  progress: int("progress").default(0).notNull(),
  islamicAlignment: varchar("islamicAlignment", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Goal = typeof goals.$inferSelect;
export type InsertGoal = typeof goals.$inferInsert;

/**
 * Tasks and to-do items
 */
export const tasks = mysqlTable("tasks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  goalId: int("goalId"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  priority: mysqlEnum("priority", ["low", "medium", "high", "critical"]).default("medium").notNull(),
  status: mysqlEnum("status", ["todo", "in_progress", "completed", "blocked"]).default("todo").notNull(),
  dueDate: date("dueDate"),
  dueTime: time("dueTime"),
  estimatedHours: decimal("estimatedHours", { precision: 5, scale: 2 }),
  actualHours: decimal("actualHours", { precision: 5, scale: 2 }),
  subtasks: json("subtasks"),
  dependencies: json("dependencies"),
  assignedTo: varchar("assignedTo", { length: 255 }),
  tags: json("tags"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;

/**
 * Habits and routines
 */
export const habits = mysqlTable("habits", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["prayer", "study", "health", "spiritual", "personal"]).notNull(),
  frequency: mysqlEnum("frequency", ["daily", "weekly", "monthly"]).default("daily").notNull(),
  targetCount: int("targetCount").default(1).notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  status: mysqlEnum("status", ["active", "paused", "completed"]).default("active").notNull(),
  startDate: date("startDate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Habit = typeof habits.$inferSelect;
export type InsertHabit = typeof habits.$inferInsert;

/**
 * Daily habit tracking
 */
export const habitTracking = mysqlTable("habit_tracking", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  habitId: int("habitId").notNull(),
  date: date("date").notNull(),
  completed: boolean("completed").default(false).notNull(),
  count: int("count").default(0).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HabitTracking = typeof habitTracking.$inferSelect;
export type InsertHabitTracking = typeof habitTracking.$inferInsert;

/**
 * Health and wellness data
 */
export const healthData = mysqlTable("health_data", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  date: date("date").notNull(),
  sleepHours: decimal("sleepHours", { precision: 4, scale: 2 }),
  sleepQuality: mysqlEnum("sleepQuality", ["poor", "fair", "good", "excellent"]),
  exerciseMinutes: int("exerciseMinutes").default(0),
  exerciseType: varchar("exerciseType", { length: 100 }),
  waterIntake: int("waterIntake").default(0),
  mood: mysqlEnum("mood", ["very_bad", "bad", "neutral", "good", "excellent"]),
  energy: mysqlEnum("energy", ["very_low", "low", "medium", "high", "very_high"]),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HealthData = typeof healthData.$inferSelect;
export type InsertHealthData = typeof healthData.$inferInsert;

/**
 * Prayer tracking
 */
export const prayerTracking = mysqlTable("prayer_tracking", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  date: date("date").notNull(),
  prayerName: mysqlEnum("prayerName", ["fajr", "dhuhr", "asr", "maghrib", "isha"]).notNull(),
  completed: boolean("completed").default(false).notNull(),
  timestamp: timestamp("timestamp"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PrayerTracking = typeof prayerTracking.$inferSelect;
export type InsertPrayerTracking = typeof prayerTracking.$inferInsert;

/**
 * Daily Islamic lessons (Hadith/Quran)
 */
export const dailyLessons = mysqlTable("daily_lessons", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  date: date("date").notNull(),
  type: mysqlEnum("type", ["quran", "hadith", "sunnah", "islamic_principle"]).notNull(),
  content: mediumtext("content").notNull(),
  source: varchar("source", { length: 255 }).notNull(),
  reference: varchar("reference", { length: 255 }),
  reflection: text("reflection"),
  actionPoints: json("actionPoints"),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DailyLesson = typeof dailyLessons.$inferSelect;
export type InsertDailyLesson = typeof dailyLessons.$inferInsert;

/**
 * User notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["prayer", "task", "goal", "habit", "health", "coaching", "system"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  channel: mysqlEnum("channel", ["in_app", "email", "whatsapp", "sms", "push"]).notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  actionUrl: varchar("actionUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  readAt: timestamp("readAt"),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Voice recordings and transcriptions
 */
export const voiceRecordings = mysqlTable("voice_recordings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }),
  audioUrl: varchar("audioUrl", { length: 500 }).notNull(),
  duration: int("duration"),
  transcription: mediumtext("transcription"),
  extractedTasks: json("extractedTasks"),
  status: mysqlEnum("status", ["recording", "transcribing", "completed", "error"]).default("recording").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VoiceRecording = typeof voiceRecordings.$inferSelect;
export type InsertVoiceRecording = typeof voiceRecordings.$inferInsert;

/**
 * AI coaching sessions
 */
export const aiCoachingSessions = mysqlTable("ai_coaching_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["motivation", "planning", "problem_solving", "socratic", "goal_setting"]).notNull(),
  topic: varchar("topic", { length: 255 }),
  messages: json("messages"),
  summary: text("summary"),
  recommendations: json("recommendations"),
  status: mysqlEnum("status", ["active", "completed", "archived"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AiCoachingSession = typeof aiCoachingSessions.$inferSelect;
export type InsertAiCoachingSession = typeof aiCoachingSessions.$inferInsert;

/**
 * Consistency and performance metrics
 */
export const consistencyMetrics = mysqlTable("consistency_metrics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  date: date("date").notNull(),
  consistencyScore: int("consistencyScore").default(0).notNull(),
  prayerScore: int("prayerScore").default(0).notNull(),
  studyScore: int("studyScore").default(0).notNull(),
  healthScore: int("healthScore").default(0).notNull(),
  focusRatio: decimal("focusRatio", { precision: 5, scale: 2 }).default("0").notNull(),
  taskCompletionRate: decimal("taskCompletionRate", { precision: 5, scale: 2 }).default("0").notNull(),
  habitCompletionRate: decimal("habitCompletionRate", { precision: 5, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ConsistencyMetric = typeof consistencyMetrics.$inferSelect;
export type InsertConsistencyMetric = typeof consistencyMetrics.$inferInsert;

/**
 * User notes and knowledge base
 */
export const notes = mysqlTable("notes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: mediumtext("content").notNull(),
  category: mysqlEnum("category", ["general", "golden_rules", "things_to_remember", "ideas", "reflections"]).default("general").notNull(),
  tags: json("tags"),
  isPinned: boolean("isPinned").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Note = typeof notes.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;

/**
 * Focus sessions and distraction tracking
 */
export const focusSessions = mysqlTable("focus_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  taskId: int("taskId"),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime"),
  duration: int("duration"),
  distractions: int("distractions").default(0).notNull(),
  quality: mysqlEnum("quality", ["poor", "fair", "good", "excellent"]).default("good").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FocusSession = typeof focusSessions.$inferSelect;
export type InsertFocusSession = typeof focusSessions.$inferInsert;

/**
 * Islamic content database (Hadith/Quran)
 */
export const islamicContent = mysqlTable("islamic_content", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["quran", "hadith", "sunnah", "islamic_principle"]).notNull(),
  content: mediumtext("content").notNull(),
  source: varchar("source", { length: 255 }).notNull(),
  reference: varchar("reference", { length: 255 }),
  topic: varchar("topic", { length: 255 }),
  tags: json("tags"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type IslamicContent = typeof islamicContent.$inferSelect;
export type InsertIslamicContent = typeof islamicContent.$inferInsert;

/**
 * Daily routines and schedules
 */
export const dailyRoutines = mysqlTable("daily_routines", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["morning", "evening", "study", "exercise", "custom"]).notNull(),
  activities: json("activities"),
  startTime: time("startTime"),
  endTime: time("endTime"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DailyRoutine = typeof dailyRoutines.$inferSelect;
export type InsertDailyRoutine = typeof dailyRoutines.$inferInsert;

/**
 * Weekly reflection and muhasaba
 */
export const weeklyReflections = mysqlTable("weekly_reflections", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  weekStartDate: date("weekStartDate").notNull(),
  weekEndDate: date("weekEndDate").notNull(),
  achievements: mediumtext("achievements"),
  challenges: mediumtext("challenges"),
  lessonsLearned: mediumtext("lessonsLearned"),
  improvements: mediumtext("improvements"),
  consistencyScore: int("consistencyScore"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WeeklyReflection = typeof weeklyReflections.$inferSelect;
export type InsertWeeklyReflection = typeof weeklyReflections.$inferInsert;

/**
 * Accountability partnerships
 */
export const accountabilityPartners = mysqlTable("accountability_partners", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  partnerId: int("partnerId").notNull(),
  status: mysqlEnum("status", ["pending", "active", "paused", "ended"]).default("pending").notNull(),
  checkInFrequency: mysqlEnum("checkInFrequency", ["daily", "weekly", "biweekly"]).default("weekly").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AccountabilityPartner = typeof accountabilityPartners.$inferSelect;
export type InsertAccountabilityPartner = typeof accountabilityPartners.$inferInsert;
