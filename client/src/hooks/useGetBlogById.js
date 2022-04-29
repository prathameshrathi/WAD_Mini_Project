import { useQuery } from "react-query";
import useAxios from "./useAxios";

const useGetBlogById = (id) => {
    const AxiosInst = useAxios();
    return useQuery(
        ["blogs", id],
        async () => {
            let res = await AxiosInst.get(`/blogs/${id}`);
            return res.data;
        },
        {
            enabled: !!id,
        }
    );
};

export default useGetBlogById;
