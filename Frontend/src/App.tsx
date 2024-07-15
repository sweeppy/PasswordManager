import {
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import MainTable from "./Components/MainTable";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import "./App.css";
import { ChangeEvent, useState } from "react";

function App() {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [socialSelected, setSocialSelected] = useState("website");

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [show, setShow] = useState(false);
  const handleShowPasswordInModal = () => setShow(!show);

  const handleSocialChange = (value: string) => {
    setSocialSelected(value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    let isEmailValid = true;
    if (socialSelected !== "website") {
      isEmailValid = validateEmail(name);
    }

    if (name.length < 1) {
      isEmailValid = false;
    }

    const isPasswordValid = password.length > 8;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      setShowModalAdd(false);
      setName("");
      setPassword("");
    }
  };
  return (
    <ChakraProvider>
      <InputGroup marginTop={30} marginBottom={30} className="main-input">
        <InputLeftElement pointerEvents="none">
          <Search2Icon />
        </InputLeftElement>
        <Input variant="filled" placeholder="Search" fontSize={20} />
      </InputGroup>
      <MainTable />
      <Button
        position="absolute"
        bottom="50px"
        right="50px"
        onClick={() => setShowModalAdd(true)}
      >
        <AddIcon />
      </Button>
      <Modal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new cell</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={emailError}>
              <FormLabel>{`Enter ${socialSelected} name`}</FormLabel>
              <Input placeholder={socialSelected} onChange={handleNameChange} />
              <FormErrorMessage>
                {emailError &&
                  "Please enter a valid email address or fill the field"}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={passwordError}>
              <FormLabel>Enter password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={handlePasswordChange}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowPasswordInModal}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {passwordError &&
                  "The password must contains at least 8 chacters"}
              </FormErrorMessage>
            </FormControl>
            <RadioGroup
              defaultValue="website"
              marginTop="10px"
              onChange={handleSocialChange}
            >
              <Stack spacing={5} direction="row">
                <Radio colorScheme="blue" value="website">
                  Website
                </Radio>
                <Radio colorScheme="blue" value="email">
                  Email
                </Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={() => setShowModalAdd(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
export default App;
