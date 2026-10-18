Test 1
Loan: £6000, Rent: £120/wk, Spend: £50/wk, Starting: £100
Expected: goes negative in Week 13 with -£110 balance
Actual: flagged Week 13 shortfall of £110.00
Pass/fail: PASS

Test 2
Loan: £0, Rent: £0, Spend: £0, Starting: £0
Expected: no crash, stays at £0 all year
Actual: stayed at £0 with positive balance message
Pass/fail: PASS

Test 3
Loan: £12000, Rent: £50/wk, Spend: £30/wk, Starting: £500
Expected: balance never goes negative
Actual: green message: stays positive for all 40 weeks
Pass/fail: PASS

Test 4
Negative number entered (-100)
Expected: error message, no crash
Actual: displayed "Please enter valid, non-negative numbers"
Pass/fail: PASS