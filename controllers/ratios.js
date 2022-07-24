exports.casa = (req,res) => {
    let current_deposits_savings_deposits = req.body.current_deposits_savings_deposits;
    let casa = parseFloat(current_deposits_savings_deposits);
    let total_deposits = req.body.total_deposits;
    let sa = parseFloat(total_deposits);
    let casa1 = casa/sa;
    let casa_ratio = parseFloat(casa1).toFixed(2) * 100;

    return res.status(200).json({
        result : `${casa_ratio}`
    })
}

exports.calculatecurrentassetsandliabilities = (req,res) => {
    
    // Inventory
    let Opening_Stock = parseFloat(req.body.OpeningStock);
    let Purchase = parseFloat(req.body.Purchase);
    let Purchase_Return = parseFloat(req.body.Purchase_Return);
    let COGS = parseFloat(req.body.COGS);
    let Closing_Stock = Opening_Stock+(Purchase-Purchase_Return)-COGS;
    let loose_tools = parseFloat(req.body.LooseTools);
    let Goods_in_Transit = parseFloat(req.body.GoodInTransit);
    let Stock_in_Trade = parseFloat(req.body.StockInTrade);
    let Stores_and_Spares = parseFloat(req.body.ss);

    // account Receivables
    let debtors = parseFloat(req.body.Debtors);
    let Notes_Receivables = parseFloat(req.body.NR);
    let Provision_for_doubtful_debts = parseFloat(req.body.ProvisionForDoubtfulDebts);
    let Bad_Debts = parseFloat(req.body.BadDebts);
    let Allowance_for_doubtful_debts = parseFloat(req.body.add);

    
    // Cash and Cash equivalents are
    let Bank_Balance = parseFloat(req.body.BankBalance);
    let Cheques = parseFloat(req.body.Cheques);
    let Cash_in_Hand = parseFloat(req.body.CashInHand);
    let drafts_in_Hand = parseFloat(req.body.DraftInHand);

    // Current Investments
    let Investments_in_Equity_Instruments = parseFloat(req.body.IEI);
    let Investments_in_Preference_Shares = parseFloat(req.body.IPS);
    let Investment_in_Government_or_Trust_Securities = parseFloat(req.body.IGTS);
    let Investment_in_Debentures_or_bonds = parseFloat(req.body.IDB);
    let Investments_in_Mutual_Funds = parseFloat(req.body.IMF);
    let Investment_in_Partnership_Firms = parseFloat(req.body.IPF);


    // Other Current Assets
    let Prepaid_Expenses = parseFloat(req.body.PE);
    let Accrued_Interest_on_Govt_Securities = parseFloat(req.body.AIGS);

    
    // short Term loans and advances To Employee
    let loan_given_to_employee = parseFloat(req.body.LGTE);
    let unsecured_loans = parseFloat(req.body.ul);
    let secured_loans = parseFloat(req.body.sl);
    let advance_salary_to_employees = parseFloat(req.body.aste);


    // trade payables
    let Sundry_Creditors = parseFloat(req.body.Creditors);
    let Bills_Payable = parseFloat(req.body.BP);

     // Short Term Provisions
    let Provision_for_Taxation = parseFloat(req.body.PFT);
    let Proposed_Dividend_on_Preference_Share = parseFloat(req.body.PDPS);
    let Proposed_Dividend_on_Equity_Share = parseFloat(req.body.PDES);

     // Other current Liabilities
    let Outstanding_Interest_on_loans = parseFloat(req.body.oil);
    let Outstanding_Interest_on_Debentures = parseFloat(req.body.oid);
    let Outsanding_Expenses = parseFloat(req.body.oe);
    let Unpaid_Dividend = parseFloat(req.body.UD);
    let Income_received_in_Advance = parseFloat(req.body.IRA);
    let Calls_in_Advance = parseFloat(req.body.cia);
    let PF_Payable = parseFloat(req.body.PFP);
    let ESI_Payable = parseFloat(req.body.ESIP);
    let VAT_Payable = parseFloat(req.body.VATP);
    let Corporate_Dividend_Tax = parseFloat(req.body.CDT);
    let Central_Sales_Tax_Payable = parseFloat(req.body.CSTP);

    // Short Term Borrowings
    let Loan_Repayable_on_Demand_from_banks = parseFloat(req.body.LRDB);
    let Loan_Repayable_on_Demand_from_other_party = parseFloat(req.body.LRDO);
    let Deposits = parseFloat(req.body.D);
    let Other_Loans_and_advances = parseFloat(req.body.OLA);

    // // Rest of the elements
    let Other_Current_Assets = Prepaid_Expenses + Accrued_Interest_on_Govt_Securities ;
    let Inventory = Closing_Stock+Goods_in_Transit+loose_tools+Stock_in_Trade+Stores_and_Spares;
    let Deffered_Income_Taxes = parseFloat(req.body.D_I_T);
    let Income_Taxes_Receivables = parseFloat(req.body.I_T_R);
    let account_receivables = (debtors-Provision_for_doubtful_debts-Bad_Debts-Allowance_for_doubtful_debts)+Notes_Receivables;
    let Current_Investments = Investments_in_Equity_Instruments+Investments_in_Preference_Shares+Investment_in_Government_or_Trust_Securities+Investment_in_Debentures_or_bonds+Investments_in_Mutual_Funds+Investment_in_Partnership_Firms;
    let short_term_loan_and_advance = loan_given_to_employee+unsecured_loans+secured_loans+advance_salary_to_employees;
    let Cash_and_Cash_Equivalents = Bank_Balance+Cheques+Cash_in_Hand+drafts_in_Hand;
    let Trade_Payables = Sundry_Creditors+Bills_Payable;
    let Other_Current_Liabilities = Outstanding_Interest_on_loans+Outstanding_Interest_on_Debentures+Outsanding_Expenses+Unpaid_Dividend+Income_received_in_Advance+Calls_in_Advance+PF_Payable+ESI_Payable+VAT_Payable+Corporate_Dividend_Tax+Central_Sales_Tax_Payable;
    let Short_Term_Provision = Provision_for_Taxation+Proposed_Dividend_on_Preference_Share+Proposed_Dividend_on_Equity_Share;
    let Short_Term_Borrowings = Loan_Repayable_on_Demand_from_banks+Loan_Repayable_on_Demand_from_other_party+Deposits+Other_Loans_and_advances;

    // // let Insurance_Claims = parseFloat(req.body.IC);
    // // let Wage_Advances = parseFloat(req.body.WA);
    // // let Interest_Payments = parseFloat(req.body.IP);

    let ca = Other_Current_Assets+Inventory+Deffered_Income_Taxes+Income_Taxes_Receivables+account_receivables+Current_Investments+short_term_loan_and_advance+Cash_and_Cash_Equivalents;
    let cl = Trade_Payables+Other_Current_Liabilities+Short_Term_Provision+Short_Term_Borrowings;
    


    return res.status(200).json({
        result : {
            Closing_Stock,
            Inventory,
            Other_Current_Assets,
            account_receivables,
            Current_Investments,
            short_term_loan_and_advance,
            Cash_and_Cash_Equivalents,
            Trade_Payables,
            Other_Current_Liabilities,
            Short_Term_Provision,
            Short_Term_Borrowings,
            ca,
            cl
        }
    })
}

exports.currentRatio = (req,res) => {
    let currentAssets = parseFloat(req.body.ca);
    let currentLiabilities = parseFloat(req.body.cl);
    let currentRatio = parseFloat(currentAssets / currentLiabilities).toFixed(2);
    return res.status(200).json({
        result : {
            currentRatio
        }
    })    
}