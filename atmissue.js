class Bank {
    constructor() {
        this.accounts = []; 
    }

    addUser(name, accountNumber, pin, balance = 0) {
        let user = {
            name: name,
            accountNumber: accountNumber,
            pin: pin,
            balance: balance
        };
        this.accounts.push(user);
        alert(`New account created for ${name} with Account Number: ${accountNumber}`);
    }

    getAccount(accountNumber, pin) {
        for (let i = 0; i < this.accounts.length; i++) {
            if (this.accounts[i].accountNumber === accountNumber && this.accounts[i].pin === pin) {
                return this.accounts[i];
            }
        }
        return 0;
    }
}

class Issue {
    constructor() {
        this.issues = [];
    }

    logIssue(accountNumber, description) {
        try {
            if (!accountNumber || !description) {
                console.log("Account number and issue description are required.");
            }
            let iss = {
                accountNumber : accountNumber,
                description : description
            };
            this.issues.push(iss);
        } catch (error) {
            console.error("Error: " + error.message);
        }
    }
}

class ATM {
    constructor(bank, issueSystem) {
        this.bank = bank;
        this.issueSystem = issueSystem;
    }

    customerDetails() {
        let accountNumber = Number(prompt("Enter Account Number:"));
        let pin = Number(prompt("Enter PIN:"));
        let user = this.bank.getAccount(accountNumber, pin);
       
        if (user) {
            alert(`Customer Name: ${user.name}\nAccount Number: ${user.accountNumber}\nBalance: ${user.balance}`);
        } else {
            alert("Invalid account number or PIN.");
        }
    }

    credit() {
        let accountNumber = Number(prompt("Enter Account Number:"));
        let pin = Number(prompt("Enter PIN:"));
        let amount = Number(prompt("Enter amount to deposit:"));
        let user = this.bank.getAccount(accountNumber, pin);
       
        if (user && amount > 0) {
            user.balance += amount;
            alert(`${amount} credited. New Balance: ${user.balance}`);
        } else {
            alert("Invalid account details or deposit amount.");
        }
    }

    debit() {
        let accountNumber = Number(prompt("Enter Account Number:"));
        let pin = Number(prompt("Enter PIN:"));
        let amount = Number(prompt("Enter amount to withdraw:"));
        let user = this.bank.getAccount(accountNumber, pin);
       
        if (user && amount > 0 && amount <= user.balance) {
            user.balance -= amount;
            alert(`${amount} debited. Remaining Balance: ${user.balance}`);
        } else {
            alert("Invalid account details or insufficient balance.");
        }
    }

    newUser() {
        let name = prompt("Enter your name:");
        let accountNumber = Number(prompt("Enter a new Account Number:"));
        let pin = Number(prompt("Set a 4-digit PIN:"));
        let balance = Number(prompt("Enter initial deposit amount (optional, default is 0):"));
       
        this.bank.addUser(name, accountNumber, pin, balance);
    }

    reportIssue() {
        try {
            let accountNumber = Number(prompt("Enter your Account Number:"));
            let description = prompt("Describe the issue you are facing:");
            this.issueSystem.logIssue(accountNumber, description);
            alert("Your issue has been logged successfully.");
        } catch (error) {
            alert("Error: " + error.message);
        }
    }
}

const myBank = new Bank();
const issueSystem = new Issue();
const atmMachine = new ATM(myBank, issueSystem);

function mainMenu() {
    while (true) {
        let choice = prompt("ATM System:\n1. New User\n2. Check Details\n3. Deposit\n4. Withdraw\n5. Report Issue\n6. Exit");
       
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
                atmMachine.reportIssue();
                break;
            case "6":
                alert("Thank you for using our ATM!");
                return;
            default:
                alert("Invalid choice. Please try again.");
        }
    }
}

mainMenu();
