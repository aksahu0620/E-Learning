import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/instructor/Sidebar";
import Dashboard from "./pages/instructor/Dashboard";
import CourseTable from "./pages/instructor/course/CourseTable";
import AddCourse from "./pages/instructor/course/AddCourse";
import EditCourse from "./pages/instructor/course/EditCourse";
import CreateLecture from "./pages/instructor/lecture/CreateLecture";
import EditLecture from "./pages/instructor/lecture/EditLecture";
import { ThemeProvider } from "@/components/theme-provider"
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import { InstructorRoute, AuthenticatedUser, ProtectedRoute } from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element:
          (<>
            <HeroSection />
            <Courses />
          </>)
      },
      {
        path: "login",
        element: <AuthenticatedUser><Login /></AuthenticatedUser>
      },
      {
        path: "my-learning",
        element: <ProtectedRoute><MyLearning /></ProtectedRoute>
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: "course/search",
        element: <ProtectedRoute><SearchPage /></ProtectedRoute>
      },
      {
        path: "course-detail/:courseId",
        element: <ProtectedRoute><CourseDetail /></ProtectedRoute>
      },
      {
        path: "course-progress/:courseId",
        element: <ProtectedRoute><PurchaseCourseProtectedRoute><CourseProgress /></PurchaseCourseProtectedRoute></ProtectedRoute>
      },

      // instructor routes start from here.
      {
        path: "instructor",
        element: <InstructorRoute><Sidebar /></InstructorRoute>,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "course",
            element: <CourseTable />
          },
          {
            path: "course/create",
            element: <AddCourse />
          },
          {
            path: "course/:courseId",
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          },
        ]
      },
    ],
  }
])

function App() {
  return (
    <main>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  )
}

export default App