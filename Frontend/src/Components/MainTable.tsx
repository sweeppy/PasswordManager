import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Tooltip,
  Button,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GetCellsAsync } from "../Requests/GetCellsAsync";
const MainTable = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [cells, setCells] = useState([]);

  const handleGetCells = async () => {
    try {
      const response = await GetCellsAsync();
      const data = response?.data;
      const cellsArray = data.map((item: any) => ({
        cellName: item.name,
        cellPassword: item.password,
        createdAt: item.createdAt,
        cellId: item.id,
      }));
      setCells(cellsArray);
    } catch (error: any) {
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    handleGetCells();
  }, []);

  return (
    <TableContainer
      border="1px"
      borderColor="#55AD9B"
      margin="5px"
      borderRadius="10px"
    >
      <Table variant="striped" colorScheme="teal" size="lg">
        <Thead>
          <Tr>
            <Th width="33%">Name</Th>
            <Th width="33%">Password</Th>
            <Th width="33%" isNumeric>
              Created at
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {cells.map((cell: any) => (
            <Tr key={cell.cellId}>
              <Td>{cell.cellName}</Td>
              <Td>
                <Container
                  padding="0"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  maxWidth="300px"
                  margin={0}
                >
                  <Box
                    paddingLeft="5px"
                    fontFamily="monospace"
                    border="2px solid #55AD9B"
                    borderRadius="5px"
                    fontSize="15px"
                    width="70%"
                  >
                    {show ? "Password" : "********"}
                  </Box>
                  <Tooltip
                    hasArrow
                    label={show ? "Hide password" : "show password"}
                    bg={show ? "green.300" : "red.300"}
                  >
                    <Button
                      h="1.75rem"
                      size="sm"
                      width="80px"
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </Tooltip>
                </Container>
              </Td>
              <Td isNumeric>{cell.createdAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
