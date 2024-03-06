import hre from 'hardhat';

const currentTimestampInSeconds = Math.round(Date.now() / 1000);

const event = await ethers.deployContract('Event');

await event.waitForDeployment();

console.log(`deployed to ${event.target}`);
