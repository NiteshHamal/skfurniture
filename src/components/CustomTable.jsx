import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

function CustomTable({ columns, rows }) {
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.key}>{col.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((col) => (
                                    <TableCell key={col.key}>
                                        {col.key === 'image' ? (
                                            <img src={row[col.key]} alt={row.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4, }} />
                                        ) : col.key === 'description' ? (
                                            <span style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,    // limit to 1 line
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }} dangerouslySetInnerHTML={{ __html: row[col.key] }} />
                                        ) : (
                                            row[col.key]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CustomTable
