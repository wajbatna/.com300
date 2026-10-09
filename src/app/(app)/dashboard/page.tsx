import { Boxes, CreditCard, Receipt, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { PeriodSelect } from "@/components/dashboard/PeriodSelect";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { StockAlerts } from "@/components/dashboard/StockAlerts";
import { getDashboardData } from "@/services/dashboard";
import type { Period } from "@/types";
import { formatMAD } from "@/utils/format";

export const dynamic = "force-dynamic";

const PERIODS: Period[] = ["today", "week", "month", "year"];

export default async function DashboardPage({ searchParams }: { searchParams: { period?: string } }) {
  const period = PERIODS.includes(searchParams.period as Period) ? (searchParams.period as Period) : "month";
  const { stats, chart, alerts, fullName } = await getDashboardData(period);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">مرحبًا بك {fullName && `يا ${fullName}`} 👋</h1>
          <p className="text-muted">متجرك في أمان</p>
        </div>
        <PeriodSelect current={period} />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
        <StatCard title="المبيعات" value={formatMAD(stats.sales)} icon={ShoppingCart} tone="green" change={stats.salesChange} />
        <StatCard title="المصاريف" value={formatMAD(stats.expenses)} icon={Receipt} tone="red" change={stats.expensesChange} invert />
        <StatCard title="الأرباح" value={formatMAD(stats.profit)} icon={TrendingUp} tone="green" change={stats.profitChange} />
        <StatCard title="الديون المستحقة" value={formatMAD(stats.debts)} icon={CreditCard} />
        <StatCard title="قيمة المخزون" value={formatMAD(stats.stockValue)} icon={Boxes} />
        <StatCard title="عدد العملاء" value={String(stats.customers)} icon={Users} />
      </div>

      <SalesChart data={chart} />

      <div className="grid gap-4 lg:grid-cols-2">
        <StockAlerts alerts={alerts} />
        <div className="card p-4 lg:p-6">
          <h2 className="mb-4 text-lg font-extrabold">ملخص الأرباح</h2>
          <dl className="space-y-3 text-[15px]">
            <div className="flex justify-between"><dt className="text-muted">إجمالي المبيعات</dt><dd className="font-bold" dir="ltr">{formatMAD(stats.sales)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">إجمالي تكلفة البضاعة</dt><dd className="font-bold" dir="ltr">{formatMAD(stats.cogs)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">إجمالي المصاريف</dt><dd className="font-bold" dir="ltr">{formatMAD(stats.expenses)}</dd></div>
            <div className="flex justify-between border-t pt-3 text-lg"><dt className="font-extrabold">صافي الربح</dt><dd className="font-extrabold text-brand" dir="ltr">{formatMAD(stats.profit)}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}
