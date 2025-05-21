# Book Management Dashboard

A responsive React.js dashboard built with Next.js, Chakra UI, React Query, and React Hook Form for managing a list of books. It supports CRUD operations, pagination, searching, and filtering using a mock API.


## Features

- **Dashboard:**
  - List all books with columns: Title, Author, Genre, Year, Status.
  - Pagination with 10 books per page.
  - Search books by title or author.
  - Filters by genre and status.

- **Add/Edit Book:**
  - Modal form with validations using React Hook Form.
  - Supports adding new books or editing existing ones.

- **Delete Book:**
  - Confirmation dialog before deleting a book.

- **Notifications:**
  - Success and error toasts using React Toastify.

- **Responsive UI:**
  - Built with Chakra UI for responsive and accessible design.

- **API Integration:**
  - Uses JSON Server as a mock backend.
  - React Query manages API data fetching and caching.

- **Loading State:**
  - Loading skeletons for better user experience during data fetches.

---

## Technologies Used

- **Framework:** Next.js (React SSR framework)  
- **UI Library:** Chakra UI  
- **Form Handling:** React Hook Form  
- **API State Management:** React Query  
- **Mock API:** JSON Server  
- **Notifications:** React Toastify  

---

## Getting Started

### Prerequisites

- Node.js (>= 16.x recommended)  
- npm or yarn  
- JSON Server installed globally (or you can use `npx`)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd book-management-dashboard
