import { Authenticator } from "@aws-amplify/ui-react";
import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import "../styles/Assets.css";

interface UserInfo {
  id: string;
  email: string;
  role: string;
}

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const currentUser = await getCurrentUser();

        setUserInfo({
          id: currentUser.userId,
          email: currentUser.signInDetails?.loginId || "",
          role: "User",
        });

        console.log(userInfo);
      } catch (error) {
        console.error("Error:", error);
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, []);

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
                <h1>Assets</h1>
              </div>
            </main>
          </div>
        </Authenticator>
      </div>
    </div>
  );
};

export default Home;
