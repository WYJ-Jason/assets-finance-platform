import { Button, Authenticator, Image } from "@aws-amplify/ui-react";
import { useNavigate, Link } from "react-router-dom";
import { signOut, getCurrentUser } from "aws-amplify/auth";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaChevronLeft,
  FaChartBar,
} from "react-icons/fa";
import "../styles/SideBar.css";

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

interface UserInfo {
  id: string;
  email: string;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapse }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const currentUser = await getCurrentUser();

        setUserInfo({
          id: currentUser.userId,
          email: currentUser.signInDetails?.loginId || "",
          role: "User",
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch user information");
        setUserInfo(null);
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const renderUserInfo = () => {
    if (isLoading) return "Loading...";
    if (error) return error;
    return userInfo?.email || "User";
  };

  return (
    <Authenticator>
      {() => (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
          <div
            className="sidebar-header"
            onClick={handleCollapse}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <div className="collapsed-header">
                <FaBars className="menu-icon" />
              </div>
            ) : (
              <div className="header-content">
                <h2>Assets Finance Platform</h2>
                <FaChevronLeft
                  className={`collapse-icon ${isCollapsed ? "rotated" : ""}`}
                />
              </div>
            )}
          </div>

          <div className={`user-profile ${isCollapsed ? "collapsed" : ""}`}>
            <div className="user-info">
              {!isCollapsed && (
                <>
                  <span className="user-name">{renderUserInfo()}</span>
                  <span className="user-role">{userInfo?.role || "User"}</span>
                </>
              )}
            </div>
          </div>

          <nav className="sidebar-nav">
            <Link to="/home" className="nav-item" title="Home">
              <FaHome className="nav-icon" />
              {!isCollapsed && <span>Home</span>}
            </Link>
            <Link to="/assets" className="nav-item" title="Assets">
              <FaChartBar className="nav-icon" />
              {!isCollapsed && <span>Assets</span>}
            </Link>
          </nav>

          {!isCollapsed && (
            <div className="sidebar-footer">
              <div className="footer-content">
                <div className="footer-logo-container">
                  <Image
                    src="/logo-daimlinc.png"
                    alt="Daimlinc Logo"
                    className="footer-logo"
                    objectFit="contain"
                  />
                </div>
                <p className="footer-text">
                  &copy; {new Date().getFullYear()} Jason
                </p>
              </div>
            </div>
          )}
          <Button
            className="signout-btn"
            onClick={handleSignOut}
            size="small"
            title="Sign Out"
          >
            <FaSignOutAlt className="nav-icon" />
            {!isCollapsed && <span>Sign Out</span>}
          </Button>
        </div>
      )}
    </Authenticator>
  );
};

export default Sidebar;
