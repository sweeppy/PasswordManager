import { ChangeEvent, useState } from "react";
import {
  ChakraProvider,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { Search2Icon, AddIcon } from "@chakra-ui/icons";
import MainTable from "./Components/MainTable";
import AddCellModal from "./Components/AddModalWindow";
import "./App.css";

function App() {
  const [showModalAdd, setShowModalAdd] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const handleShowModalAdd = () => {
    setShowModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setShowModalAdd(false);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <ChakraProvider>
      <InputGroup marginTop={30} marginBottom={30} className="main-input">
        <InputLeftElement pointerEvents="none">
          <Search2Icon />
        </InputLeftElement>
        <Input
          variant="filled"
          placeholder="Search"
          fontSize={20}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <MainTable searchTerm={searchTerm} />
      <Button
        position="absolute"
        bottom="50px"
        right="50px"
        onClick={handleShowModalAdd}
      >
        <AddIcon />
      </Button>
      <AddCellModal isOpen={showModalAdd} onClose={handleCloseModalAdd} />
    </ChakraProvider>
  );
}

export default App;
