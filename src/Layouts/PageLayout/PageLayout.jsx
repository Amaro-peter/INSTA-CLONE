import { Flex, Box } from "@chakra-ui/react"


const PageLayout = ({children}) => {
    const {pathname} = useLocation();
  return (
    <Flex>
        {/*sidebar on the left*/}
        {pathname !== "/auth" ? (
            <Box w={{base: "70px", md:"240px"}}>
                <Sidebar />
            </Box>
        ) : null}
        {/*the page content on the right*/}

        <Box>
            {children}
        </Box>
    </Flex>
  )
}

export default PageLayout
