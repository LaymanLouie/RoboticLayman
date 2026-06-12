import { memo } from "react";
import { Link } from "react-router-dom";
import { NotebookPen, ArrowRight, type LucideIcon } from "lucide-react";
import PageWrapper from "@/layout/PageWrapper";
import PageHeader from "@/components/primitives/PageHeader";
import PageTitle from "@/components/primitives/PageTitle";
import ScrollRevealSection from "@/components/primitives/ScrollRevealSection";
import usePageTitle from "@/hooks/usePageTitle";
import {
  ROUTE_ACCESS,
  isRouteVisible,
  CURRENT_ROLE,
} from "@/config/accessConfig";

interface DashboardTool {
  path: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const TOOLS: DashboardTool[] = [
  {
    path: "/dashboard/notes",
    label: "Notes",
    description:
      "A notepad for your stream ideas, segments, and whatever else is bouncing around in your head.",
    icon: NotebookPen,
  },
];

const Dashboard = memo(function Dashboard() {
  usePageTitle("Dashboard");

  const visibleTools = TOOLS.filter((tool) => {
    const route = ROUTE_ACCESS.find((r) => r.path === tool.path);
    return route ? isRouteVisible(route, CURRENT_ROLE) : false;
  });

  return (
    <PageWrapper>
      <PageHeader
        title={<PageTitle rest="Dashboard" />}
        subtitle="Tools for all streamers! This would be NORMALLY be hidden from the Laypeople."
      />

      <section className="pb-24 px-6">
        <div className="max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto">
          <ScrollRevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {visibleTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="group relative rounded-2xl p-6 bg-gradient-to-br from-muted/20 to-transparent border border-border/30 hover:border-primary/50 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                          {tool.label}
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </PageWrapper>
  );
});

export default Dashboard;
