import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { orderStatusOptions } from './orderStatus';
import { Row } from './row';
import { Filter, FilterOption } from './styles';

export function Orders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [activeStatus, setActiveStatus] = useState(0);

    const [rows, setRows] = useState([]);


    // Função para carregar os pedidos da API
    useEffect(() => {
        async function loadOrders() {
            try {
                const { data } = await api.get('orders');

                setOrders(data);
                setFilteredOrders(data);

            } catch (error) {
                console.error('Erro ao carregar pedidos:', error);
            }
        }

        loadOrders();
    }, []);
    function createData(order) {
        const { user, orderId, created_at, status, products } = order;
        return {
            name: order.user.name,
            orderId: order._id,
            date: order.created_at,
            status: order.status,
            products: order.products,
        };
    }

    // Atualiza as linhas da tabela com base nos pedidos
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const newRows = filteredOrders.map((order) => createData(order)) || [];
        setRows(newRows);
    }, [filteredOrders]);

    function handleStatus(status) {
        if (status.id === 0) {
            setFilteredOrders(orders);
        } else {
            const newOrders = orders.filter((order) => order.status === status.value);
            setFilteredOrders(newOrders);
        }

        setActiveStatus(status.id);
    }
    // Formatação dos dados para as linhas

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (activeStatus === 0) {

            setFilteredOrders(orders);
        } else {
            const statusIndex = orderStatusOptions.findIndex(
                (item) => item.id === activeStatus,
            );

            const newFilteredOrders = orders.filter(
                (order) => order.status === orderStatusOptions[statusIndex].value,
            );
            setFilteredOrders(newFilteredOrders);
        }

    }, [orders]);

    return (

        <>
            <Filter>
                {orderStatusOptions.map((status) => (
                    <FilterOption
                        key={status.id}
                        onClick={() => handleStatus(status)}
                        $isActiveStatus={activeStatus === status.id}
                    >{status.label}
                    </FilterOption>
                ))}

            </Filter>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Pedido</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Data do Pedido</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row) => (
                                <Row
                                    key={row.orderId}
                                    row={row}
                                    orders={orders}
                                    setOrders={setOrders}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell >
                                    Nenhum pedido encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}