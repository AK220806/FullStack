var readline = require('readline'); // Import readline-sync

class Bank {
    constructor() {
        this.accounts = [];
    }

    addUser(name, accountNumber, pin, balance = 0) {
        let user = { name, accountNumber, pin, balance };
        this.accounts.push(user);
        console.log(`New account created for ${name} with Account Number: ${accountNumber}`);
    }

    getAccount(accountNumber, pin) {
        for (let i = 0; i < this.accounts.length; i++) {
            if (this.accounts[i].accountNumber === accountNumber && this.accounts[i].pin === pin) {
                return this.accounts[i];
            }
        }
        return null;
    }
}

class ATM {
    constructor(bank) {
        this.bank = bank;
    }

    customerDetails() {
        let accountNumber = Number(readline.question("Enter Account Number: "));
        let pin = Number(readline.question("Enter PIN: ", { hideEchoBack: true })); // Hide PIN input
        let user = this.bank.getAccount(accountNumber, pin);

        if (user) {
            console.log(`\nCustomer Name: ${user.name}\nAccount Number: ${user.accountNumber}\nBalance: ${user.balance}`);
        } else {
            console.log("Invalid account number or PIN.");
        }
    }

    credit() {
        let accountNumber = Number(readline.question("Enter Account Number: "));
        let pin = Number(readline.question("Enter PIN: ", { hideEchoBack: true }));
        let amount = Number(readline.question("Enter amount to deposit: "));
        let user = this.bank.getAccount(accountNumber, pin);

        if (user && amount > 0) {
            user.balance += amount;
            console.log(`$${amount} credited. New Balance: $${user.balance}`);
        } else {
            console.log("Invalid account details or deposit amount.");
        }
    }

    debit() {
        let accountNumber = Number(readline.question("Enter Account Number: "));
        let pin = Number(readline.question("Enter PIN: ", { hideEchoBack: true }));
        let amount = Number(readline.question("Enter amount to withdraw: "));
        let user = this.bank.getAccount(accountNumber, pin);

        if (user && amount > 0 && amount <= user.balance) {
            user.balance -= amount;
            console.log(`${amount} debited. Remaining Balance: ${user.balance}`);
        } else {
            console.log("Invalid account details or insufficient balance.");
        }
    }

    newUser() {
        let name = readline.question("Enter your name: ");
        let accountNumber = Number(readline.question("Enter a new Account Number: "));
        let pin = Number(readline.question("Set a 4-digit PIN: ", { hideEchoBack: true }));
        let balance = Number(readline.question("Enter initial deposit amount (optional, default is 0): "));

        this.bank.addUser(name, accountNumber, pin, balance);
    }
}

const myBank = new Bank();
const atmMachine = new ATM(myBank);

function mainMenu() {
    while (true) {
        console.log("\nATM System:\n1. New User\n2. Check Details\n3. Deposit\n4. Withdraw\n5. Exit");
        let choice = readline.question("Choose an option: ");

        switch (choice) {
            case "1":
                atmMachine.newUser();
                break;
            case "2":
                atmMachine.customerDetails();
                break;
            case "3":
                atmMachine.credit();
                break;
            case "4":
                atmMachine.debit();
                break;
            case "5":
                console.log("Thank you for using our ATM!");
                return;
            default:
                console.log("Invalid choice. Please try again.");
        }
    }
}

mainMenu();
