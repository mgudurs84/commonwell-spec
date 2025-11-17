import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ApiEndpointCard } from "@/components/ApiEndpointCard";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { ApiCategory } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedEndpoints, setExpandedEndpoints] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const { data: categories, isLoading } = useQuery<ApiCategory[]>({
    queryKey: ["/api/categories"],
  });

  const toggleEndpoint = (id: string) => {
    setExpandedEndpoints((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    
    if (!searchQuery.trim()) return categories;

    const query = searchQuery.toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        endpoints: category.endpoints.filter(
          (endpoint) =>
            endpoint.title.toLowerCase().includes(query) ||
            endpoint.endpoint.toLowerCase().includes(query) ||
            endpoint.method.toLowerCase().includes(query) ||
            endpoint.description.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.endpoints.length > 0);
  }, [categories, searchQuery]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element) {
      // Scroll the element into view with an offset for the sticky header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const [id, element] of Object.entries(categoryRefs.current)) {
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveCategory(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sidebarStyle = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Skeleton className="h-12 w-96 mb-4" />
          <Skeleton className="h-6 w-64 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar
          categories={
            categories?.map((cat) => ({
              id: cat.id,
              name: cat.name,
            })) || []
          }
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
        
        <div className="flex flex-col flex-1 min-w-0">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search endpoints by name, method, or description..."
              />
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="mb-12">
                <h1 className="text-4xl font-medium text-foreground mb-3 tracking-tight">
                  CommonWell Health Alliance API
                </h1>
                <p className="text-lg text-muted-foreground mb-2">
                  Specification v4.3 - Complete API Reference
                </p>
                <p className="text-sm text-muted-foreground">
                  Comprehensive documentation for REST, FHIR, XCA, and HL7 integration endpoints
                </p>
              </div>

              {filteredCategories.length === 0 && searchQuery ? (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No endpoints found</h3>
                  <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
                    No API endpoints match your search for <span className="font-semibold">"{searchQuery}"</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search terms or browse all categories
                  </p>
                </div>
              ) : (
                <>
                  {searchQuery && (
                    <div className="mb-6 px-4 py-3 bg-muted/50 rounded-md border border-border">
                      <p className="text-sm text-muted-foreground">
                        Found <span className="font-semibold text-foreground">
                          {filteredCategories.reduce((acc, cat) => acc + cat.endpoints.length, 0)}
                        </span> endpoint{filteredCategories.reduce((acc, cat) => acc + cat.endpoints.length, 0) !== 1 ? 's' : ''} matching "{searchQuery}"
                      </p>
                    </div>
                  )}
                  <div className="space-y-12">
                    {filteredCategories.map((category) => (
                      <section
                        key={category.id}
                        ref={(el) => {
                          categoryRefs.current[category.id] = el;
                        }}
                        data-testid={`section-category-${category.id}`}
                      >
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className="h-1 w-12 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <h2 className="text-2xl font-medium text-foreground">
                              {category.name}
                            </h2>
                          </div>
                          <p className="text-sm text-muted-foreground ml-15">
                            {category.description}
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          {category.endpoints.map((endpoint) => (
                            <ApiEndpointCard
                              key={endpoint.id}
                              endpoint={endpoint}
                              isExpanded={expandedEndpoints.has(endpoint.id)}
                              onToggle={() => toggleEndpoint(endpoint.id)}
                            />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
