import { useQuery } from "react-query";
import useAxios from "./useAxios";

const useGetBlog = () => {
  const AxiosInst = useAxios();
  return useQuery(["blogs"], async () => {
    let res = await AxiosInst.get(`/blogs`);
    return res.data;
  });
};

export default useGetBlog;
