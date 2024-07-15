import { ChangeEvent, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
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
import { CreateCellAsync } from "../Requests/CreateCellAsync";

interface CellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCell: () => void;
}

const AddCellModal = ({ isOpen, onClose, onAddCell }: CellModalProps) => {
  const [socialSelected, setSocialSelected] = useState("website");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [show, setShow] = useState(false);
  const [alertText, setAlertText] = useState("");

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

  const handleSubmit = async () => {
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
      const responseData = await CreateCellAsync({ name, password });
      if (responseData !== null) {
        setAlertText(responseData);
      } else {
        onClose();
        onAddCell();
        setName("");
        setPassword("");
      }
    }
  };

  return (
    <>
      {alertText && (
        <Alert
          status="error"
          position="absolute"
          top="10px"
          right="10px"
          height="auto"
          width="30%"
          minWidth="300px"
          borderRadius="10px"
          marginTop={4}
        >
          <AlertIcon />
          <AlertDescription>{alertText}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setAlertText("")}
          />
        </Alert>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
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
                  "The password must contain at least 8 characters"}
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
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCellModal;
