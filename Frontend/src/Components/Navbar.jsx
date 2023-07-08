import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonMain from "./ButtonMain";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/authSlice";

import { SearchDrawer } from "./SearchDrawer";
const Navbar = () => {
  const { auth, user } = useSelector((store) => store.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState("deals");
  const [serachDrawerOpen, setSearchDrawerOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("userTokenBuyCars");
    dispatch(logoutUser());
  };
  return (
    <>
      <SimpleGrid
        bg="WhiteSmoke"
        boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
        p={2}
        zIndex={5}
        width={"100%"}
        pos="fixed"
        columns={3}
      >
        <SearchDrawer
          nav={true}
          sendSelected={(e) => null}
          serachDrawerOpen={serachDrawerOpen}
          setSearchDrawerOpen={(e) => setSearchDrawerOpen(e)}
        />
        <Image
          onClick={() => nav("/")}
          borderRadius={5}
          width={"70px"}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQ9oqtWZR355VoPQoeYxxZNP-524pyZzMGWHqbvRR7Hm23dwJO5SWwInWdNmu4FV3c_o&usqp=CAU"
        />
        <Flex justifyContent={"space-around"} alignItems={"center"}>
          <Text
            style={
              current === "addnewdeal"
                ? { backgroundColor: "green", color: "white" }
                : null
            }
            p={2}
            textAlign={"center"}
            borderRadius={5}
            _hover={{ bg: "teal", color: "white" }}
            onClick={() => [nav("/addnewdeal"), setCurrent("addnewdeal")]}
          >
            New Deal
          </Text>
          <Text
            style={
              current === "deals"
                ? { backgroundColor: "green", color: "white" }
                : null
            }
            p={2}
            textAlign={"center"}
            borderRadius={5}
            _hover={{ bg: "green", color: "white" }}
            onClick={() => [nav("/deals"), setCurrent("deals")]}
          >
            All Deals
          </Text>
        </Flex>

        <Flex justifyContent={"space-evenly"}>
          <Button colorScheme="green" onClick={() => setSearchDrawerOpen(true)}>
            <FaSearch />
          </Button>
          {!auth ? (
            <ButtonMain onClick={() => nav("/login")} title={"Login"} />
          ) : (
            <>
              <Menu>
                <MenuButton as={"button"}>
                  <Avatar size="md" name={user.name} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleLogout()}>
                    <Text color="red" colorScheme="red">
                      Logout
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default Navbar;
