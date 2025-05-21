import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    FormErrorMessage,
  } from '@chakra-ui/react';
  import { useForm } from 'react-hook-form';
  import { GENRE_OPTIONS, STATUS_OPTIONS } from '../pages/utils/constants';
  import { useEffect } from 'react';
  
  const BookForm = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      defaultValues: initialData,
    });
  
    useEffect(() => {
      reset(initialData); 
    }, [initialData, reset]);
  
    const handleFormSubmit = (data) => {
      onSubmit(data);
      onClose();
      reset(); 
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{initialData.id ? 'Edit Book' : 'Add New Book'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalBody pb={6}>
              <Stack spacing={4}>
                <FormControl isInvalid={errors.title}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    {...register('title', { required: 'Title is required' })}
                    placeholder="Book Title"
                  />
                  <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                </FormControl>
  
                <FormControl isInvalid={errors.author}>
                  <FormLabel>Author</FormLabel>
                  <Input
                    {...register('author', { required: 'Author is required' })}
                    placeholder="Author Name"
                  />
                  <FormErrorMessage>{errors.author && errors.author.message}</FormErrorMessage>
                </FormControl>
  
                <FormControl isInvalid={errors.genre}>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    {...register('genre', { required: 'Genre is required' })}
                    placeholder="Select genre"
                  >
                    {GENRE_OPTIONS.filter(option => option !== 'All').map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.genre && errors.genre.message}</FormErrorMessage>
                </FormControl>
  
                <FormControl isInvalid={errors.publishedYear}>
                  <FormLabel>Published Year</FormLabel>
                  <Input
                    type="number"
                    {...register('publishedYear', {
                      required: 'Published Year is required',
                      min: { value: 1000, message: 'Year must be at least 1000' },
                      max: { value: new Date().getFullYear(), message: `Year cannot be in the future (${new Date().getFullYear()})` },
                    })}
                    placeholder="e.g., 2023"
                  />
                  <FormErrorMessage>{errors.publishedYear && errors.publishedYear.message}</FormErrorMessage>
                </FormControl>
  
                <FormControl isInvalid={errors.status}>
                  <FormLabel>Status</FormLabel>
                  <Select
                    {...register('status', { required: 'Status is required' })}
                    placeholder="Select status"
                  >
                    {STATUS_OPTIONS.filter(option => option !== 'All').map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.status && errors.status.message}</FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                {initialData.id ? 'Update' : 'Add'}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };
  
  export default BookForm;