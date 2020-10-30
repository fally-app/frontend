import { TableRow } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import {
    createStyles,
    makeStyles,
    Theme,
    useTheme,
} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../store/reducer'
import { IuserState } from '../store/slices/users'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    })
)

interface TablePaginationActionsProps {
    count: number
    page: number
    rowsPerPage: number
    onChangePage: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles()
    const theme = useTheme()
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, 0)
    }

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, page - 1)
    }

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, page + 1)
    }

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page">
                {theme.direction === 'rtl' ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page">
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page">
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page">
                {theme.direction === 'rtl' ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </div>
    )
}

// function createData(name: string, calories: number, fat: number) {
//     return { name, calories, fat }
// }

// const rows = [
//     createData('Cupcake', 305, 3.7),
//     createData('Donut', 452, 25.0),
//     createData('Eclair', 262, 16.0),
//     createData('Frozen yoghurt', 159, 6.0),
//     createData('Gingerbread', 356, 16.0),
//     createData('Honeycomb', 408, 3.2),
//     createData('Ice cream sandwich', 237, 9.0),
//     createData('Jelly Bean', 375, 0.0),
//     createData('KitKat', 518, 26.0),
//     createData('Lollipop', 392, 0.2),
//     createData('Marshmallow', 318, 0),
//     createData('Nougat', 360, 19.0),
//     createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1))

const useStyles2 = makeStyles({
    root: {
        width: '80%',
        overflowY: 'auto',
    },
    table: {
        minWidth: 500,
    },
})

export default function Users(): React.ReactElement {
    const classes = useStyles2()
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const userState: IuserState = useSelector((state: RootState) => state.users)

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, userState.users.length - page * rowsPerPage)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    if (userState.error) {
        return <div>{userState.error}</div>
    } else if (userState.isLoading) {
        return <div>loading.....</div>
    } else if (userState.users) {
        return (
            <TableContainer className={classes.root} component={Paper}>
                <Table
                    className={classes.table}
                    aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>LastName</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Family Name</TableCell>
                            <TableCell>Class</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? userState.users.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : userState.users
                        ).map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.lastName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.gender}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: 'All', value: -1 },
                                ]}
                                colSpan={3}
                                count={userState.users.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: false,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        )
    }
}