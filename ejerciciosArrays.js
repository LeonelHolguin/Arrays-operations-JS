const clients = [
    { id: 1, taxNumber: '86620855', name: 'HECTOR ACUÑA BOLAÑOS' },
    { id: 2, taxNumber: '7317855K', name: 'JESUS RODRIGUEZ ALVAREZ' },
    { id: 3, taxNumber: '73826497', name: 'ANDRES NADAL MOLINA' },
    { id: 4, taxNumber: '88587715', name: 'SALVADOR ARNEDO MANRIQUEZ' },
    { id: 5, taxNumber: '94020190', name: 'VICTOR MANUEL ROJAS LUCAS' },
    { id: 6, taxNumber: '99804238', name: 'MOHAMED FERRE SAMPER' },
];
const accounts = [
    { clientId: 6, bankId: 1, balance: 15000 },
    { clientId: 1, bankId: 3, balance: 18000 },
    { clientId: 5, bankId: 3, balance: 135000 },
    { clientId: 2, bankId: 2, balance: 5600 },
    { clientId: 3, bankId: 1, balance: 23000 },
    { clientId: 5, bankId: 2, balance: 15000 },
    { clientId: 3, bankId: 3, balance: 45900 },
    { clientId: 2, bankId: 3, balance: 19000 },
    { clientId: 4, bankId: 3, balance: 51000 },
    { clientId: 5, bankId: 1, balance: 89000 },
    { clientId: 1, bankId: 2, balance: 1600 },
    { clientId: 5, bankId: 3, balance: 37500 },
    { clientId: 6, bankId: 1, balance: 19200 },
    { clientId: 2, bankId: 3, balance: 10000 },
    { clientId: 3, bankId: 2, balance: 5400 },
    { clientId: 3, bankId: 1, balance: 9000 },
    { clientId: 4, bankId: 3, balance: 13500 },
    { clientId: 2, bankId: 1, balance: 38200 },
    { clientId: 5, bankId: 2, balance: 17000 },
    { clientId: 1, bankId: 3, balance: 1000 },
    { clientId: 5, bankId: 2, balance: 600 },
    { clientId: 6, bankId: 1, balance: 16200 },
    { clientId: 2, bankId: 2, balance: 10000 },
];
const banks = [
    { id: 1, name: 'SANTANDER' },
    { id: 2, name: 'CHILE' },
    { id: 3, name: 'ESTADO' },
];


const clientsCopy = [...clients]
const accountsCopy = [...accounts]

// 0 Arreglo con los ids de clientes
const clientsId = clients.map(client => client.id);

// 1 Arreglo con los ids de clientes ordenados por rut
// const clientsIdForRut = clientsCopy.sort((a, b) => b.taxNumber.localeCompare(a.taxNumber))
//                                     .map(client => client.id);

let clientsIdForRut = clients.map(({id, taxNumber}) => ({id, taxNumber}))
clientsIdForRut = clientsIdForRut.sort((a, b) => b.taxNumber.localeCompare(a.taxNumber))
                                    .map(client => client.id)


// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
const accountsClients = accounts.map(({clientId, balance}) => ({clientId, balance}));

let clientBalanceAcum = {}


accountsClients.forEach(({clientId, balance}) => {
    if (!clientBalanceAcum[clientId]) {
        clientBalanceAcum[clientId] = balance;
        return;
    }

    clientBalanceAcum[clientId] += balance;
})


clientBalanceAcum = Object.entries(clientBalanceAcum).map(([key, value]) => ({clientId: key, balance: value}))
clientBalanceAcum.sort((a, b) => b.balance - a.balance)

const arrayClients = clientBalanceAcum.reduce((names, clientBalance) => {
    const client = clients.find(client => client.id === parseInt(clientBalance.clientId))
    names.push(client.name)
    return names
}, [])

// 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
//inicializar acumulador de bancos que sera un objeto

//iterar sobre los bancos

//crear propiedad con el nombre del banco en el acumulador

//iterar sobre accounts 

//si el bankId del accounts es igual al id del banco que se esta iterando entonces vamos a encontrar su clientId respectivo
//y vamos a pushear su taxNumber a nuestra propiedad con el nombre del banco

let banksTaxes = {}


banks.forEach(bank => {
    banksTaxes[bank.name] = [];

    accounts.forEach(({clientId, bankId}) => {
        if (bankId === bank.id) {
            const { name, taxNumber } = clientsCopy.find(client => client.id === clientId)
            !banksTaxes[bank.name].find(client => taxNumber == client.taxNumber) && banksTaxes[bank.name].push({name, taxNumber})
        }
    })
})


Object.keys(banksTaxes).forEach(bank => {
    banksTaxes[bank].sort((a, b) => a.name.localeCompare(b.name))

    banksTaxes[bank] = banksTaxes[bank].map(({ taxNumber }) => taxNumber)

})

// for (const bank in banksTaxes) {
//     banksTaxes[bank].sort((a, b) => a.name.localeCompare(b.name))

//     banksTaxes[bank] = banksTaxes[bank].map(({ taxNumber }) => taxNumber)
// }

// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
const SantanderFind = banks.find(bank => bank.name === "SANTANDER")

const premiumClientsSantander = accounts.filter(account => account.bankId === SantanderFind.id && account.balance > 25000)
premiumClientsSantander.sort((a, b) => b.balance - a.balance)

// 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
let bankAmountAcum = {}

accounts.forEach(({ bankId, balance }) => {
    if (!bankAmountAcum[bankId]) {
        bankAmountAcum[bankId] = balance;
        return
    }

    bankAmountAcum[bankId] += balance;
})

bankAmountAcum = Object.entries(bankAmountAcum).map(([key, value]) => ({bankId: key, amount: value}))
bankAmountAcum.sort((a, b) => a.amount - b.amount)

const banksId = bankAmountAcum.reduce((bank, bankAmount) => {
    const bankId = banks.find(bank => bank.id == bankAmount.bankId)
    bank.push(bankId.id)
    return bank
}, [])

// 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
const clientsPerBank = {};
const cliensWithOnlyBank = {}
let bankFidelity = {}


//patron: double pointer, funciona mas o menos como un set, evitando asi usar for dentro de for para evaluar coincidencias en un array
//OJO: se necesita tener el array ordenado para poder utilizarlo
function countUniqueValue(arr) {
    let firstPointer = 0;
    let secondPointer = 1;

    while(secondPointer < arr.length) {
        if(arr[firstPointer] === arr[secondPointer]) {
            secondPointer++;
            continue;
        }
        firstPointer++;

        arr[firstPointer] = arr[secondPointer]
    }

    arr.splice(firstPointer + 1, secondPointer)

    return arr;
}  

banks.forEach(bank => {
    const orderedAccounts =  accounts.filter(account => bank.id === account.bankId).map(client => client.clientId).sort((a, b) => a - b)
    //manera optimna de utilizar un set para aplicarle metodos nativos de arrays
    //clientsPerBank[bank.name] = [...new Set(orderedAccounts)]
    clientsPerBank[bank.name] = countUniqueValue(orderedAccounts);
})

Object.keys(clientsPerBank).forEach(bank => {
    clientsPerBank[bank].forEach(clientId => {
        bankFidelity[clientId] = ++bankFidelity[clientId] || 1
    })

})

bankFidelity = Object.entries(bankFidelity).map(([key, value]) => {
    if (value === 1) return key
}).filter(clientId => clientId !== undefined)


Object.keys(clientsPerBank).forEach(bank => {
    bankFidelity.forEach(clientId => {
        if(!clientsPerBank[bank].find(client => client === parseInt(clientId))) {
            cliensWithOnlyBank[bank] = cliensWithOnlyBank[bank] || 0
            return
        } 
        cliensWithOnlyBank[bank] = ++cliensWithOnlyBank[bank] || 1
    })
})


// 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
//inicializar el objeto que se va a retornar
//iterar sobre los bancos
//iterar sobre los accounts y retornar los que hagan match con el bankId que se esta iterando
//crear otra variable para almacenar los balances de los clientes
//iterar sobre los accounts de ese banco y cuando se encuentre un id nuevo, se creara una propiedad con el id de ese cliente y se le asignara el valor de su balance
//si ya existe, se le suma el balance encontrado
//volver el objeto un arreglo de objetos
//sortear los accounts por balance y obtener el mas pequeño
//en el objeto que se va a devolver ponerle una propiedad con el nombre del banco y ponerele el valor del clientId del valor obtenido
//devolver el objeto

const poorestClientPerBank = {}


banks.forEach(bank => {
    const clientsBalance = {}
    accounts.filter(account => bank.id === account.bankId).forEach(account => {
        !clientsBalance[account.clientId] ? clientsBalance[account.clientId] = account.balance : clientsBalance[account.clientId] += account.balance
    })
   poorestClientPerBank[bank.name] = parseInt(Object.entries(clientsBalance).map(([key, value ]) => ({clientId: key, balance: value})).sort((a, b) => a.balance - b.balance)[0].clientId)
})

// 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado.
//const maxId = clients.reduce((max, client) => Math.max(max, client.id), 0)

const newClient = {id: clients.at(-1).id + 1, taxNumber: "42451567", name: "Phoenix From UK"}
clients.push(newClient);
 
const bankEstado = banks.find(bank => bank.name === "ESTADO");

const newClientAccount = {clientId: newClient.id, bankId: bankEstado.id, balance: 9000}
accounts.push(newClientAccount)


// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
let rankingsClientsPerBalance = {}

accounts.forEach(({clientId, balance}) => {
    if (!rankingsClientsPerBalance[clientId]) {
        rankingsClientsPerBalance[clientId] = balance;
        return;
    }

    rankingsClientsPerBalance[clientId] += balance;
}) 


rankingsClientsPerBalance = Object.entries(rankingsClientsPerBalance).map(([key, value]) => ({clientId: key, balance: value}))
rankingsClientsPerBalance.sort((a, b) => b.balance - a.balance)

const newClientRanking = rankingsClientsPerBalance.findIndex(client => parseInt(client.clientId) === newClient.id) + 1;

// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución