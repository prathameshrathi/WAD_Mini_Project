import React from "react";
import { Navigate } from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import BlogDetails from "../pages/BlogDetails";
import CreateBlog from "../pages/CreateBlog";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Newsletter from "../pages/Newsletter";
import Private from "../pages/Private";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="blog-details/:blogId" element={<BlogDetails />} />
        <Route path="login" element={<ProtectedRoute />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="create-blog/:blogId" element={<ProtectedRoute />}>
          <Route path="" element={<CreateBlog />} />
        </Route>
        <Route path="private" element={<ProtectedRoute />}>
          <Route path="" element={<Private />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

// const Sample = () => {
//   const dispatch = useDispatch();
//   const login = () => {
//     dispatch(setAuth({ authState: "LOGGEDIN" }));
//   };
//   return (
//     <Box textAlign="center" fontSize="xl">
//       <Grid minH="100vh" p={3}>
//         <ColorModeSwitcher justifySelf="flex-end" />
//         <VStack spacing={8}>
//           <Logo h="40vmin" pointerEvents="none" />
//           <Text>
//             Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
//           </Text>
//           <CLink
//             color="teal.500"
//             href="https://chakra-ui.com"
//             fontSize="2xl"
//             target="_blank"
//             rel="noopener noreferrer">
//             Learn Chakra
//           </CLink>
//           <Button onClick={login}>Login</Button>
//           <Link to={"private"}>
//             <CLink>Private page</CLink>
//           </Link>
//         </VStack>
//       </Grid>
//     </Box>
//   );
// };

export default AppRouter;
