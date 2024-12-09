const { ethers } = require('ethers');

async function encodeOrganizerServiceArgs() {
   const museumAddress = '0x3935e5BED378aCeD49655b3E1fA8c0e68550fbaa';
   const usdtTokenAddress = '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58';

   // Define types and values for EventOrganizerService constructor
   const organizerTypes = ['address', 'address'];
   const organizerValues = [museumAddress, usdtTokenAddress];

   // ABI encode constructor arguments
   const organizerEncodedArgs = ethers.utils.defaultAbiCoder.encode(
      organizerTypes,
      organizerValues
   );
   console.log(
      'EventOrganizerService ABI Encoded Constructor Arguments:',
      organizerEncodedArgs
   );
}

encodeOrganizerServiceArgs().catch(console.error);
