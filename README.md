#### In this project, I've developed a decentralized event management application based on blockchain technology. There are three main use cases:

1. Event Creation:

- Anyone can create an event with no restrictions, providing the following details:
- Title
- Description (limited to 270 characters)
- The start date, which must be in the future to avoid transaction reversal
- The end date, following the same criteria as the start date
- Total number of available tickets for the event
- Price (optional, allowing the event to be free or paid)
- Event image upload using IPFS.

2. Participation via Ticket (ByTicket):

- Users can participate in an event by acquiring tickets.

3. Withdrawal of Total Amount:

- For paid events, only the owner can withdraw the total amount. Otherwise, the transaction will revert.

#### Tools utilized in this project include:

- ReactJS
- Tailwind CSS
- Followbite React
- Rainbowkit
- Wagmi
- Solidity
- IPFS, specifically utilizing Pinata Cloud IPFS for image uploads.
