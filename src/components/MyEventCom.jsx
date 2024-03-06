import { Alert } from 'flowbite-react';
import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { contractAddress, abi } from '../utils/contract';
import SingleEvent from './SingleEvent';
import { formatEther } from 'viem';

const MyEventCom = () => {
  const { address } = useAccount();
  const { data: events, error } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getAllEventBuyParticipant',
    args: [address],
  });

  const eventData = events?.map((event, inede) => ({
    eventID: Number(event.eventID),
    image: event.imageHash,
    title: event.title,
    description: event.description,
    startDate: new Date(Number(event.startDate) * 1000).toLocaleDateString(),
    endDate: new Date(Number(event.endDate) * 1000).toLocaleDateString(),
    price: Number(formatEther(event.price)).toFixed(6),
    totalAmount: Number(formatEther(event?.totalAmount)).toFixed(6),

    owner: event.owner,
    Participante:
      Number(event.raimainTicket) + '/' + Number(event.totaleTicket),
  }));
  return (
    <div className="grid  max-w-7xl p-3 w-full mx-auto gap-4 my-6 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4">
      {eventData?.length ? (
        eventData?.map((item, index) => <SingleEvent item={item} key={index} />)
      ) : (
        <Alert color={'failure'} className="w-full">
          You do not have any tickets.
        </Alert>
      )}
    </div>
  );
};

export default MyEventCom;
