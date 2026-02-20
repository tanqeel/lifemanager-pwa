CREATE TABLE `accountability_partners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`partnerId` int NOT NULL,
	`status` enum('pending','active','paused','ended') NOT NULL DEFAULT 'pending',
	`checkInFrequency` enum('daily','weekly','biweekly') NOT NULL DEFAULT 'weekly',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accountability_partners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ai_coaching_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('motivation','planning','problem_solving','socratic','goal_setting') NOT NULL,
	`topic` varchar(255),
	`messages` json,
	`summary` text,
	`recommendations` json,
	`status` enum('active','completed','archived') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_coaching_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consistency_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`date` date NOT NULL,
	`consistencyScore` int NOT NULL DEFAULT 0,
	`prayerScore` int NOT NULL DEFAULT 0,
	`studyScore` int NOT NULL DEFAULT 0,
	`healthScore` int NOT NULL DEFAULT 0,
	`focusRatio` decimal(5,2) NOT NULL DEFAULT '0',
	`taskCompletionRate` decimal(5,2) NOT NULL DEFAULT '0',
	`habitCompletionRate` decimal(5,2) NOT NULL DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consistency_metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`examDate` date,
	`totalMarks` int,
	`passingMarks` int,
	`status` enum('active','completed','dropped') NOT NULL DEFAULT 'active',
	`syllabus` mediumtext,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_lessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`date` date NOT NULL,
	`type` enum('quran','hadith','sunnah','islamic_principle') NOT NULL,
	`content` mediumtext NOT NULL,
	`source` varchar(255) NOT NULL,
	`reference` varchar(255),
	`reflection` text,
	`actionPoints` json,
	`completed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `daily_lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_routines` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('morning','evening','study','exercise','custom') NOT NULL,
	`activities` json,
	`startTime` time,
	`endTime` time,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `daily_routines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `focus_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`taskId` int,
	`startTime` timestamp NOT NULL,
	`endTime` timestamp,
	`duration` int,
	`distractions` int NOT NULL DEFAULT 0,
	`quality` enum('poor','fair','good','excellent') NOT NULL DEFAULT 'good',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `focus_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `goals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` enum('academic','career','health','spiritual','personal') NOT NULL,
	`type` enum('smart','habit','project','milestone') NOT NULL DEFAULT 'smart',
	`priority` enum('low','medium','high','critical') NOT NULL DEFAULT 'medium',
	`startDate` date NOT NULL,
	`targetDate` date NOT NULL,
	`status` enum('active','completed','abandoned') NOT NULL DEFAULT 'active',
	`progress` int NOT NULL DEFAULT 0,
	`islamicAlignment` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `goals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `habit_tracking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`habitId` int NOT NULL,
	`date` date NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`count` int NOT NULL DEFAULT 0,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `habit_tracking_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `habits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` enum('prayer','study','health','spiritual','personal') NOT NULL,
	`frequency` enum('daily','weekly','monthly') NOT NULL DEFAULT 'daily',
	`targetCount` int NOT NULL DEFAULT 1,
	`currentStreak` int NOT NULL DEFAULT 0,
	`longestStreak` int NOT NULL DEFAULT 0,
	`status` enum('active','paused','completed') NOT NULL DEFAULT 'active',
	`startDate` date NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `habits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `health_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`date` date NOT NULL,
	`sleepHours` decimal(4,2),
	`sleepQuality` enum('poor','fair','good','excellent'),
	`exerciseMinutes` int DEFAULT 0,
	`exerciseType` varchar(100),
	`waterIntake` int DEFAULT 0,
	`mood` enum('very_bad','bad','neutral','good','excellent'),
	`energy` enum('very_low','low','medium','high','very_high'),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `health_data_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `islamic_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('quran','hadith','sunnah','islamic_principle') NOT NULL,
	`content` mediumtext NOT NULL,
	`source` varchar(255) NOT NULL,
	`reference` varchar(255),
	`topic` varchar(255),
	`tags` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `islamic_content_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` mediumtext NOT NULL,
	`category` enum('general','golden_rules','things_to_remember','ideas','reflections') NOT NULL DEFAULT 'general',
	`tags` json,
	`isPinned` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('prayer','task','goal','habit','health','coaching','system') NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`channel` enum('in_app','email','whatsapp','sms','push') NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`actionUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`readAt` timestamp,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `prayer_tracking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`date` date NOT NULL,
	`prayerName` enum('fajr','dhuhr','asr','maghrib','isha') NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`timestamp` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `prayer_tracking_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `study_notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`topicId` int,
	`courseId` int,
	`title` varchar(255) NOT NULL,
	`content` mediumtext NOT NULL,
	`format` enum('text','markdown','html') NOT NULL DEFAULT 'markdown',
	`type` enum('summary','detailed','exam_answer','mcq','flashcard') NOT NULL DEFAULT 'summary',
	`tags` json,
	`isExamReady` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `study_notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `study_plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`startDate` date NOT NULL,
	`endDate` date NOT NULL,
	`totalHours` int NOT NULL,
	`completedHours` int NOT NULL DEFAULT 0,
	`status` enum('draft','active','completed') NOT NULL DEFAULT 'draft',
	`schedule` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `study_plans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`goalId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`priority` enum('low','medium','high','critical') NOT NULL DEFAULT 'medium',
	`status` enum('todo','in_progress','completed','blocked') NOT NULL DEFAULT 'todo',
	`dueDate` date,
	`dueTime` time,
	`estimatedHours` decimal(5,2),
	`actualHours` decimal(5,2),
	`subtasks` json,
	`dependencies` json,
	`assignedTo` varchar(255),
	`tags` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `topics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`weightage` int NOT NULL DEFAULT 0,
	`status` enum('not_started','in_progress','completed') NOT NULL DEFAULT 'not_started',
	`studyHours` decimal(5,2) NOT NULL DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `topics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`theme` enum('light','dark','auto') NOT NULL DEFAULT 'light',
	`language` enum('en','ur','ar') NOT NULL DEFAULT 'en',
	`timezone` varchar(50) NOT NULL DEFAULT 'UTC',
	`notificationsEnabled` boolean NOT NULL DEFAULT true,
	`emailNotifications` boolean NOT NULL DEFAULT true,
	`whatsappNotifications` boolean NOT NULL DEFAULT false,
	`smsNotifications` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_preferences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE TABLE `voice_recordings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255),
	`audioUrl` varchar(500) NOT NULL,
	`duration` int,
	`transcription` mediumtext,
	`extractedTasks` json,
	`status` enum('recording','transcribing','completed','error') NOT NULL DEFAULT 'recording',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `voice_recordings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `weekly_reflections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`weekStartDate` date NOT NULL,
	`weekEndDate` date NOT NULL,
	`achievements` mediumtext,
	`challenges` mediumtext,
	`lessonsLearned` mediumtext,
	`improvements` mediumtext,
	`consistencyScore` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `weekly_reflections_id` PRIMARY KEY(`id`)
);
