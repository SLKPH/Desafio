const express = require("express");
const app = express();

app.use(express.json());

let pedidos = [];

app.post("/order", (req, res) => {
    const pedido = req.body;
    pedidos.push(pedido);
    res.json(pedido);
});

app.get("/order/:numeroPedido", (req, res) => {
    const numero = req.params.numeroPedido;

    const pedido = pedidos.find(p => p.numeroPedido === numero);

    if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    res.json(pedido);
});

app.get("/order/list", (req, res) => {
    res.json(pedidos);
});

app.put("/order/:numeroPedido", (req, res) => {
    const numero = req.params.numeroPedido;

    const index = pedidos.findIndex(p => p.numeroPedido === numero);

    if (index === -1) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    pedidos[index] = req.body;

    res.json(pedidos[index]);
});

app.delete("/order/:numeroPedido", (req, res) => {
    const numero = req.params.numeroPedido;

    pedidos = pedidos.filter(p => p.numeroPedido !== numero);

    res.json({ mensagem: "Pedido deletado" });
});

app.listen(3000, () => {
    console.log("API rodando na porta 3000");
});