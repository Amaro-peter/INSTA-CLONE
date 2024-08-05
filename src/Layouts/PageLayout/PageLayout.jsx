import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useLocation} from "react-router-dom";
import useAuthStore from "../../store/authStore";
import NavBar from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";

const PageLayout = ({children}) => {
    const {pathname} = useLocation();
    const userAuth = useAuthStore((state) => state.user);
    const canRenderSidebar = pathname !== "/auth" && userAuth;

    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const waitForUserAuth = () => {
          return new Promise((resolve) => {
            const interval = setInterval(() => {
              if (userAuth !== undefined) {
                clearInterval(interval);
                resolve(userAuth);
              }
            }, 100); // Check every 100ms
          });
        };
    
        waitForUserAuth().then((user) => {
          setLoading(false);
        });
      }, [userAuth]);


    const canRenderNavbar = !userAuth && !loading && pathname !== "/auth";
    
    const checkingUserIsAuth = !userAuth && !loading;
    if (checkingUserIsAuth) {
        return <PageLayoutSpinner />;
    }

  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
        {/*sidebar on the left*/}
        {canRenderSidebar ? (
            <Box w={{base: "70px", md:"240px"}}>
                <Sidebar />
            </Box>
        ) : null}
        {/*the page content on the right*/}
        {canRenderNavbar ? <NavBar /> : null}
        <Box flex={1} w={{base:"calc(100% - 70px", md:"calc(100% - 240px"}} mx={"auto"}>
            {children}
        </Box>
    </Flex>
  )
}

export default PageLayout;
