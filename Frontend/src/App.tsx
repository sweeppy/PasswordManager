import {
  ChakraProvider,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import MainTable from "./Components/MainTable";
import { Search2Icon } from "@chakra-ui/icons";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <InputGroup marginTop={30} marginBottom={30} className="main-input">
        <InputLeftElement pointerEvents="none">
          <Search2Icon />
        </InputLeftElement>
        <Input variant="filled" placeholder="Search" fontSize={20} />
      </InputGroup>
      <MainTable />
    </ChakraProvider>
  );
}
export default App;
