import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading, Button } from '@chakra-ui/react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://e-commerce-be-yi97.onrender.com/admin/users');
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://e-commerce-be-yi97.onrender.com/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-4">
      <Heading as="h2" size="xl" mb="4">Manage Users</Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Delete User</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.userName}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <Button colorScheme="red" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageUsers;
