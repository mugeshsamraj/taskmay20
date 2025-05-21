import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} py={3}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link href="/" legacyBehavior={false}>
            <Text fontSize="xl" fontWeight="bold" color="white">
              Book Dashboard
            </Text>
          </Link>
        </Box>
        <Flex alignItems="center">
          {/* More nav items */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
