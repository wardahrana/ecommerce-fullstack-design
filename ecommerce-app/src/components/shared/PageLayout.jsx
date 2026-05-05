// import { Outlet } from "react-router-dom";  ← REMOVE THIS
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import ScrollToTop from "./ScrollToTop";

const PageLayout = ({ children }) => {  // ← Add {children} parameter
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <AppHeader />
            <main className="flex-grow pt-20">
                {children}  {/* ← Replace <Outlet /> with {children} */}
            </main>
            <AppFooter />
        </div>
    );
};

export default PageLayout;