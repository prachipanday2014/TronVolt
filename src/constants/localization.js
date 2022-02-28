import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
  'en-US': {
    Reward: 'Reward',
    Setting: 'Setting',
    Portfolio: 'Portfolio',
    Wallet: 'Wallet',
    Address_book: 'Address book',
    Invite_Friends: 'Invite Friends',
    Buy_Crypto: 'Buy Crypto',
    Light_Theme: 'Light Theme',
    Dark_Theme: 'Dark Theme',
    Localization: 'Localization',
    Language: 'Language',
    Currency: 'Currency',

    Featured: 'Featured',
    News: 'News',
    Recieve: 'Recieve ',
    MainAccount: 'Main Account',
    Browser: 'Browser',
    SelectToken: 'Select Token',
    All: 'ALL',

    // welcome screen dynamic strings
    welcomeTo: 'Welcome to',
    appNameText: 'Kinja',
    welcomeSubTitleText: 'Multi coin p2p wallet',
    version: 'v 1.0.2',
    gotItBtnText: 'Okay, I got it!',
    restoreWallet: 'Restore Wallet',
    // enter pin screen
    securityCheck: 'SECURITY CHECK',
    enterNewPin: 'Enter Your Pin',
    reEnterPin: 'Re-Enter Pin',
    // seeds screen
    seedTitle: 'SEED',
    seedsNoteParagraph:
      'Please write down your 12 words Back-Up Seed on a paper, in the exact same order as shown below, and store the paper with the seed in safe place. Your word seed and provate key give direct access to your account and funds. Do not give this information to ANYONE',
    writtenItDown: "I've Written It Down",
    getNewSeed: 'GET NEW SEED',
    seedsNoteParagraph02:
      'The seed key is a human-readable representation of your wallet. Those words in that exact order can be used to re-create your wallet.',
    // seed match
    seedConfirmTitle: 'SEED CONFIRM',
    seedsMatchNotepara:
      'Your 12 words Seed and Private key give direct access to your account and funds. Do not give this information to ANYONE. We repeat, Never give your 12 words seed and Prive key to anyone.',
    verify: 'Verify',
    // Seed confirm Scren
    securityAlert: 'SECURITY ALERT',
    stayTune: 'Stay tuned!',
    seedConParagraph01: ' Your seed or private key gives direct access to your',
    seedConParagraph02: 'account. NEVER give this information to others.',
    never: 'NEVER!',
    privacyText01: 'I Understand that if I share this information,',
    privacyText02: 'I am putting my account in risk',
    next: 'NEXT',
    // Seed Confirm again
    willNeverAsk: 'We will never ask',
    forYourSeed: 'for your seed.',
    impNotice: 'Important notice!',
    seedConAgainPara01: 'No one on the team request the',
    seedConAgainPara02: "user's seed or private key.",
    seedConAgainPara03: 'Whether through support , promotion,',
    seedConAgainPara04: 'giveaway, website, telegram bot or any',
    seedConAgainPara05: 'other type of contact.',
    //Restore wallet
    restoreWalletTitle: 'RESTORE WALLET',
    restoreWalletPlaceholder: 'Please, type you 12 seed words here',
    restoreWalletParagraph:
      'The seed key is human-readable representation of your wallet. Those words in that exact order can be used to re-create your wallet.',
    restore: 'Restore',

    //Swap
    Swap: 'Swap',
    YOU_PAY: 'YOU PAY',
    YOU_GET: 'YOU GET',
    Next: 'Next',
    Enter_how_much_you_want_to_swap: 'Enter how much you want to swap',
    token_not_available:
      'Currently there is no available token to swap for REEF',
    validAmtMsg: 'Please enter amount',
    duplicateSelection: 'Duplicate selection',
    //Swap_Amount
    SEND: 'SEND',
    SEND_HEADER_PARA:
      'We are performing a maintainance on REEF nodes and some virtual information may not be correct. We will be back soon.',
    Amount: 'Amount',
    To: 'To',
    Use_address: 'Use address',
    Send_btn: 'Send',

    // Swap_Transaction
    Send_Transaction: 'Send Transaction',
    From: 'From',
    Will_Receive: 'Will Receive',
    From_Currency: 'From Currency',
    To_Currency: 'To Currency',
    Fee_Detail: 'Fee Detail',
    Fee_Option: 'Fee Option',
    Transaction_Detail: 'Transaction Detail',
    Transaction_Type: 'Transaction Type',
    Submit_Transaction: 'Submit Transaction',

    // Swap_Success

    Transaction: 'Transaction',
    Continue: 'Continue',
    Success: 'Success',

    //ChargeAmount
    ChargeTitle: 'Charge',
    AmountTitle: 'Amount',
    AmountParagraph: 'ENTER HOW MUCH YOU WANT TO RECEIVE',
    //ChargeDiscription
    ChargeDiscription: 'DESCRIPTION (OPTIONAL)',
    ChargePlaceholder: 'Add Description',
    //BuyCrypto2
    ProceedToCheckout: 'Proceed to checkout',
    Redirected: ' You will be redirected to Simplex to make the',
    paymentSecurity: ' payment security',

    To: 'To',
    BuyCrypto2Placeholder: 'BTC MAIN Account',
    BuyCrypto2Para: 'Fee Included',
    //SelectAccount
    AccountTitle: 'Main Account',
    SelectAccount: 'Select Account',
    Available: 'Available',
    Unconfirmed: 'Unconfirmed',
    Transactions: 'Transactions',
    From: 'From',
    Confirmed: 'Confirmed',
    SendTitle: 'SEND',
    ReceiveTitle: 'RECEIVE',
    ScanTitle: 'SCAN',
    ChargeArr: 'CHARGE',
    BuyTitle: 'Buy',
    SelectAccountPara:
      ' We are performing a maintainance on REEF nodes and some virtual information may not be correct. We will be back soon',

    BTC: 'BTC',
    USD: 'USD',

    //SendAmount1
    Balance: 'Balance',
    amountValidMsg: 'Enter amount should be greater than 20',
    balanceValidMsg: 'Balance should be greater than 0',
    //SendAmount2
    SendAmount2Placeholder: 'use address',
    //SendTransaction
    SendTransactionTitle: 'Send Transaction',
    FeeDetails: 'Fee Detail',
    FeeOption: ' Fee Option',
    TransactionDetail: 'Transaction Detail',
    Time: 'Time',
    TransactionType: 'Transaction Type',
    SubmitTransaction: 'Submit Transaction',

    // portfolio
    Account: 'Accounts',
    Crypto: 'Cryptos',

    //settings
    BackupWallet: 'Backup Wallet',
    Security: 'Security',
    Cancel: 'Cancel',
    ChooseCurrency: 'Please, choose a Currency Below',

    //sucess :
    Continue: 'Continue',
  },
  IN: {
    Reward: 'इनाम',
    Setting: 'स्थापना',
    Portfolio: 'संविभाग',
    Wallet: 'बटुआ',
    Address_book: 'पता पुस्तिका',
    Invite_Friends: 'मित्रों को आमंत्रित करें',
    Buy_Crypto: 'क्रिप्टो खरीदें',
    Light_Theme: 'लाइट थीम',
    Localization: 'स्थानीयकरण',
    Language: 'भाषा',
    Currency: 'मुद्रा',
    Featured: 'विशेष रुप से प्रदर्शित',

    News: 'News',
    Recieve: 'Recieve ',
    MainAccount: 'Main Account',
    Browser: 'Browser',

    // welcome screen dynamic strings
    welcomeTo: 'Welcome to',
    appNameText: 'Kinja',
    welcomeSubTitleText: 'Multi coin p2p wallet',
    gotItBtnText: 'Okey, I got it!',
    restoreWallet: 'Restore wallet',
    // enter pin screen
    securityCheck: 'SECURITY CHECK',
    enterNewPin: 'Enter Your Pin',
    reEnterPin: 'Re-Enter Pin',
    // seeds screen
    seedTitle: 'SEED',
    seedsNoteParagraph:
      'Please write down your 12 words Back-Up Seed on a paper, in the exact same order as shown below, and store the paper with the seed in safe place. Your word seed and provate key give direct access to your account and funds. Do not give this information to ANYONE',
    writtenItDown: "I've Written It Down",
    getNewSeed: 'GET NEW SEED',
    seedsNoteParagraph02:
      'The seed key is a human-readable representation of your wallet. Those words in that exact order can be used to re-create your wallet.',
    // seed match
    seedConfirmTitle: 'SEED CONFIRM',
    seedsMatchNotepara:
      'Your 12 words Seed and Private key give direct access to your account and funds. Do not give this information to ANYONE. We repeat, Never give your 12 words seed and Prive key to anyone.',
    verify: 'Verify',
    // Seed confirm Scren
    securityAlert: 'SECURITY ALERT',
    stayTune: 'Stay tuned!',
    seedConParagraph01: ' Your seed or private key gives direct access to your',
    seedConParagraph02: 'account. NEVER give this information to others.',
    never: 'NEVER!',
    privacyText01: 'I Understand that if I share this information,',
    privacyText02: 'I am putting my account in risk',
    next: 'NEXT',
    // Seed Confirm again
    willNeverAsk: 'We will never ask',
    forYourSeed: 'for your seed.',
    impNotice: 'Important notice!',
    seedConAgainPara01: 'No one on the team request the',
    seedConAgainPara02: "user's seed or private key.",
    seedConAgainPara03: 'Whether through support , promotion,',
    seedConAgainPara04: 'giveaway, website, telegram bot or any',
    seedConAgainPara05: 'other type of contact.',
    //Restore wallet
    restoreWalletTitle: 'RESTORE WALLET',
    restoreWalletPlaceholder: 'Please, type you 12 seed words here',
    restoreWalletParagraph:
      'The seed key is human-readable representation of your wallet. Those words in that exact order can be used to re-create your wallet.',
    restore: 'Restore',

    //ChargeAmount
    ChargeTitle: 'Charge',
    AmountTitle: 'Amount',
    AmountParagraph: 'ENTER HOW MUCH YOU WANT TO RECEIVE',

    //ChargeDiscription
    ChargeDiscription: 'DESCRIPTION (OPTIONAL)',
    ChargePlaceholder: 'Add Description',
    //BuyCrypto2

    To: 'To',
    BuyCrypto2Placeholder: 'BTC MAIN Account',
    BuyCrypto2Para: 'Fee Included',
    //SelectAccount
    AccountTitle: 'Main Account',
    SelectAccount: 'Select Account',
    Available: 'Available',
    Unconfirmed: 'Unconfirmed',
    Transactions: 'Transactions',
    From: 'From',
    Confirmed: 'Confirmed',
    SendTitle: 'SEND',
    ReceiveTitle: 'RECEIVE',
    ScanTitle: 'SCAN',
    ChargeArr: 'CHARGE',
    BuyTitle: 'Buy',
    SelectAccountPara:
      ' We are performing a maintainance on REEF nodes and some virtual information may not be correct. We will be back soon',
    //SendAmount1
    Balance: 'Balance',
    //SendAmount2
    SendAmount2Placeholder: 'use address',
    //SendTransaction
    SendTransactionTitle: 'Send Transaction',
    FeeDetails: 'Fee Detail',
    FeeOption: ' Fee Option',
    TransactionDetail: 'Transaction Detail',
    Time: 'Time',
    TransactionType: 'Transaction Type',
    SubmitTransaction: 'Submit Transaction',
  },
});
export default strings;
