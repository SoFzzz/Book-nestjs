import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';

interface Pedido {
    id: string;
    descripcion: string;
    amount: number;
    metodoPago: 'credito' | 'tc' | 'efectivo';
}


@Controller('pedidos')
export class PedidosController {

    private pedidos: Pedido[] = [

        {
            id: '1',
            descripcion: 'Pedido de libros',
            amount: 150.00,
            metodoPago: 'credito'
        },


        {
            id: '2',
            descripcion: 'Pedido de ropa',
            amount: 250.00,
            metodoPago: 'tc'
        },

        {
            id: '3',
            descripcion: 'Pedido de comida',
            amount: 100.00,
            metodoPago: 'efectivo'
        }
    ]

    @Get()
    getPedidos(): Pedido[] {
        return this.pedidos;
    }

    @Get('pago/credito')
    getPedidoByCredito(): Pedido[] {
        return this.pedidos.filter(p => p.metodoPago === 'credito');
    }

    @Get('pago/tc')
    getPedidoByTarjetaCredito(): Pedido[] {
        return this.pedidos.filter(p => p.metodoPago === 'tc');
    }

    @Get('pago/efectivo')
    getPedidoByEfectivo(): Pedido[] {
        return this.pedidos.filter(p => p.metodoPago === 'efectivo');
    }

    @Get('pago/:tipo')
    getPedidoByTipo(@Param('tipo') tipo: string): Pedido[] {
        return this.pedidos.filter(p => p.metodoPago === tipo);
    }

    @Get(':id')
    getPedidoById(@Param('id') id: string): Pedido | undefined {
        return this.pedidos.find(p => p.id === id);
    }

    @Post()
    crearPedido(@Body() nuevoPedido: Pedido){
        this.pedidos.push(nuevoPedido);
        return {
            mensaje: 'Pedido creadoo exitosamente',
            pedido: nuevoPedido,
        };
    }

    @Delete(':id')
    eliminarPedido(@Param('id') id: string) {
        const index = this.pedidos.findIndex(p => p.id === id);
            if (index === -1) {
                return { mensaje: `El pedido con ID ${id} no existe.` };
            }
            const pedidoEliminado = this.pedidos.splice(index, 1);
            return {
                mensaje: `Pedido con ID ${id} eliminado correctamente.`,
                pedido: pedidoEliminado[0],
            };
        }
    }

