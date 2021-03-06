import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { ComponentBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      margin: theme.spacing(0),
    },
    container: {
      boxShadow: 'none',
    },
    table: {
      minWidth: 650,
      tableLayout: 'fixed',
    },
    countCell: {
      width: '100px',
    },
  }),
);

const createData = (version: string, modified: string, state: string) => {
  return {
    version,
    modified,
    state,
  };
};

const rows = [
  createData('v0.1.0', '2020.01.02', '고정'),
  createData('v0.2.0', '2020.02.02', '활성'),
];

interface ProjectSettingsVersionListProps extends ComponentBaseProps {}

const ProjectSettingsVersionList: React.FC<ProjectSettingsVersionListProps> = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.root}>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>버전</TableCell>
              <TableCell>마지막 수정일</TableCell>
              <TableCell>상태</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.version}>
                <TableCell component="th" scope="row">
                  <Link href="/edit">{row.version}</Link>
                </TableCell>
                <TableCell>{row.modified}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell align="right">
                  <DeleteOutlineIcon />
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProjectSettingsVersionList;
