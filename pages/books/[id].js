// pages/books/[id].tsx

export async function getStaticPaths() {
  // Example: return 3 static book paths
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false, // or true if you want to load others on demand
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id, // pass the id as a prop
    },
  };
}

export default function BookDetail({ id }) {
  return <div>Book ID: {id}</div>;
}
