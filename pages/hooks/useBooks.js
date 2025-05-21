import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks, createBook, updateBook, deleteBook } from '../api/books';
import { toast } from 'react-toastify';

export const useBooks = (params) => {
  return useQuery({
    queryKey: ['books', params],
    queryFn: () => getBooks(params),
    keepPreviousData: true,
    onError: (error) => {
      toast.error(`Error fetching books: ${error.message}`);
    },
  });
};

export const useAddBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book added successfully!');
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn expects an object with { id, ...bookData }
    mutationFn: ({ id, ...bookData }) => updateBook(id, bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book updated successfully!');
    },
    onError: (error) => {
      toast.error(`Error updating book: ${error.message}`);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Error deleting book: ${error.message}`);
    },
  });
};
