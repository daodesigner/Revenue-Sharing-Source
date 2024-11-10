import { ethers } from "hardhat";

async function main() {

    // Get the signers
    const [owner, beneficiary1, beneficiary2] = await ethers.getSigners();
    // Hardcoded addresses
    const museumAddress = "";
    const organizerServiceAddress = "";
    const artifactNFT1 = "";

  
    const exhibit1 ={
        name: "The Leading Ladies of Zambia",
        symbol: "LLEZ",
        ticketPrice: ethers.parseUnits("5", 6),
        beneficiaries: [beneficiary1.address, beneficiary2.address],
        shares: [80, 20],
        baseURI: "https://s3.tebi.io/tickets/",
        location: "Virtual Space",
        artifactNFT: artifactNFT1,
        details: "Join us as we reclaim and create new history.",
        id: "LLE1"
    }

    // Connect to the contracts
    const OrganizerService = await ethers.getContractFactory("EventOrganizerService");
    const Museum = await ethers.getContractFactory("Museum");
    const ArtifactNFT = await ethers.getContractFactory("ArtifactNFT");
    
    const organizerService = OrganizerService.attach(organizerServiceAddress).connect(owner);
    const museum = Museum.attach(museumAddress).connect(owner);
    const artifactNFT = ArtifactNFT.attach(artifactNFT1).connect(owner);
    
    // Organize an exhibit
    const tx1 = await organizerService.connect(owner).organizeExhibit( 
            exhibit1.name, // name
            exhibit1.symbol, // exhibit symbol
            exhibit1.ticketPrice, // ticket price
            exhibit1.beneficiaries, // beneficiaries
            exhibit1.shares, // shares
            exhibit1.baseURI, // base URI
            exhibit1.location, // location
            exhibit1.artifactNFT, // ArtifactNFT address
            exhibit1.details, // details
            exhibit1.id //exhibit id
        );
    const receipt1 = await tx1.wait(6);
    console.log("Organized Exhibit 1", receipt1.status)

 
    // Read the contract state
    const exhibitNFTAddress = await organizerService.exhibits(exhibit1.id);
    console.log("ExhibitNFT 1 deployed to:", exhibitNFTAddress)

    const tx3 =  await museum.curateExhibit(exhibit1.id, exhibitNFTAddress);
    const receipt3 = await tx3.wait(6);
    console.log("Curated Exhibit 1", receipt3.status)

    // get usdcToken set on museum exhibits
    const exhibitMuseumAddress = await museum.exhibits(exhibit1.id);

    console.log("ExhibitNFT 1 deployed to:", exhibitNFTAddress)
    console.log("Exhibit1 Museum deployed to:", exhibitMuseumAddress)

    //mint artifactNFTs - exhibit 1
    const tx4 = await artifactNFT.mint(owner.address, 6);
    const receipt4 = await tx4.wait(6);
    console.log("Minted ArtifactNFT 1", receipt4.status)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });