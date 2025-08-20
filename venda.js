function calcularVenda(venda) {
  const itens = venda.itens || [];
  let subtotal = 0;

 
  if (itens.length === 0) {
    return {
      subtotal: 0,
      descontoTotalPercentual: Math.round((venda.descontoTotalPercentual || 0) * 100) / 100,
      descontoTotalReal: 0,
      totalFinal: 0,
    };
  }

  for (let i = 0; i < itens.length; i++) {
    const valorItem = itens[i].valorItem || 0;
    const descontoPercentual = itens[i].descontoPercentual || 0;
    const descontoReal = itens[i].descontoReal || 0;

    const descontoPorcentagem = (valorItem * descontoPercentual) / 100;
    const descontoMaior = descontoPorcentagem > descontoReal ? descontoPorcentagem : descontoReal;

    let valorComDesconto = valorItem - descontoMaior;
    if (valorComDesconto < 0) valorComDesconto = 0;

    subtotal += valorComDesconto;
  }

  let descontoTotalPercentual = venda.descontoTotalPercentual || 0;
  let descontoTotalReal = venda.descontoTotalReal || 0;

  const descontoPercentualEmValor = (subtotal * descontoTotalPercentual) / 100;
  let descontoAplicado = 0;

  if (subtotal === 0) {
    descontoAplicado = 0;
    descontoTotalReal = 0;
  } else if (descontoTotalPercentual > 0 && descontoTotalReal > 0) {
    if (descontoPercentualEmValor >= descontoTotalReal) {
      descontoAplicado = descontoPercentualEmValor;
      descontoTotalReal = descontoPercentualEmValor;
    } else {
      descontoAplicado = descontoTotalReal;
      descontoTotalPercentual = (descontoTotalReal / subtotal) * 100;
    }
  } else if (descontoTotalPercentual > 0) {
    descontoAplicado = descontoPercentualEmValor;
    descontoTotalReal = descontoPercentualEmValor;
  } else if (descontoTotalReal > 0) {
    descontoAplicado = descontoTotalReal;
    descontoTotalPercentual = (descontoTotalReal / subtotal) * 100;
  }

  let totalFinal = subtotal - descontoAplicado;
  if (totalFinal < 0) totalFinal = 0;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    descontoTotalPercentual: Math.round(descontoTotalPercentual * 100) / 100,
    descontoTotalReal: Math.round(descontoTotalReal * 100) / 100,
    totalFinal: Math.round(totalFinal * 100) / 100,
  };
}

module.exports = calcularVenda;
