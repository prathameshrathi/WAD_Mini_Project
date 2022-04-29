import { useMutation, useQuery } from "react-query";
import useAxios from "./useAxios";

const useCreateBlankBlog = () => {
    const AxiosInst = useAxios();
    return useMutation(async () => {
        let res = await AxiosInst.post("/blogs", {
            title: "New Blog",
        });
        return res.data._id;
    });
};

export default useCreateBlankBlog;
