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
} from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { updateTagsList } from '../store/admin/updateTagsList';
import { TagModal } from './TagModal';

interface ITagsListProps {
  tagsList: string[];
}

export const TagsList: FC<ITagsListProps> = ({ tagsList }) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isOpenTagModal, setIsOpenTagModal] = useState<boolean>(false);

  const updateTags = useCallback(
    (tagsList: string[]) => {
      dispatch(updateTagsList(tagsList));
    },
    [dispatch]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = useCallback((tag: string) => {
    setSelectedTag(tag);
    setIsOpenTagModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenTagModal(false);
    setSelectedTag('');
  }, []);

  const handleTagDelete = useCallback(
    (tagToDelete: string) => {
      const updatedTagsList = [
        ...tagsList.filter((tag) => tag !== tagToDelete),
      ];
      updateTags(updatedTagsList);
    },
    [updateTags, tagsList]
  );

  const handleSaveChangedTag = useCallback(
    (updatedTag: string) => {
      if (selectedTag && selectedTag !== updatedTag) {
        const updatedTagsList = [
          ...tagsList.map((tag) => (tag === selectedTag ? updatedTag : tag)),
        ];
        updateTags(updatedTagsList);
      }
      handleCloseModal();
    },
    [updateTags, tagsList, selectedTag, handleCloseModal]
  );

  return (
    <>
      <TableContainer sx={{ maxHeight: '60vh', mt: 2 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          aria-labelledby="usersTable"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Tag name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tagsList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((tag, idx) => (
                <TableRow key={idx}>
                  <TableCell align="center">{tag}</TableCell>
                  <TableCell>
                    <Grid container columnSpacing={1} justifyContent="center">
                      <Grid item>
                        <IconButton onClick={() => handleOpenModal(tag)}>
                          <EditIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => handleTagDelete(tag)}>
                          <DeleteIcon />
                        </IconButton>
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
        count={tagsList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedTag && (
        <TagModal
          isOpen={isOpenTagModal}
          tag={selectedTag}
          onClose={handleCloseModal}
          onSave={handleSaveChangedTag}
        />
      )}
    </>
  );
};
