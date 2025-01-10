const bill = JSON.parse(sessionStorage.getItem("bill"));
/*
déjà avec cette commande ci dessous on intègre la plateforme paypal
sur la page web et les boutons et liens apparaissent interagissant
paypal.Buttons({
{}[]    
}).render("#paypal-button-container");*/


paypal.Buttons({

    createOrder: function (data, actions){
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: `${bill}`,
                }
            }]
        })
    },
    onApprove: function (data, actions){
        return actions.order.capture().then(function(details){
            alert("Transaction réussite: Merci " +details.payer.name.given_name);
        })
    },
    onCancel: function(data){
        alert("Payment cancelled");
    },
    onError: function (data, actions){
        console.error('payment error :', err);
        alert("payment échoué !");
    }

}).render("#paypal-button-container");