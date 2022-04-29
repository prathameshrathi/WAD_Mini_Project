import {
  Avatar,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import useAuth from "../hooks/useAuth";
import PosterImage from "../assets/img/Ws1s82d-avengers-wallpaper-hd.jpg";
import useGetBlogById from "../hooks/useGetBlogById";
import moment from "moment";
import { BACKEND_URL } from "../utils/constants";
import { useParams } from "react-router";

const BlogDetails = () => {
  const { blogId } = useParams();
  const { data, isLoading } = useGetBlogById(blogId);

  if (isLoading) {
    return (
      <Center>
        <CircularProgress isIndeterminate color="green.300" />
      </Center>
    );
  }

  return (
    <Container maxW={"5xl"} p="12">
      <Box>
        <Box>
          <HStack>
            <Avatar name={data?.publishedBy?.name} />
            <VStack style={{ marginLeft: 20 }} alignItems={"start"}>
              <Text as={"b"}>{data?.publishedBy?.name}</Text>
              <Box>
                <HStack>
                  <Text as={"abbr"} color="#c7c7c7" fontSize={"15"}>
                    {moment(data?.publishedAt).format("LL")}
                  </Text>
                  <Text as={"abbr"} color="#c7c7c7" fontSize={"15"}>
                    {" "}
                    . 2 min read
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </HStack>
        </Box>
        <Box justifyContent={"center"} alignItems={"center"} marginTop={"8"}>
          <Heading>{data?.title}</Heading>
          <Image
            alignSelf={"center"}
            src={BACKEND_URL + data?.poster}
            alt="Poster Image"
            height={"100%"}
            width={"100%"}
            marginTop={"5"}
          />
          <Box marginTop={"7"}>
            <Text fontSize={"20"} as={"cite"}>
              {data?.description}
            </Text>
            <br />
            <br />
            <br />
            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogDetails;
