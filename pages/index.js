import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  useMediaQuery,
  Spinner,
  FormControl,
} from "@chakra-ui/react";

import { useState, useMemo } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFilter,
  FaRedo,
} from "react-icons/fa";
import {
  useBooks,
  useAddBook,
  useUpdateBook,
  useDeleteBook,
} from "../hooks/useBooks";
import BookForm from "@/components/BookForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { GENRE_OPTIONS, STATUS_OPTIONS } from "../utils/constants";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // 10 books per page
  const [search, setSearch] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editBookData, setEditBookData] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);

  const {
    isOpen: isFormModalOpen,
    onOpen: onFormModalOpen,
    onClose: onFormModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  // Media query for responsiveness
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const queryParams = useMemo(() => {
    const params = {
      _page: page,
      _limit: limit,
      _sort: "title",
      _order: "asc",
    };
    if (search) {
      params.q = search;
    }
    if (filterGenre !== "All") {
      params.genre = filterGenre;
    }
    if (filterStatus !== "All") {
      params.status = filterStatus;
    }
    return params;
  }, [page, limit, search, filterGenre, filterStatus]);

  const { data, isLoading, isFetching, isError, refetch } =
    useBooks(queryParams);
  const totalBooks = data?.totalCount || 0;
  const books = data?.data || [];
  const totalPages = Math.ceil(totalBooks / limit);

  const addBookMutation = useAddBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  const handleAddBookClick = () => {
    setEditBookData(null);
    onFormModalOpen();
  };

  const handleEditBookClick = (book) => {
    setEditBookData(book);
    onFormModalOpen();
  };

  const handleDeleteBookClick = (book) => {
    setBookToDelete(book);
    onDeleteModalOpen();
  };

  const handleFormSubmit = async (bookData) => {
    if (editBookData) {
      await updateBookMutation.mutateAsync({
        id: editBookData.id,
        ...bookData,
      });
    } else {
      await addBookMutation.mutateAsync(bookData);
    }
  };

  const handleConfirmDelete = async () => {
    if (bookToDelete) {
      await deleteBookMutation.mutateAsync(bookToDelete.id);
      onDeleteModalClose();
      setBookToDelete(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleGenreFilterChange = (e) => {
    setFilterGenre(e.target.value);
    setPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setPage(1);
  };

  if (isError) {
    return <Text color="red.500">Error loading books. Please try again.</Text>;
  }

  return (
    <Box p={4}>
      <Flex
        mb={6}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Heading as="h1" size="xl" mb={isLargerThanMd ? 0 : 4}>
          Book Dashboard
        </Heading>
        <Button
          colorScheme="teal"
          leftIcon={<FaPlus />}
          onClick={handleAddBookClick}
          width={isLargerThanMd ? "auto" : "100%"}
        >
          Add New Book
        </Button>
      </Flex>

      <Stack
        direction={isLargerThanMd ? "row" : "column"}
        spacing={4}
        mb={6}
        alignItems="flex-end"
      >
        <InputGroup flex="1">
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search by title or author"
            value={search}
            onChange={handleSearchChange}
          />
        </InputGroup>

        <FormControl width={isLargerThanMd ? "200px" : "100%"}>
          <Select
            placeholder="Filter by Genre"
            value={filterGenre}
            onChange={handleGenreFilterChange}
          >
            {GENRE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl width={isLargerThanMd ? "200px" : "100%"}>
          <Select
            placeholder="Filter by Status"
            value={filterStatus}
            onChange={handleStatusFilterChange}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
        <IconButton
          icon={<FaRedo />}
          aria-label="Clear Filters"
          onClick={() => {
            setSearch("");
            setFilterGenre("All");
            setFilterStatus("All");
            setPage(1);
          }}
        />
      </Stack>

      <Box overflowX="auto">
        {isLoading || isFetching ? (
          <LoadingSkeleton type="table" />
        ) : (
          <Table variant="simple" size={isLargerThanMd ? "md" : "sm"}>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th>Genre</Th>
                <Th isNumeric>Published Year</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {books.length === 0 ? (
                <Tr>
                  <Td colSpan={6} textAlign="center">
                    No books found.
                  </Td>
                </Tr>
              ) : (
                books.map((book) => (
                  <Tr key={book.id}>
                    <Td fontWeight="medium">{book.title}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.genre}</Td>
                    <Td isNumeric>{book.publishedYear}</Td>
                    <Td>
                      <Text
                        px={2}
                        py={1}
                        borderRadius="md"
                        bg={
                          book.status === "Available"
                            ? "green.100"
                            : "orange.100"
                        }
                        color={
                          book.status === "Available"
                            ? "green.800"
                            : "orange.800"
                        }
                        display="inline-block"
                      >
                        {book.status}
                      </Text>
                    </Td>
                    <Td>
                      <Flex>
                        <IconButton
                          icon={<FaEdit />}
                          aria-label="Edit Book"
                          size="sm"
                          mr={2}
                          onClick={() => handleEditBookClick(book)}
                        />
                        <IconButton
                          icon={<FaTrash />}
                          aria-label="Delete Book"
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteBookClick(book)}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        )}
      </Box>

      {/* Pagination */}
      <Flex mt={6} justifyContent="center" alignItems="center">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={page === 1 || isLoading || isFetching}
          mr={2}
        >
          Previous
        </Button>
        <Text>
          Page {page} of {totalPages}
        </Text>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          isDisabled={page === totalPages || isLoading || isFetching}
          ml={2}
        >
          Next
        </Button>
      </Flex>

      <BookForm
        isOpen={isFormModalOpen}
        onClose={onFormModalClose}
        onSubmit={handleFormSubmit}
        initialData={editBookData || {}}
      />

      {bookToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          onConfirm={handleConfirmDelete}
          itemToDelete={{ type: "Book", name: bookToDelete.title }}
        />
      )}
    </Box>
  );
};

export default HomePage;
