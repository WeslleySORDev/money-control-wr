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
  const { createTransaction, clearAllTransactions } = useTransactions();

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
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems={{ lg: "center" }}
        >
          <Text fontSize={{ base: "medium", lg: "large" }}>
            Olá {user.displayName}
          </Text>
          <Flex flexDirection={{ base: "column", lg: "row" }} gap={1}>
            <Button
              onClick={handleSignOut}
              variant="solid"
              colorScheme="red"
              borderRadius={{ base: 0, lg: "0.375rem" }}
            >
              Deslogar
            </Button>
            <Button
              onClick={clearAllTransactions}
              variant="solid"
              colorScheme="red"
              borderRadius={{ base: 0, lg: "0.375rem" }}
            >
              Limpar as minhas transações
            </Button>
            <Button
              onClick={onOpen}
              variant="solid"
              colorScheme="red"
              borderRadius={{ base: 0, lg: "0.375rem" }}
            >
              Nova Transação
            </Button>
          </Flex>
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
                <NumberInput defaultValue={0} min={0}>
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
