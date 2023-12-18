# MeroShare IPO Automation

This project automates the process of applying for Initial Public Offerings (IPOs) of stocks on the MeroShare web application using Cypress, a powerful automation framework. The automation is configured to run daily through GitHub Actions, checking for new IPOs and applying automatically if any are available.

## Features

- **Automated IPO Application:** Uses Cypress to automate the process of applying for IPOs on MeroShare.
- **Scheduled Execution:** Configured with GitHub Actions to run daily and check for new IPOs, applying if any are found.
- **Secure Secrets Handling:** Utilizes GitHub Secrets to securely store sensitive information like login credentials.

## Setup

### Running Locally
### Prerequisites

- Node.js
- Cypress

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/rajeet/meroshare_automation
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Setup Environment variable
   
   ```
    Create .env file
    - `USER_NAME` = your MeroShare Username
    - `PASSWORD` = Your MeroShare Password
    - `DP` =   Your Depository Participants (DP) Name
    - `TRANSACTION_PIN` = Your Transaction PIN
    - `CRN` = Your CRN Number 
    - `MAX_IPO_PRICE` = Maximum IPO Price. (If IPO price is more than this price then the IPO wont be applied.)         
    - `BANK_NAME` = Your Bank Name (You can leave this empty if the bank name is empty)
    - `KITTA` = Minimum kitta to apply  
   ```

4. You can run the Cypress automation locally to test or make adjustments:

```
npm run cypress:open
npm run cypress:run
```

## Run using github action

### Configuration

1. Set up GitHub Secrets for:
   - `USER_NAME` = your MeroShare Username
   - `PASSWORD` = Your MeroShare Password
   - `DP` =   Your Depository Participants (DP) Name
   - `TRANSACTION_PIN` = Your Transaction PIN
   - `CRN` = Your CRN Number 
   - `MAX_IPO_PRICE` = Minimum IPO Price. (If IPO price is more than this price then the IPO wont be applied.)         
   - `BANK_NAME` = Your Bank Name (You can leave this empty if the bank name is empty)
   - `KITTA` = Minimum kitta to apply  

### Automation in Action
![Demo]("./../demo.gif)