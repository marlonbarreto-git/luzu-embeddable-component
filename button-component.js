const setOrganizationCode = paymentData =>  {
    const element = document.getElementById('luzu-pay-button');

    element.style.display = 'inline-grid';

    const button = document.createElement('button');
    button.appendChild(document.createTextNode('luzu'));

    button.style.width = '300px';
    button.style.height = '40vh';
    button.style['border-radius'] = '13px';
    button.style['border-color'] = 'transparent';
    button.style.background = '#60c4dc';
    button.style.color = '#fff';
    button.style['font-size'] = '7vw';
    button.style['font-weight'] = 'bold';

    element.appendChild(button);    

    window.luzuOnClick = () => {
        document.getElementById('luzu-error-msj')?.remove();

        fetch('https://luzu-api.herokuapp.com/create-transaction', {
            method: 'POST',
            body: JSON.stringify(paymentData),
            headers: {
                'Content-Type': 'application/json'
            },  
        }).then(response => window.open(`https://luzu-fe.vercel.app/auth?transaction_id=${response.data}`))
        .catch(error => {
            const errorMsj = document.createElement('span');
    
            errorMsj.setAttribute('id', 'luzu-error-msj');
            errorMsj.appendChild(document.createTextNode('Something went wrong.'));
    
            errorMsj.style.display = 'flex';
            errorMsj.style['justify-content'] = 'center';
            errorMsj.style.color = 'red';
    
            element.appendChild(errorMsj);
        })
    };

    button.setAttribute('onclick', 'window.luzuOnClick()');
}
