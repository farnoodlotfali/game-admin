import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <h1>AuthLayout</h1>
      {/* will either be home.tsx or settings.tsx */}
      <Outlet />
    </div>
  );
}
