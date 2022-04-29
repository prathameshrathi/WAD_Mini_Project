import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build";
import { Box } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { BACKEND_URL } from "../utils/constants";

const Editor = ({ onDataChange, intialData }) => {
    const { tokens } = useAuth();
    return (
        <Box w="full" rounded="lg" overflow={"hidden"}>
            <CKEditor
                config={{
                    image: {
                        toolbar: [
                            "imageTextAlternative",
                            "imageStyle:inline",
                            "imageStyle:block",
                            "imageStyle:side",
                            "toggleImageCaption",
                        ],
                    },
                    simpleUpload: {
                        // The URL that the images are uploaded to.
                        uploadUrl: `${BACKEND_URL}blogs/content/image/`,

                        // Enable the XMLHttpRequest.withCredentials property.
                        // withCredentials: true,

                        // Headers sent along with the XMLHttpRequest to the upload server.
                        headers: {
                            Authorization:
                                `Bearer ${tokens?.accessToken}` || "",
                        },
                    },
                }}
                data={intialData}
                editor={ClassicEditor}
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onDataChange(data);
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                }}
            />
        </Box>
    );
};

export default Editor;
