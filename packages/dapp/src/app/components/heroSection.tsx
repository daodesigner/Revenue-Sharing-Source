"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./button/Button";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

function HeroSection() {
  const { data: session } = useSession();
  const { address } = useAccount();
  const userAddress = address;
  const [response, setResponse] = useState<number | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");

  async function sendAirdropRequest(address: string) {
    const host = process.env.NEXT_PUBLIC_HOST;
    const url = `${host}/api/v1/events/airdrop`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient: address }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP Error: ${response.status}`);
      }

      
      if (session && session.user.airdrop) {
         session.user.airdrop.claimed = true;
     }
      setResponse(response.status);
      setResponseMessage("Air drop successfully claimed");
      console.log("Response:", responseData);
    } catch (error: any) {
      setResponseMessage(
        error.message || "An unexpected error occurred. Please try again."
      );
      console.error("Error:", error);
    }
  }

  const isAirdropValid =
    session?.user?.airdrop?.valid === true &&
    session?.user?.airdrop?.claimed === false;

  return (
    <section className="bg-gradient-to-r from-orange-400 via-orange-600 to-orange-700 rounded-xl p-8 border-b md:border-b-0 border-primary-900-5 space-y-8 pb-10 md:flex md:flex-row md:gap-8">
      <div className="w-full md:w-1/2 h-[342px] rounded-lg overflow-hidden bg-[url('/all-women.png')] bg-cover bg-center bg-primary-50/25"></div>
      <div className="space-y-6 md:w-1/2 flex flex-col justify-between">
        <div className="space-y-4">
          <h1 className="text-primary-50 font-bold">The Leading Ladies</h1>
          <p className="text-primary-50/80 leading-relaxed">
            Those who walked before us and those to come. Those who wore red
            clay masks and rested their heads on bended knees. Those who washed
            the cowry bead and swung the snuff cup. Those who weaved the baskets
            and wrapped the cloth. Those who fought for peace and danced to the
            drum.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={"/cya"}>
            <Button>Enter Exhibit</Button>
          </Link>

          {isAirdropValid ? (
            !userAddress ? (
              <ConnectKitButton.Custom>
                {({ show }) => (
                  <Button onClick={show} variant="white">
                    Connect Wallet
                  </Button>
                )}
              </ConnectKitButton.Custom>
            ) : (
              <Button
                onClick={() => sendAirdropRequest(userAddress)}
                variant="white"
              >
                {response && response === 200
                  ? responseMessage
                  : "Claim Air Drop"}
              </Button>
            )
          ) : (
            <Link href={"/distribution"}>
              <Button variant="white">Learn More</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
