import React from "react";
import { useMutation, useQueryClient } from "react-query";
import useAxios from "./useAxios";

const useDeleteBlog = () => {
    const AxiosInst = useAxios();
    const queryClient = useQueryClient();
    return useMutation(async (blogId) => {
        await AxiosInst.delete(`/blogs/${blogId}`);
        await queryClient.invalidateQueries(["blogs"]);
    });
};

export default useDeleteBlog;
