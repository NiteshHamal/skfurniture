import { Edit } from '@mui/icons-material'
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

function CustomTable({ columns, rows, onEdit }) {
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
                                        ) : col.key === 'action' ? (
                                            <Box sx={{ display: 'flex', gap:1}}>
                                                {onEdit && (
                                                    <IconButton
                                                        size='small'
                                                        color='primary'
                                                        onClick={() => onEdit(row)}
                                                    >
                                                        <Edit fontSize='small' />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        ) :(
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
