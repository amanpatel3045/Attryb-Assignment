import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from "@chakra-ui/react";
import { cssStyles } from "./Reusable";
export const Accordian = ({
  oemId,
  img,
  accidents,
  km,
  des,
  price,
  prevBuyers,

  originalPaint,
  registrationPlace,
  majorScratches,
  title,
}) => {
  return (
    <>
      <Accordion allowMultiple={true}>
        <AccordionItem>
          <h2>
            <AccordionButton _hover={{ bg: "crimson" }} color="white" bg="green">
              <Box as="span" flex="1" textAlign="left">
                More Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel fontSize="15px" fontWeight={400}>
            <Text>Total Accidents {accidents} </Text>
            <Text>Orginal Paint {originalPaint} </Text>
            <Text>Place of Registration {registrationPlace}</Text>
            <Text>Prev Buyers {prevBuyers} </Text>{" "}
            <Text>Total Kilometers {km} </Text>
            <Text>Major Scratches {majorScratches} </Text>
            {des &&
              des.map((el) => (
                <Text
                  key={el.id}
                  pr={2}
                  pl={2}
                  fontSize={cssStyles.small}
                  textAlign={"center"}
                  borderRadius={4}
                >
                  ⚫{el.description}
                </Text>
              ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
