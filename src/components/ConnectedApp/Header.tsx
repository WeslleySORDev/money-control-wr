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
  Input,
  ButtonGroup,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { UserAuth } from "../../context/AuthContext";
import { TransactionType } from "../../@types/Transaction";

import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

type ITransactionInput = Omit<TransactionType, "id" | "createdAt" | "ownerId">;

export function ConnectedAppHeader() {
  const { user, handleSignOut } = UserAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createTransaction } = useTransactions();

  const [modalInputTitle, setModalInputTitle] = useState("");
  const [modalInputAmount, setModalInputAmount] = useState(0);
  const [modalInputCategory, setModalInputCategory] = useState("");
  const [modalSelectedType, setModalSelectedType] = useState<
    "Income" | "Outcome"
  >("Income");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modalInputTitle !== "" && modalInputCategory !== "") {
      if (user) {
        const newTransaction: ITransactionInput = {
          title: modalInputTitle,
          type: modalSelectedType,
          category: modalInputCategory,
          amount: modalInputAmount,
        };
        createTransaction(newTransaction);
        setModalInputTitle("");
        setModalInputAmount(0);
        setModalInputCategory("");
        setModalSelectedType("Income");
        onClose();
      }
    } else {
      alert("Os campos Titulo e Categoria não podem estar vazios !");
    }
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
            <form onSubmit={(e) => submitForm(e)}>
              <Flex display="flex" flexDirection="column" gap={4}>
                <Input
                  value={modalInputTitle}
                  onChange={(e) => setModalInputTitle(e.currentTarget.value)}
                  placeholder="Título (tamanho máximo 56 caracters)"
                  maxLength={56}
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
                  placeholder="Categoria (tamanho máximo 56 caracters)"
                  maxLength={56}
                />
                <ButtonGroup display="flex" gap={4}>
                  <Button
                    flex="1"
                    bgColor={
                      modalSelectedType === "Income"
                        ? "rgba(18, 164, 84,0.3)"
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
                      bg: "rgba(18, 164, 84,0.3)",
                    }}
                  >
                    Entrada
                  </Button>
                  <Button
                    flex="1"
                    bgColor={
                      modalSelectedType === "Outcome"
                        ? "rgba(229, 46, 77, 0.3)"
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
                      bg: "rgba(229, 46, 77, 0.3)",
                    }}
                  >
                    Saída
                  </Button>
                </ButtonGroup>
                <Button marginBottom={4} type="submit" colorScheme="red">
                  Cadastrar
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
