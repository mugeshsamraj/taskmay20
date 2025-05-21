import { Box, Skeleton, Stack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const LoadingSkeleton = ({ type = 'table' }) => {
  if (type === 'table') {
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th><Skeleton height="20px" width="80px" /></Th>
            <Th><Skeleton height="20px" width="100px" /></Th>
            <Th><Skeleton height="20px" width="80px" /></Th>
            <Th><Skeleton height="20px" width="70px" /></Th>
            <Th><Skeleton height="20px" width="60px" /></Th>
            <Th><Skeleton height="20px" width="120px" /></Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(10)].map((_, i) => (
            <Tr key={i}>
              <Td><Skeleton height="20px" width="100px" /></Td>
              <Td><Skeleton height="20px" width="150px" /></Td>
              <Td><Skeleton height="20px" width="90px" /></Td>
              <Td><Skeleton height="20px" width="80px" /></Td>
              <Td><Skeleton height="20px" width="70px" /></Td>
              <Td><Skeleton height="20px" width="100px" /></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }


  return (
    <Stack>
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
    </Stack>
  );
};

export default LoadingSkeleton;