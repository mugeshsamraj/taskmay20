import { API_BASE_URL } from "../../utils/constants";

const API_URL = `${API_BASE_URL}/books`;

export const getBooks = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}?${query}`);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch books: ${errorText}`);
  }

  const totalCount = res.headers.get("X-Total-Count");
  const data = await res.json();

  return {
    data,
    totalCount: totalCount ? parseInt(totalCount, 10) : 0,
  };
};

export const getBookById = async (id) => {
  if (!id) throw new Error("Book ID is required");

  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch book: ${errorText}`);
  }

  return res.json();
};

export const createBook = async (bookData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create book: ${errorText}`);
  }

  return res.json();
};

export const updateBook = async (id, bookData) => {
  if (!id) throw new Error("Book ID is required");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update book: ${errorText}`);
  }

  return res.json();
};

export const deleteBook = async (id) => {
  if (!id) throw new Error("Book ID is required");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete book: ${errorText}`);
  }

  return res.json();
};
