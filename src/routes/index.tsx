import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ROUTE_PATHS } from './paths';
import { useUserContext, useLectureStatus } from '@/context';
import { PageLayout } from '@/shared/components/Layout/PageLayout';
import { ErrorBoundary } from '@/shared/components';
// Lazy load page components to enable code splitting and reduce initial bundle size
const LecturePortal = React.lazy(() => import('@/features/portal'));
const SubjectPortal = React.lazy(() => import('@/features/portal/components/SubjectPortal'));
const SlideViewer = React.lazy(() => import('@/features/presentation/components/core/SlideViewer'));
const RegNoGate = React.lazy(() => import('@/features/gate/components/RegNoGate'));
const AdminClassDashboard = React.lazy(() => import('@/features/portal/components/AdminClassDashboard'));
const SlideCustomizationDocs = React.lazy(() => import('@/features/docs/SlideCustomizationDocs'));
const ShapeBuilderPlayground = React.lazy(() => import('@/features/presentation/components/tools/playground/ShapeBuilderPlayground'));
const SFDBMDSolverPage = React.lazy(() => import('./mechanics-of-solids/SFDBMDSolverPage').then((m) => ({ default: m.SFDBMDSolverPage })));
const InfluenceLinesPage = React.lazy(() => import('./structural-analysis/InfluenceLinesPage').then((m) => ({ default: m.InfluenceLinesPage })));
const FrameSolverPage = React.lazy(() => import('./structural-analysis/FrameSolverPage').then((m) => ({ default: m.FrameSolverPage })));
const QSCalculatorsPage = React.lazy(() => import('./quantity-surveying/QSCalculatorsPage').then((m) => ({ default: m.QSCalculatorsPage })));

const PageLoader: React.FC = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-2">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="text-xs font-medium text-muted-foreground">Loading page...</span>
    </div>
  </div>
);

/**
 * Handles legacy Slidev flat slide number requests (e.g. /5) by
 * mapping/redirecting them to the main portal dashboard or standard layout.
 */
const FlatSlideRedirect: React.FC = () => {
  const { slideNo } = useParams<{ slideNo: string }>();
  console.info(`Redirecting legacy flat slide request: P${slideNo}`);
  return <Navigate to={ROUTE_PATHS.PORTAL} replace />;
};

/**
 * Guard component that redirects students back to the dashboard if the lecture is locked.
 */
const LectureRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { subjectId, sessionId, lectureId } = useParams<{ subjectId: string; sessionId: string; lectureId: string }>();
  const { isLectureLocked, isLectureHidden } = useLectureStatus();
  const { userProfile } = useUserContext();

  if (subjectId && sessionId && lectureId) {
    const isLocked = isLectureLocked(subjectId, sessionId, lectureId);
    const isHidden = isLectureHidden(subjectId, sessionId, lectureId);
    const isAdmin = userProfile?.role === 'admin';
    if ((isLocked || isHidden) && !isAdmin) {
      console.warn(`[LectureRouteGuard] Direct access denied to locked/hidden lecture: ${subjectId}/${sessionId}/${lectureId}`);
      const alertMessage = isHidden ? 'This lecture is currently unavailable.' : 'This lecture is currently locked.';
      return <Navigate to={ROUTE_PATHS.PORTAL} state={{ alertMessage }} replace />;
    }
  }

  return <>{children}</>;
};

/**
 * Guard component that restricts routes to administrators only.
 */
const AdminRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userProfile } = useUserContext();
  const isAdmin = userProfile?.role === 'admin';

  if (!isAdmin) {
    console.warn('[AdminRouteGuard] Access denied to non-admin user.');
    return <Navigate to={ROUTE_PATHS.PORTAL} replace />;
  }

  return <>{children}</>;
};


/**
 * AppRoutes renders the page-level route map using React Router.
 */
export const AppRoutes: React.FC = () => {
  const { needsProfileSetup, isLoading, isLoginModalOpen, setLoginModalOpen } = useUserContext();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-xs font-medium text-muted-foreground">Initializing academic deck...</span>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary variant="page">
      <React.Suspense fallback={<PageLoader />}>
        {needsProfileSetup ? (
          <RegNoGate />
        ) : (
          <>
            <Routes>
              {/* Immersive Slide Deck Viewer outside of dashboard layout */}
              <Route
                path={ROUTE_PATHS.SLIDE_NESTED}
                element={
                  <LectureRouteGuard>
                    <SlideViewer />
                  </LectureRouteGuard>
                }
              />
              <Route
                path={ROUTE_PATHS.LECTURE_VIEW}
                element={
                  <LectureRouteGuard>
                    <SlideViewer />
                  </LectureRouteGuard>
                }
              />
              <Route
                path={ROUTE_PATHS.BLOG_VIEW}
                element={
                  <LectureRouteGuard>
                    <SlideViewer />
                  </LectureRouteGuard>
                }
              />
              <Route
                path={ROUTE_PATHS.SHAPES_PLAYGROUND}
                element={
                  <AdminRouteGuard>
                    <ShapeBuilderPlayground />
                  </AdminRouteGuard>
                }
              />

              {/* PageLayout wraps all authenticated routes with app sidebar and headers */}
              <Route element={<PageLayout />}>
                {/* Main Lecture Portal Dashboard */}
                <Route path={ROUTE_PATHS.PORTAL} element={<LecturePortal />} />
                <Route path={ROUTE_PATHS.SUBJECT_PORTAL} element={<SubjectPortal />} />
                <Route path={ROUTE_PATHS.ADMIN_DASHBOARD} element={<AdminClassDashboard />} />
                <Route path={ROUTE_PATHS.PORTAL_LEGACY} element={<Navigate to={ROUTE_PATHS.PORTAL} replace />} />
                <Route path={ROUTE_PATHS.SLIDE_FLAT} element={<FlatSlideRedirect />} />
                <Route path={ROUTE_PATHS.DOCS} element={<SlideCustomizationDocs />} />
                <Route path={ROUTE_PATHS.SOLVER_SFD_BMD} element={<SFDBMDSolverPage />} />
                <Route path={ROUTE_PATHS.SOLVER_INFLUENCE_LINES} element={<InfluenceLinesPage />} />
                <Route path={ROUTE_PATHS.SOLVER_FRAME} element={<FrameSolverPage />} />
                <Route path={ROUTE_PATHS.SOLVER_QS_CALCULATORS} element={<QSCalculatorsPage />} />

                {/* Global Fallback Redirect to Dashboard */}
                <Route path="*" element={<Navigate to={ROUTE_PATHS.PORTAL} replace />} />
              </Route>
            </Routes>
            {isLoginModalOpen && (
              <RegNoGate isModal onClose={() => setLoginModalOpen(false)} />
            )}
          </>
        )}
      </React.Suspense>
    </ErrorBoundary>
  );
};
