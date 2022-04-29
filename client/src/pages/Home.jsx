import React from "react";
import {
    Box,
    Heading,
    Link as ChakraLink,
    Image,
    Text,
    Divider,
    HStack,
    Wrap,
    WrapItem,
    useColorModeValue,
    Container,
    Avatar,
    Icon,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import useGetBlog from "../hooks/useGetBlog";
import moment from "moment";
import { BACKEND_URL } from "../utils/constants";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { AiOutlineMore } from "react-icons/ai";
import { useNavigate } from "react-router";
import useDeleteBlog from "../hooks/useDeleteBlog";

const BlogAuthor = (props) => {
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Avatar name={props.name} />
            <Text fontWeight="medium">{props.name}</Text>
            <Text>—</Text>
            <Text>{props.date}</Text>
        </HStack>
    );
};

const Home = () => {
    const { data, isLoading } = useGetBlog();
    const { isLoggedIn } = useAuth();
    const { mutate } = useDeleteBlog();
    let blogs = [];
    blogs = isLoading
        ? []
        : isLoggedIn
        ? data
        : data.filter((blog) => blog.isDraft === false);
    const navigate = useNavigate();

    const editBlog = (id) => {
        navigate(`/create-blog/${id}`);
    };

    return (
        <Container maxW={"7xl"} p="12">
            <Heading as="h1">Top Articles</Heading>
            {blogs
                ?.filter((item) => item.isTop)
                .map((item) => (
                    <Box
                        marginTop={{ base: "1", sm: "5" }}
                        display="flex"
                        flexDirection={{ base: "column", sm: "row" }}
                        justifyContent="space-between"
                    >
                        <Box
                            display="flex"
                            flex="1"
                            marginRight="3"
                            position="relative"
                            alignItems="center"
                        >
                            <Box
                                width={{ base: "100%", sm: "85%" }}
                                zIndex="2"
                                marginLeft={{ base: "0", sm: "5%" }}
                                marginTop="5%"
                            >
                                <Link to={`/blog-details/${item._id}`}>
                                    <ChakraLink
                                        textDecoration="none"
                                        _hover={{ textDecoration: "none" }}
                                    >
                                        <Image
                                            borderRadius="lg"
                                            src={BACKEND_URL + item.poster}
                                            alt="Poster of Blog"
                                            objectFit="contain"
                                        />
                                    </ChakraLink>
                                </Link>
                            </Box>
                            <Box
                                zIndex="1"
                                width="100%"
                                position="absolute"
                                height="100%"
                            >
                                <Box
                                    bgGradient={useColorModeValue(
                                        "radial(orange.600 1px, transparent 1px)",
                                        "radial(orange.300 1px, transparent 1px)"
                                    )}
                                    backgroundSize="20px 20px"
                                    opacity="0.4"
                                    height="100%"
                                />
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            flex="1"
                            flexDirection="column"
                            justifyContent="center"
                            marginTop={{ base: "3", sm: "0" }}
                        >
                            <Heading marginTop="1">
                                <Link to={`/blog-details/${item._id}`}>
                                    <ChakraLink
                                        textDecoration="none"
                                        _hover={{ textDecoration: "none" }}
                                    >
                                        {item?.title}
                                    </ChakraLink>
                                </Link>
                            </Heading>
                            <Link to={`/blog-details/${item._id}`}>
                                <Text
                                    as="p"
                                    marginTop="2"
                                    color={useColorModeValue(
                                        "gray.700",
                                        "gray.200"
                                    )}
                                    fontSize="lg"
                                >
                                    {item?.description}
                                </Text>
                            </Link>
                            <BlogAuthor
                                name={item?.publishedBy?.name}
                                date={moment(item.publishedAt).format("LL")}
                            />
                        </Box>
                        <Box>
                            <Menu>
                                <MenuButton>
                                    <Icon w={10} h={10} as={AiOutlineMore} />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem
                                        isDisabled={isLoggedIn ? false : true}
                                        onClick={(e) => editBlog(item._id)}
                                    >
                                        Edit
                                    </MenuItem>
                                    <MenuItem
                                        isDisabled={isLoggedIn ? false : true}
                                        onClick={(e) => mutate(item._id)}
                                    >
                                        Delete
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </Box>
                ))}
            <Heading as="h2" marginTop="20">
                Latest articles
            </Heading>
            <Divider marginTop="5" />
            <Wrap spacing="30px" marginTop="5">
                {blogs
                    ?.filter((item) => !item.isTop)
                    .map((item) => (
                        <WrapItem
                            width={{
                                base: "100%",
                                sm: "45%",
                                md: "45%",
                                lg: "30%",
                            }}
                        >
                            <Box w="100%">
                                <HStack alignItems={"start"}>
                                    <Box>
                                        <Box
                                            borderRadius="lg"
                                            overflow="hidden"
                                        >
                                            <Link
                                                to={`/blog-details/${item._id}`}
                                            >
                                                <ChakraLink
                                                    textDecoration="none"
                                                    _hover={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <Image
                                                        transform="scale(1.0)"
                                                        src={
                                                            BACKEND_URL +
                                                            item.poster
                                                        }
                                                        alt="Poster of Blog"
                                                        objectFit="contain"
                                                        width="100%"
                                                        transition="0.3s ease-in-out"
                                                        _hover={{
                                                            transform:
                                                                "scale(1.05)",
                                                        }}
                                                    />
                                                </ChakraLink>
                                            </Link>
                                        </Box>
                                        <Link to={`/blog-details/${item._id}`}>
                                            <Heading
                                                fontSize="xl"
                                                marginTop="2"
                                            >
                                                <ChakraLink
                                                    textDecoration="none"
                                                    _hover={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    {item.title}
                                                </ChakraLink>
                                            </Heading>
                                        </Link>
                                        <Link to={`/blog-details/${item._id}`}>
                                            <Text
                                                as="p"
                                                fontSize="md"
                                                marginTop="2"
                                            >
                                                {item.description}
                                            </Text>
                                        </Link>
                                        <BlogAuthor
                                            name={item?.publishedBy?.name}
                                            date={moment(
                                                item.publishedAt
                                            ).format("LL")}
                                        />
                                    </Box>
                                    <Box>
                                        <Menu>
                                            <MenuButton>
                                                <Icon
                                                    w={10}
                                                    h={10}
                                                    as={AiOutlineMore}
                                                />
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem
                                                    isDisabled={
                                                        isLoggedIn
                                                            ? false
                                                            : true
                                                    }
                                                    onClick={(e) =>
                                                        editBlog(item._id)
                                                    }
                                                >
                                                    Edit
                                                </MenuItem>
                                                <MenuItem
                                                    isDisabled={
                                                        isLoggedIn
                                                            ? false
                                                            : true
                                                    }
                                                    onClick={(e) =>
                                                        mutate(item._id)
                                                    }
                                                >
                                                    Delete
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                </HStack>
                            </Box>
                        </WrapItem>
                    ))}
            </Wrap>
        </Container>
    );
};

export default Home;
