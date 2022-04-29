import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Switch,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import { useQueryClient } from "react-query";
import { Navigate, useParams } from "react-router";
import * as Yup from "yup";
import Editor from "../components/Editor";
import ImagePicker from "../components/ImagePicker";
import useAuth from "../hooks/useAuth";
import useEditBlog from "../hooks/useEditBlog";
import useGetBlogById from "../hooks/useGetBlogById";

const initialBlogData = {
    title: "",
    poster: "",
    content: "",
    description: "",
    isDraft: true,
    isTop: false,
};

const CreateBlog = () => {
    const { isLoggedOut } = useAuth();
    const { blogId } = useParams();

    if (!!!blogId || isLoggedOut) return <Navigate to="/" />;

    const { data } = useGetBlogById(blogId);
    const { mutateAsync, isLoading } = useEditBlog();

    const queryClient = useQueryClient();

    const onFormSubmit = useCallback(
        async (values) => {
            let data = await mutateAsync({ blogId, blogData: values });
            await queryClient.invalidateQueries(["blogs", blogId]);
        },
        [mutateAsync, blogId]
    );

    const formik = useFormik({
        initialValues: {
            ...initialBlogData,
            ...{
                title: data?.title ?? "",
                poster: data?.poster ?? "",
                content: data?.content ?? "",
                description: data?.description ?? "",
                isDraft: data?.isDraft,
                isTop: data?.isTop,
            },
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Title is required"),
            poster: Yup.mixed().when("isDraft", {
                is: false,
                then: Yup.mixed().required("Poster is required"),
            }),
            content: Yup.string().when("isDraft", {
                is: false,
                then: Yup.string().required("Content is required"),
            }),
            description: Yup.string().when("isDraft", {
                is: false,
                then: Yup.string().required("Description is required"),
            }),
            isDraft: Yup.boolean(),
            isTop: Yup.boolean(),
        }),
        enableReinitialize: true,
        onSubmit: onFormSubmit,
    });

    const onEditorData = useCallback((content) => {
        formik.setFieldValue("content", content);
    }, []);

    return (
        <Container maxW="7xl" py={4}>
            <HStack
                justifyContent={"space-between"}
                alignItems={"center"}
                py={4}
            >
                <Heading>Edit Blog</Heading>
                <HStack>
                    <Button
                        size={"lg"}
                        colorScheme={"teal"}
                        onClick={formik.handleSubmit}
                        disabled={!formik.dirty}
                        isLoading={formik.isSubmitting}
                    >
                        Save
                    </Button>
                    <HStack bg="gray.100" p={4} rounded="full">
                        <Text fontWeight={"bold"} color="gray.600">
                            Published
                        </Text>
                        <Switch
                            isChecked={!formik.values?.isDraft}
                            onChange={(e) =>
                                formik.setFieldValue(
                                    "isDraft",
                                    !e.target.checked
                                )
                            }
                            colorScheme={"green"}
                            size={"lg"}
                        />
                    </HStack>
                </HStack>
            </HStack>
            <VStack mt={4} spacing={"4"}>
                <FormControl>
                    <FormLabel htmlFor="isTop">
                        Include in top category
                    </FormLabel>
                    <Switch
                        isChecked={formik.values?.isTop}
                        onChange={(e) =>
                            formik.setFieldValue("isTop", e.target.checked)
                        }
                        id="isTop"
                        colorScheme={"green"}
                        size={"lg"}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="title">Blog Title</FormLabel>
                    <Input
                        isInvalid={formik.errors.title}
                        id="title"
                        type="text"
                        placeholder="Your blog title goes here"
                        value={formik.values?.title}
                        onChange={formik.handleChange("title")}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="description">
                        Blog Description
                    </FormLabel>
                    <Textarea
                        isInvalid={formik.errors.description}
                        id="description"
                        type="text"
                        value={formik.values?.description}
                        onChange={formik.handleChange("description")}
                        placeholder="Your blog description goes here"
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <VStack w="full" alignItems={"flex-start"}>
                    <ImagePicker
                        defaultUrl={formik.values?.poster}
                        name={"poster"}
                        title={"Choose poster image"}
                        onChange={(file) =>
                            formik.setFieldValue("poster", file)
                        }
                    />
                    {formik.errors?.poster && (
                        <Text color="red">*{formik.errors?.poster}</Text>
                    )}
                </VStack>
                <Editor
                    intialData={formik.values.content}
                    onDataChange={onEditorData}
                />
                {formik.errors?.content && (
                    <Text color="red">*{formik.errors?.content}</Text>
                )}
            </VStack>
        </Container>
    );
};

export default CreateBlog;
