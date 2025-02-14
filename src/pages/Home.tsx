import { Authenticator } from "@aws-amplify/ui-react";
import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import "../styles/Home.css";

interface UserInfo {
  id: string;
  email: string;
  role: string;
}

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setError(null);
        const currentUser = await getCurrentUser();
        setUserInfo({
          id: currentUser.userId,
          email: currentUser.signInDetails?.loginId || "",
          role: "User",
        });
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch user information");
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, []);

  const getTitle = () => {
    if (error) return "Dashboard";
    return userInfo?.role ? `${userInfo.role} Dashboard` : "Dashboard";
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="home-layout">
      <SideBar onCollapse={handleSidebarCollapse} />
      <div
        className={`main-container ${
          sidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Authenticator>
          <div className="content-wrapper">
            <main className="main-content">
              <div className="dashboard-header">
                <h1>{getTitle()}</h1>
                <p className="welcome-text">
                  Welcome to Assets Finance Platform
                  {userInfo ? `, ${userInfo.email}` : ""}
                </p>
              </div>
            </main>
          </div>
        </Authenticator>
      </div>
    </div>
  );
};

export default Home;
