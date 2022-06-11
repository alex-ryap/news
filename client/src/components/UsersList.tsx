import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { IUserData } from '../store/admin/adminSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import { useAppDispatch } from '../store/hooks';
import { deleteUser } from '../store/admin/deleteUser';
import { ModalUserRole } from './ModalUserRole';
import { updateUserRole } from '../store/admin/updateUserRole';
import { useNavigate } from 'react-router';

interface IUserListProps {
  usersList: IUserData[];
}

export const UsersList: FC<IUserListProps> = ({ usersList }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);
  const [isOpenUserRoleModal, setIsOpenUserRoleModal] =
    useState<boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserDelete = useCallback(
    (id: number) => {
      dispatch(deleteUser(id));
    },
    [dispatch]
  );

  const handleOpenModal = useCallback((user: IUserData) => {
    setSelectedUser(user);
    setIsOpenUserRoleModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenUserRoleModal(false);
    setSelectedUser(null);
  }, []);

  const handleSaveChangedRole = useCallback(
    (updatedRole: string) => {
      if (selectedUser && selectedUser.role !== updatedRole) {
        dispatch(updateUserRole({ id: selectedUser.id, role: updatedRole }));
      }
      handleCloseModal();
    },
    [dispatch, selectedUser, handleCloseModal]
  );

  return (
    <>
      <TableContainer sx={{ maxHeight: '65vh', mt: 2 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          aria-labelledby="usersTable"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">First name</TableCell>
              <TableCell align="center">Last name</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.firstName}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  <TableCell>
                    <Grid container columnSpacing={1} justifyContent="center">
                      <Grid item>
                        <Tooltip title="Show user posts">
                          <IconButton
                            onClick={() =>
                              navigate(`/admin/${user.id}/posts`, {
                                state: { user },
                              })
                            }
                          >
                            <ArticleIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Change user role">
                          <IconButton onClick={() => handleOpenModal(user)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Delete user">
                          <IconButton onClick={() => handleUserDelete(user.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ mt: 1 }}
        component="div"
        count={usersList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedUser && (
        <ModalUserRole
          role={selectedUser.role}
          isOpen={isOpenUserRoleModal}
          onClose={handleCloseModal}
          onSave={handleSaveChangedRole}
        />
      )}
    </>
  );
};
