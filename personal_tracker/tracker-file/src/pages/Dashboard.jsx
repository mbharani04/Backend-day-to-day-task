import React from 'react';
import { CheckSquare, Target, Clock, BarChart2, Flame } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { WelcomeHeader } from '../components/dashboard/WelcomeHeader';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { TodaysTasks } from '../components/dashboard/TodaysTasks';
import { TodaysTargets } from '../components/dashboard/TodaysTargets';
import { ProductivityOverview } from '../components/dashboard/ProductivityOverview';
import { StudyTimerCard } from '../components/dashboard/StudyTimerCard';
import { UpcomingReminders } from '../components/dashboard/UpcomingReminders';
import { UpcomingEvents } from '../components/dashboard/UpcomingEvents';
import { LearningProgress } from '../components/dashboard/LearningProgress';
import { AttendanceSummary } from '../components/dashboard/AttendanceSummary';
import { QuickNotesWidget } from '../components/dashboard/QuickNotesWidget';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { TodaysTimelineCard } from '../components/dashboard/TodaysTimelineCard';
import { useProductivity } from '../context/ProductivityContext';
import {
  calculateProductivityPercentage,
  calculateStudyTimeStats,
  calculateStreak,
} from '../utils/calculations';

export const Dashboard = () => {
  const { tasks, targets, studySessions, activityLogs } = useProductivity();

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysTasks = tasks.filter((t) => t.dueDate === todayStr);
  const completedTodaysTasks = todaysTasks.filter((t) => t.status === 'Completed').length;
  const taskPct = todaysTasks.length > 0 ? Math.round((completedTodaysTasks / todaysTasks.length) * 100) : 0;

  const dailyTargets = targets.filter((t) => t.type === 'Daily');
  const activeDailyTarget = dailyTargets[0];

  const studyStats = calculateStudyTimeStats(studySessions);
  const prodPct = calculateProductivityPercentage(tasks);
  const streakStats = calculateStreak(activityLogs, tasks, studySessions);

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* TOP: Welcome Header Banner */}
        <WelcomeHeader />

        {/* ROW 1: Summary Cards Bento (Includes Active Streak Card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <SummaryCard
            title="Today's Tasks"
            mainValue={`${completedTodaysTasks} / ${todaysTasks.length}`}
            subtitle="Tasks Completed"
            progressPercentage={taskPct}
            icon={CheckSquare}
            accentColor="indigo"
            comparisonText={taskPct >= 80 ? '🔥 On track today!' : 'Keep pushing'}
          />

          <SummaryCard
            title="Today's Target"
            mainValue={
              activeDailyTarget
                ? `${activeDailyTarget.currentProgress}/${activeDailyTarget.targetValue}`
                : '0 / 0'
            }
            subtitle={activeDailyTarget ? activeDailyTarget.title : 'No target set'}
            progressPercentage={
              activeDailyTarget
                ? Math.round(
                  (activeDailyTarget.currentProgress / activeDailyTarget.targetValue) * 100
                )
                : 0
            }
            icon={Target}
            accentColor="emerald"
            comparisonText={activeDailyTarget ? activeDailyTarget.unit : 'Daily goal'}
          />

          <SummaryCard
            title="Study Time"
            mainValue={`${studyStats.todayHours}h`}
            subtitle="Today's Focus Time"
            progressPercentage={Math.min(100, Math.round((parseFloat(studyStats.todayHours) / 4) * 100))}
            icon={Clock}
            accentColor="cyan"
            comparisonText={`Weekly: ${studyStats.weeklyHours}h total`}
          />

          <SummaryCard
            title="Productivity"
            mainValue={`${prodPct}%`}
            subtitle="Overall Completion"
            progressPercentage={prodPct}
            icon={BarChart2}
            accentColor="purple"
            comparisonText={prodPct > 50 ? 'Above target rate' : 'Needs attention'}
          />

          <SummaryCard
            title="Current Streak"
            mainValue={`${streakStats.currentStreak} Days`}
            subtitle="Consecutive Productive"
            progressPercentage={Math.min(100, (streakStats.currentStreak / 30) * 100)}
            icon={Flame}
            accentColor="amber"
            comparisonText={`Best Streak: ${streakStats.longestStreak} Days`}
          />
        </div>

        {/* TODAY'S TIMELINE CARD - POSITIONED DIRECTLY BELOW ACTIVE STREAK */}
        <TodaysTimelineCard />

        {/* ROW 2: Today's Tasks & Productivity Doughnut Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TodaysTasks />
          </div>
          <div>
            <ProductivityOverview />
          </div>
        </div>

        {/* ROW 3: Focus Timer & Today's Targets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudyTimerCard />
          <TodaysTargets />
        </div>

      </div>
    </PageTransition>
  );
};

export default Dashboard;
