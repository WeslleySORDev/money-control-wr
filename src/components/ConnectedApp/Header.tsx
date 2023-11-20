import {
  Flex,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  Input,
  ButtonGroup,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { UserAuth } from "../../context/AuthContext";
import { useState } from "react";

type TransactionType = {
  title: string;
  amount: number;
  category: string;
  type: string;
};

export function ConnectedAppHeader() {
  const { user, handleSignOut } = UserAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalInputTitle, setModalInputTitle] = useState("");
  const [modalInputAmount, setModalInputAmount] = useState(0);
  const [modalInputCategory, setModalInputCategory] = useState("");
  const [modalSelectedType, setModalSelectedType] = useState<
    "Income" | "Outcome"
  >("Income");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTransaction: TransactionType = {
      title: modalInputTitle,
      type: modalSelectedType,
      category: modalInputCategory,
      amount: modalInputAmount,
    };
    setModalInputTitle("");
    setModalInputAmount(0);
    setModalInputCategory("");
    setModalSelectedType("Income");
    console.log(newTransaction);
    onClose();
  };

  return (
    <>
      {user ? (
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={4}>
            <Text fontSize="large">Olá {user.displayName}</Text>
            <Button onClick={handleSignOut} variant="solid" colorScheme="red">
              Deslogar
            </Button>
          </Flex>
          <Button variant="solid" colorScheme="red" onClick={onOpen}>
            Nova Transação
          </Button>
        </Flex>
      ) : null}
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Nova Transação</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDirection="column" gap={4} onSubmit={(e) => submitForm(e)}>
              <Input
                value={modalInputTitle}
                onChange={(e) => setModalInputTitle(e.currentTarget.value)}
                placeholder="Nome"
              />
              <NumberInput defaultValue={0} min={0} allowMouseWheel>
                <NumberInputField
                  value={modalInputAmount}
                  onChange={(e) =>
                    setModalInputAmount(parseInt(e.currentTarget.value))
                  }
                />
              </NumberInput>
              <Input
                value={modalInputCategory}
                onChange={(e) => setModalInputCategory(e.currentTarget.value)}
                placeholder="Categoria"
              />
              <ButtonGroup display="flex" gap={4}>
                <Button
                  flex="1"
                  bgColor={
                    modalSelectedType === "Income"
                      ? "rgba(18, 164, 84,0.1)"
                      : "white"
                  }
                  textColor="rgb(26, 32, 44)"
                  border={
                    modalSelectedType === "Income"
                      ? ""
                      : "1px solid rgb(226, 232, 240)"
                  }
                  onClick={() => setModalSelectedType("Income")}
                  _hover={{
                    bg: "rgba(18, 164, 84,0.1)",
                  }}
                >
                  Entrada
                </Button>
                <Button
                  flex="1"
                  bgColor={
                    modalSelectedType === "Outcome"
                      ? "rgba(229, 46, 77, 0.1)"
                      : "white"
                  }
                  textColor="rgb(26, 32, 44)"
                  border={
                    modalSelectedType === "Outcome"
                      ? ""
                      : "1px solid rgb(226, 232, 240)"
                  }
                  onClick={() => setModalSelectedType("Outcome")}
                  _hover={{
                    bg: "rgba(229, 46, 77, 0.1)",
                  }}
                >
                  Saída
                </Button>
              </ButtonGroup>
              <Button marginBottom={4} type="submit" colorScheme="red">
                Cadastrar
              </Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
