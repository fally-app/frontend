import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'

import NavBar from '../components/NavBar'

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
    },
    root: {
        width: '85%',
    },
    container: {
        maxHeight: 440,
    },
})

interface ReportProps {
    report: [
        {
            _id: string
            absent: 0
            created_at: string
            family: {
                _id: string
                name: string
            }
            helped: number
            presents: number
            sabbath_week: number
            sick: number
            startedSabbath: number
            studied7times: number
            visited: number
            vistors: number
            wereHelped: number
            wereVisted: number
            year: number
            percentage: number
        }
    ]
}

export const Report: React.FC<ReportProps> = ({
    report,
}): React.ReactElement => {
    const classes = useStyles()

    return (
        <>
            <NavBar />
            <div className={classes.wrapper}>
                <Paper className={classes.root}>
                    <TableContainer component={Paper}>
                        <Table aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Family name</TableCell>
                                    <TableCell align="right">Abaje</TableCell>

                                    <TableCell align="right">
                                        Abarwayi
                                    </TableCell>
                                    <TableCell align="right">
                                        Abafashije
                                    </TableCell>

                                    <TableCell align="right">
                                        Abafashijwe
                                    </TableCell>
                                    <TableCell align="right">Abasuye</TableCell>
                                    <TableCell align="right">Abasuwe</TableCell>
                                    <TableCell align="right">Abize 7</TableCell>
                                    <TableCell align="right">
                                        Abatangiye isabato
                                    </TableCell>
                                    <TableCell align="right">
                                        Abasibye
                                    </TableCell>
                                    <TableCell align="right">
                                        Abashyitsi
                                    </TableCell>
                                    <TableCell align="right">Percent</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {report.map(row => (
                                    <TableRow key={row._id}>
                                        <TableCell>{row.family.name}</TableCell>
                                        <TableCell align="right">
                                            {row.presents}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.sick}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.helped}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.wereHelped}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.visited}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.wereVisted}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.studied7times}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.startedSabbath}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.absent}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.vistors}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.percentage}%
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </>
    )
}
export default Report

export const getServerSideProps: GetServerSideProps = async () => {
    const result = await Axios.get(
        process.env.SERVER_BASE_URL + '/api/family/attendance'
    )

    return {
        props: {
            report: result.data.data,
        },
    }
}
