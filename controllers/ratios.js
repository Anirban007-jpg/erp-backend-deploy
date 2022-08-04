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
    
    let cl1 = Trade_Payables+Other_Current_Liabilities+Short_Term_Provision;
    let NetWorkingCapital = ca-cl1;

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
            cl,
            NetWorkingCapital
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

exports.quickratio = (req,res) => {
    let CurrentAssets = parseFloat(req.body.ca);
    let Inventories = parseFloat(req.body.inventories);
    let PE = parseFloat(req.body.PE);
    let Quick_Assets = CurrentAssets-Inventories-PE;
    let Current_Liabilities = parseFloat(req.body.cl);
    let QR = (Quick_Assets/Current_Liabilities);
    let Quick_Ratio = parseFloat(QR).toFixed(2);
    return res.status(200).json({
        result: {
            Quick_Ratio
        }
    }) 
}

exports.absoluteLiquidityRatio = (req,res) => {
    let Cash_Balance =  parseFloat(req.body.CashatHand);
    let Bank_Balance = parseFloat(req.body.CashatBank);
    let Current_Investments = parseFloat(req.body.Current_Investments);
    let Current_Liabilities = parseFloat(req.body.Current_Liabilities);
    let Cash_Ratio = parseFloat((Cash_Balance+Bank_Balance+Current_Investments)/Current_Liabilities).toFixed(2);
    return res.status(200).json({
        result: {
            Cash_Ratio
        }
    })
}

exports.BasicDefenseInterval = (req,res) => {
    let COGS = parseFloat(req.body.COGS);
    let S_A = parseFloat(req.body.S_A);
    let Depreciation_OtherNonCashExpenditure = parseFloat(req.body.Depreciation_OtherNonCashExpenditure);
    let NoD = parseFloat(req.body.NoD);
    let DOE = parseFloat((COGS+S_A-Depreciation_OtherNonCashExpenditure)/NoD).toFixed(2);
    let CA = parseFloat(req.body.CA);
    let Prepaid_Expenses = parseFloat(req.body.Prepaid_Expenses);
    let Inventory = parseFloat(req.body.Inventory);
    let BDI = parseFloat((CA-Prepaid_Expenses-Inventory)/DOE).toFixed(2);
    return res.status(200).json({
        result: {
            DOE,
            BDI
        }
    })
}

exports.EquityRatio = (req,res) => {
    let general_Reserve = parseFloat(req.body.General_Reserve);
    let addition_during_the_year = parseFloat(req.body.adty);
    let no_of_equity_shares = parseInt(req.body.no_of_equity_shares);
    let Equity_Share_Face_Value = parseFloat(req.body.Face_Value);
    let Authorised_Capital = parseFloat(no_of_equity_shares*Equity_Share_Face_Value).toFixed(2);   
    let Issued_Capital = parseFloat(no_of_equity_shares*Equity_Share_Face_Value).toFixed(2);   
    let Securities_Premium = parseFloat(req.body.SP);
    let Premium_on_redemption_of_Preference_Share = parseFloat(req.body.prps);
    let Capital_Redemption_Reserve = parseFloat(req.body.CRR);
    let Reissued_Face_Value = parseInt(req.body.RFV);
    let Forfited_Share_Value = parseInt(req.body.FSV);
    let no_of_shares = parseFloat(req.body.nos);
    let Amount_Received = parseFloat(Forfited_Share_Value*no_of_shares).toFixed(2);
    let ReIssued_Amount_received = parseFloat((Forfited_Share_Value-Reissued_Face_Value)*no_of_shares).toFixed(2);
    let Capital_Reserve = parseFloat(Amount_Received -ReIssued_Amount_received).toFixed(2);
    let Priliminary_Expenses = parseFloat(req.body.Priliminary_Expenses);
    let Profit_and_Loss_for_the_year = parseFloat(req.body.PL);
    let Profit_For_the_Year = parseFloat(req.body.PY);
    let surplus = parseFloat(Profit_and_Loss_for_the_year+Profit_For_the_Year).toFixed(2);
    let Preferetial_dividend_Paid = parseFloat(req.body.PDP);
    let Transfer_To_General_Reserve = parseFloat(req.body.TGR);
    let Interim_Dividend_paid = parseFloat(req.body.IDP);
    let Final_Dividend_paid = parseFloat(req.body.FDP);
    let Corporate_Dividend_Tax = parseFloat(req.body.CDT);
    let Proposed_Prefence_Dividend_paid = parseFloat(req.body.PPDP);
    let Proposed_Equity_Dividend_paid = parseFloat(req.body.PEDP);
    let Appropriations = parseFloat(Preferetial_dividend_Paid+Transfer_To_General_Reserve+Interim_Dividend_paid+Final_Dividend_paid+Corporate_Dividend_Tax+Proposed_Prefence_Dividend_paid+Proposed_Equity_Dividend_paid);
    let Calls_in_arrears = parseFloat(req.body.CIA);
    let Reserve_and_Surplus = parseFloat(general_Reserve+addition_during_the_year+Authorised_Capital+Issued_Capital+(Securities_Premium-Premium_on_redemption_of_Preference_Share)+Capital_Redemption_Reserve+Capital_Reserve-Priliminary_Expenses-Calls_in_arrears+surplus-Appropriations).toFixed(2);
    let Equity_Share_Capital = parseFloat(req.body.ESC);
    let Preference_Share_Capital = parseFloat(req.body.PSC);
    let Shareholder_Equity = parseFloat(Reserve_and_Surplus + Equity_Share_Capital + Preference_Share_Capital).toFixed(2);
    let Current_Assets = parseFloat(req.body.CA);
    let Current_Liabilities = parseFloat(req.body.CL);
    let Net_Assets = parseFloat(Current_Assets-Current_Liabilities);
    let Equity_Ratio = parseFloat(Shareholder_Equity/Net_Assets).toFixed(2);
    return res.status(200).json({
        result : {
            Reserve_and_Surplus,
            ShareHolder_Equity,
            Net_Assets,
            Equity_Ratio
        }
    })
}