import { useMutation } from "react-query";
import useAxios from "./useAxios";

const useEditBlog = () => {
    const AxiosInst = useAxios();
    return useMutation(async ({ blogId, blogData }) => {
        var form_data = new FormData();

        for (var key in blogData) {
            form_data.append(key, blogData[key]);
        }
        let res = await AxiosInst.put(`/blogs/${blogId}`, form_data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    }, {});
};

export default useEditBlog;
