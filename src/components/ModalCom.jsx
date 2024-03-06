import { Button, Modal, TextInput, Textarea } from 'flowbite-react';
import React, { useEffect } from 'react';
import { MdOutlineSubtitles } from 'react-icons/md';
import { MdDescription } from 'react-icons/md';
import { MdDateRange } from 'react-icons/md';
import { BsCashCoin } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { parseEther } from 'viem';
import { contractAddress, abi } from '../utils/contract';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ModalCom = ({ openModal, setOpenModal, item }) => {
  const { address } = useAccount();
  const navigate = useNavigate();

  function onCloseModal() {
    setOpenModal(false);
  }
  const {
    data: hash,
    error,
    writeContract: buy,
    isPending,
  } = useWriteContract();
  const BuyTicket = () => {
    buy({
      address: contractAddress,
      abi,
      functionName: 'buyTickets',
      value: parseEther((item?.price).toString()),
      args: [item?.eventID],
    });
  };
  const {
    data: hashwidthdraw,
    error: errorwithdraw,
    writeContract: withdraw,
  } = useWriteContract();
  const withdrawfn = () => {
    withdraw({
      address: contractAddress,
      abi,
      functionName: 'withdraw',
      args: [item?.eventID],
    });
  };

  const { isLoading: isConfirmingBuy, isSuccess: isConfirmedBuy } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { isLoading: isConfirmingwithdraw, isSuccess: isConfirmedwithdraw } =
    useWaitForTransactionReceipt({
      hashwidthdraw,
    });
  useEffect(() => {
    if (error || errorwithdraw) {
      toast.error(error.shortMessage);
    }
    if (isConfirmedBuy) {
      navigate('/myevent');
    }
    if (isConfirmedwithdraw) {
      window.location.reload();
    }
    if (isConfirmingBuy || isConfirmingwithdraw) {
      toast.success('Waiting until the transaction is finished.');
    }
  }, [
    isConfirmingBuy,
    isConfirmedBuy,
    isConfirmingwithdraw,
    error,
    errorwithdraw,
  ]);
  const { data: events } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'participate',
    args: [address, item.eventID],
  });
  return (
    <>
      <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Details Event
            </h3>

            <img
              src={item?.image}
              alt=""
              className="w-full h-40 object-fill rounded-md "
            />

            <div>
              <TextInput
                readOnly
                value={item?.title}
                icon={MdOutlineSubtitles}
              />
            </div>
            <div>
              <Textarea
                readOnly
                value={item?.description}
                onResize={false}
                className="resize-none h-28"
              />
            </div>
            <div>
              <TextInput
                readOnly
                value={`Start data ${item?.startDate}`}
                icon={MdDateRange}
              />
            </div>

            <div>
              <TextInput
                readOnly
                value={`End data ${item?.startDate}`}
                icon={MdDateRange}
              />
            </div>
            <div>
              <TextInput readOnly value={item?.Participante} icon={FaUsers} />
            </div>
            <div>
              <TextInput
                readOnly
                value={`${item.price} MATIC`}
                icon={BsCashCoin}
              />
            </div>
            <div>
              <TextInput
                readOnly
                value={`Owner ${item.owner}`}
                icon={MdDateRange}
              />
            </div>
            <div className=" flex justify-between items-center gap-4">
              {item?.owner == address ? (
                <Button
                  gradientDuoTone="purpleToPink"
                  className="w-full"
                  onClick={withdrawfn}
                  disabled={item?.totalAmount <= 0}
                >
                  Withdraw
                </Button>
              ) : (
                <>
                  <Button
                    gradientDuoTone="purpleToPink"
                    className="w-full"
                    onClick={BuyTicket}
                    disabled={events}
                  >
                    Buy Ticket
                  </Button>
                  {events && (
                    <p className="w-full font-semibold">
                      Has been joined here.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCom;
