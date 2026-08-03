import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Skeleton } from './components/ui/Skeleton';

// Lazy-loaded Page Chunks
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const GraphExplorerPage = lazy(() => import('./pages/GraphExplorerPage').then(m => ({ default: m.GraphExplorerPage })));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage').then(m => ({ default: m.RoadmapPage })));
const RolesPage = lazy(() => import('./pages/RolesPage').then(m => ({ default: m.RolesPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    },
  },
});

const PageLoader = () => (
  <div className="p-8 space-y-4">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-4 w-96" />
    <Skeleton className="h-96 w-full rounded-2xl" />
  </div>
);

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
          <Navbar />
          
          <div className="flex-1 flex max-w-7xl w-full mx-auto">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/explorer" element={<GraphExplorerPage />} />
                  <Route path="/roadmap-view" element={<RoadmapPage />} />
                  <Route path="/roles" element={<RolesPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                </Routes>
              </Suspense>
            </main>
          </div>

          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
};
