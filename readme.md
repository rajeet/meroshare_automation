# MeroShare IPO Automation

This project automates the process of applying for Initial Public Offerings (IPOs) of stocks on the MeroShare web application using Cypress, a powerful automation framework. The automation is configured to run daily through GitHub Actions, checking for new IPOs and applying automatically if any are available.

## Features

- **Automated IPO Application:** Uses Cypress to automate the process of applying for IPOs on MeroShare.
- **Scheduled Execution:** Configured with GitHub Actions to run daily at 5:00 AM UTC and check for new IPOs, applying if any are found.
- **Secure Secrets Handling:** Utilizes GitHub Secrets to securely store sensitive information like login credentials.
- **Telegram Notifications:** Sends status updates and test videos to your Telegram channel.

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

3. Setup Environment Variables
   
   Create a `.env` file based on `.env.example` with the following variables:

   ```
   USER_NAME="your_username"           # Your MeroShare Username
   PASSWORD="your_password"            # Your MeroShare Password
   DP="your_dp"                       # Your Depository Participants (DP) Name
   TRANSACTION_PIN=1234               # Your Transaction PIN
   CRN="your_crn"                     # Your CRN Number
   MAX_IPO_PRICE=150                  # Maximum IPO Price (Won't apply if price exceeds this)
   BANK_NAME="your_bank"              # Your Bank Name
   KITTA=10                          # Number of units to apply for (minimum 10)
   TELEGRAM_TOKEN="your_token"        # Telegram Bot Token
   TELEGRAM_CHAT_ID="your_chat_id"    # Telegram Chat ID for notifications
   ```

4. Run Cypress:

   ```bash
   npm run cypress:open  # For interactive mode
   npm run cypress:run   # For headless mode
   ```

## GitHub Actions Setup

The automation is configured to run through GitHub Actions. It supports multiple user configurations and runs daily at 11:45 AM NPT.

### Configuration

1. In your GitHub repository settings, add your environment configurations as secrets:
   - Create a secret for each user's environment (e.g., `KESH`, `ABHI`)
   - Each secret should contain the complete environment configuration in the format shown above

2. The workflow will:
   - Run for each configured environment
   - Execute the Cypress tests
   - Upload test videos as artifacts
   - Send status notifications and videos to Telegram

3. **Important:** If you modify or add environment variables, ensure you also update the [schedule-run.yaml](.github/workflows/schedule-run.yaml) file to properly handle them.

### Features of GitHub Actions Workflow

- **Multiple User Support:** Runs tests for multiple users in parallel
- **Manual Trigger:** Supports manual workflow runs through GitHub UI
- **Artifact Storage:** Stores test videos for 30 days
- **Telegram Integration:** 
  - Sends success/failure notifications
  - Uploads test videos to Telegram
  - Uses emojis for better visibility (✅ for success, ❌ for failure)

### Automation in Action
![Demo]("./../demo.gif").
