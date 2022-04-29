import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import useCreateBlankBlog from "../hooks/useCreateBlankBlog";

const NewBlog = () => {
    const { mutateAsync, isLoading } = useCreateBlankBlog();
    const navigate = useNavigate();

    return (
        <Button
            isLoading={isLoading}
            onClick={async () => {
                const data = await mutateAsync();
                navigate(`/create-blog/${data}`);
            }}
            colorScheme={"teal"}
        >
            New Blog
        </Button>
    );
};

export default NewBlog;
