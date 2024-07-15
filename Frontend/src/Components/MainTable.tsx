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
import { useEffect, useState } from "react";
import { GetCellsAsync } from "../Requests/GetCellsAsync";
import { format } from "date-fns";

interface SearchText {
  searchTerm: string;
}
interface UpdateTable {
  key: string;
}
const MainTable = ({ searchTerm }: SearchText, { key }: UpdateTable) => {
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({});
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
  }, [key]);
  const filteredCells = cells.filter((cell: any) =>
    cell.cellName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVisibilityClick = (cellId: string) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [cellId]: !prevState[cellId],
    }));
  };

  return (
    <TableContainer
      border="1px"
      borderColor="#55AD9B"
      margin="5px"
      borderRadius="10px"
      maxHeight="600px"
      overflowY="auto"
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
          {filteredCells.map((cell: any) => (
            <Tr key={cell.cellId}>
              <Td>{cell.cellName}</Td>
              <Td>
                <Container
                  padding="0"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  maxWidth="100%"
                  margin={0}
                >
                  <Box
                    paddingLeft="5px"
                    fontFamily="monospace"
                    border="2px solid #55AD9B"
                    borderRadius="5px"
                    fontSize="15px"
                    width="60%"
                  >
                    {showPasswords[cell.cellId]
                      ? cell.cellPassword
                      : "********"}
                  </Box>
                  <Tooltip
                    hasArrow
                    label={
                      showPasswords[cell.cellId]
                        ? "Hide password"
                        : "Show password"
                    }
                    bg={showPasswords[cell.cellId] ? "green.300" : "red.300"}
                  >
                    <Button
                      h="1.75rem"
                      size="sm"
                      width="80px"
                      onClick={() => handleVisibilityClick(cell.cellId)}
                    >
                      {showPasswords[cell.cellId] ? "Hide" : "Show"}
                    </Button>
                  </Tooltip>
                </Container>
              </Td>
              <Td isNumeric>
                {format(new Date(cell.createdAt), "yyyy-mm-dd HH:mm")}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
