const downloadFile = ({ base64data: base64Data, fileName }: { base64data: string, fileName: string }) => {
    // Cria um link temporário
    const link = document.createElement('a');

    // Configura o link para download
    link.href = 'data:application/octet-stream;base64,' + base64Data;
    link.download = fileName;

    // Adiciona o link ao DOM e dispara o clique
    document.body.appendChild(link);
    link.click();

    // Remove o link do DOM
    document.body.removeChild(link);
};

export default downloadFile