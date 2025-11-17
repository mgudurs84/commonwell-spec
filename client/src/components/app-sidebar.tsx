import { FileText, Activity, Link2, Database, Bell, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  categories: Array<{ id: string; name: string; icon?: string }>;
  activeCategory: string | null;
  onCategoryClick: (categoryId: string) => void;
}

const categoryIcons: Record<string, any> = {
  "patient-management": Activity,
  "patient-linking": Link2,
  "fhir-apis": FileText,
  "xca-apis": Database,
  "notifications": Bell,
  "administrative": Settings,
};

export function AppSidebar({ categories, activeCategory, onCategoryClick }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-6 border-b border-sidebar-border">
        <div>
          <h2 className="text-lg font-semibold text-sidebar-foreground">API Documentation</h2>
          <p className="text-xs text-muted-foreground mt-1">CommonWell Health Alliance v4.3</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => {
                const Icon = categoryIcons[category.id] || FileText;
                const isActive = activeCategory === category.id;
                
                return (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton
                      onClick={() => onCategoryClick(category.id)}
                      data-active={isActive}
                      className={isActive ? "bg-sidebar-accent" : ""}
                      data-testid={`button-category-${category.id}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-6 py-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">
          Last Updated: June 3, 2025
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
