# UniCost Simulation Logic & Manual Test

## Test Case 1:
- Starting Savings: £100
- Annual Loan: £6,000 (£2,000 per instalment at Weeks 1, 15, 29)
- Weekly Outgoings: £170 (£120 rent + £50 spend)

## Expected Result:
- Week 1 balance: £1,930
- Week 12 balance: £60
- Week 13 balance: -£110 (CRASH WEEK: Balance goes negative!)
- Shortfall: £110 in Week 13

When we write the JavaScript on Day 5, the code MUST output that the balance goes negative in Week 13. If it outputs something else, our code has a bug.