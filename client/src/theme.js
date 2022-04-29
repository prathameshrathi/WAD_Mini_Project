import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            h2: {
                fontSize: "2xl",
                fontWeight: "bold",
            },
            h3: {
                fontSize: "lg",
            },
            h4: {
                fontSize: "md",
            },
        },
    },
});
