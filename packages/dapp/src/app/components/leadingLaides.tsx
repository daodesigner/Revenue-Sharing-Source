"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./button/Button";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/navigation";
import { isCountdownComplete } from "@/functonality/countdownTimer";
import { desableButton } from "../(test)/functions/disable";

interface Airdrop {
  valid: boolean;
  claimed: boolean;
}

function LeadingLaides() {
  const router = useRouter();
  const { data: session } = useSession();
  const { address } = useAccount();
  const [airDropValues, setAirdropValues] = useState<Airdrop | null>(null);
  const [response, setResponse] = useState<number>();
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const [dropping, setDropping] = useState<boolean>(false)

  const userAddress = address;
  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;

    async function fetchAirdropPermissions() {
      setLoading(true);
      try {
        const host = process.env.NEXT_PUBLIC_HOST;
        const url = `${host}/api/v1/events/airdrop?user_id=${userId}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch airdrop data: ${res.statusText}`);
        }

        const data = (await res.json()) as Airdrop;
        setAirdropValues(data);

      } catch (error: any) {
        console.error("Error fetching airdrop data:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAirdropPermissions();
  }, [userId, render]);

  async function sendAirdropRequest(address: string) {
    try {
      setDropping(true);
      const host = process.env.NEXT_PUBLIC_HOST;
      const url = `${host}/api/v1/events/airdrop`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient: address, user_id: userId }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        setDropping(false);
        throw new Error(responseData.message || `HTTP Error: ${res.status}`);

      } else {
        setResponse(res.status);
        setResponseMessage("Air drop successfully claimed");
        console.log("Airdrop claimed successfully:", responseData);
        setRender((prev) => !prev);
        setDropping(false);
      }



    } catch (error: any) {
      setDropping(false);
      setResponseMessage(
        error.message || "An unexpected error occurred. Please try again."
      );
      console.error("Error claiming airdrop:", error);
    }
  }

  const isAirdropValid = airDropValues?.valid === true && airDropValues?.claimed === false;

  return (
    <section className="bg-gradient-to-r from-orange-400 to-orange-600 p-4
                      rounded-md border-b md:border-b-0 shadow-lg
                      md:flex md:flex-row md:gap-6 items-center md:mx-[15%] ">
      <div className="w-full md:w-1/2 h-[360px] rounded-xl overflow-hidden 
                    bg-[url('/all-women.png')] bg-cover bg-center bg-primary-50/25
                     transform transition-transform duration-500"></div>
      
      <div className="space-y-8 md:w-1/2 flex flex-col justify-between pt-6 md:pt-0">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight
                       leading-tight">
            The Leading Ladies of Zambia
          </h1>
          
          <div className="space-y-4">
            <p className="text-lg text-white/90 leading-relaxed">
              The "Leading Ladies of Zambia" virtual exhibit showcases the extraordinary 
              achievements of Women who have shaped history, culture, and progress. 
          
              Through these curated artifacts, personal narratives, and immersive 
              storytelling, we celebrate the unsung heroines who have driven social, 
              political, and cultural transformations.
            </p>
          </div>
        </div>

        {!userAddress ? (
          <ConnectKitButton.Custom>
            {({ show }) => (
              <Button 
                onClick={show} 
                variant="white" 
                className="w-fit "
              >
                Purchase Ticket
              </Button>
            )}
          </ConnectKitButton.Custom>
        ) : (
          <div className="flex flex-wrap gap-4">
            <Link href="/cya">
              <Button className="text-base font-medium px-8 py-2.5">
                Purchase Ticket
              </Button>
            </Link>
            {loading ? (
              <Button variant="white" disabled className="text-base">
                Loading...
              </Button>
            ) : isAirdropValid && isCountdownComplete() === true ? (
              <Button
                disabled={desableButton(response, loading)}
                className={`text-base font-medium px-8 py-2.5
                          ${loading && "cursor-wait"} 
                          ${response === 200 && "cursor-not-allowed"}`}
                onClick={() => sendAirdropRequest(userAddress)}
                variant="white"
              >
                {dropping ? "Sending Funds" : response && response === 200
                  ? responseMessage
                  : "Claim Air Drop"}
              </Button>
            ) : (
              <Link href="/distribution">
                <Button variant="white" className="text-base font-medium px-8 py-2.5">
                  Learn More
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
export default LeadingLaides;