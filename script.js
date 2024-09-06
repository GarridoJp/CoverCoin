document.addEventListener('DOMContentLoaded', () => {
    const valorRealInput = document.getElementById('valorReal');
    const valorDolarOutput = document.getElementById('valorDolar');
    const cotacaoAtualSpan = document.getElementById('cotacaoAtual');

    async function fetchCotacao() {
        try {
            
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');
            
           
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const cotacao = data.rates.USD;
            cotacaoAtualSpan.textContent = `1 BRL = ${cotacao.toFixed(2)} USD`;

            valorRealInput.addEventListener('input', () => {
                const valorReal = parseFloat(valorRealInput.value);
                if (!isNaN(valorReal)) {
                    const valorDolar = valorReal * cotacao;
                    valorDolarOutput.value = valorDolar.toFixed(2);
                } else {
                    valorDolarOutput.value = '';
                }
            });
        } catch (error) {
            cotacaoAtualSpan.textContent = 'Erro ao carregar a cotação';
            console.error('Erro ao buscar a cotação:', error);
        }
    }

    fetchCotacao();
});