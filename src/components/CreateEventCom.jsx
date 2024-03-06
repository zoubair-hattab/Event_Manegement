import axios from 'axios';
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  TextInput,
  Textarea,
} from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { abi, contractAddress, uinxTime } from '../utils/contract';
import { useNavigate } from 'react-router-dom';
import { parseEther } from 'viem';

const CreateEventCom = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState();
  const [eventForm, setEventForm] = useState({
    price: '0',
  });
  const [file, setFile] = useState(null);
  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(uinxTime(eventForm?.startDate));
  useEffect(() => {
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: ' 840b37c1b53ca87c08f0',
            pinata_secret_api_key:
              '7b9ec6401fac3f416c83136ee701757506f7050fb855696491ef7435773d60e9',
          },
        }
      );
      setEventForm({
        ...eventForm,
        image: `https://gateway.pinata.cloud/ipfs/${response?.data?.IpfsHash}`,
      });
    };
    if (file) {
      handleUpload();
    }
  }, [file]);
  const handleChangeInput = (e) => {
    setEventForm({
      ...eventForm,
      [e.target.id]: e.target.value,
    });
  };

  const {
    data: hash,
    error,
    writeContract: create,
    isPending,
  } = useWriteContract();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventForm?.title && !eventForm?.description && !eventForm?.price) {
      toast.error('Please fill in your input .');
    }

    create({
      address: contractAddress,
      abi: abi,
      functionName: 'createEvent',
      args: [
        eventForm?.image,
        eventForm?.title,
        eventForm?.description,
        uinxTime(eventForm?.startDate),
        uinxTime(eventForm?.endDate),
        parseEther(eventForm?.price),
        eventForm?.totaleTicket,
      ],
    });
  };
  //waiting untill the function add to the blockchain
  const { isLoading: isConfirmingApprove, isSuccess: isConfirmedApprove } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  useEffect(() => {
    if (error) {
      toast.error(error.shortMessage);
    }
    if (isConfirmedApprove) {
      navigate('/');
    }
    if (isConfirmingApprove) {
      toast.success('Waiting untill transaction finished.');
    }
  }, [isConfirmedApprove, isConfirmingApprove, error]);
  return (
    <div className="max-w-xl w-full p-4 mx-auto shadow-lg mt-20 dark:bg-slate-800">
      <h1 className="font-semibold text-2xl mb-4 text-center">Create Event</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <TextInput
          type="type"
          id="title"
          placeholder="Title"
          onChange={handleChangeInput}
        />
        <Textarea
          type="type"
          id="description"
          placeholder="Description"
          className="resize-none h-32"
          maxLength={465}
          onChange={handleChangeInput}
        />
        <TextInput
          type="datetime-local"
          id="startDate"
          onChange={handleChangeInput}
        />
        <TextInput
          type="datetime-local"
          id="endDate"
          onChange={handleChangeInput}
        />
        <TextInput
          type="number"
          id="totaleTicket"
          onChange={handleChangeInput}
          placeholder="Number of Ticket."
        />
        <div className="flex items-center justify-between ">
          <TextInput
            type="text"
            id="price"
            placeholder="price"
            className="w-[65%]"
            disabled={active}
            onChange={handleChangeInput}
          />
          <div className="flex items-center gap-2">
            <Checkbox id="free" onChange={(e) => setActive(e.target.checked)} />
            <Label htmlFor="free">Free</Label>
          </div>
        </div>

        <FileInput accept="image/*" onChange={handleChangeFile} />
        {file && (
          <img
            src={file && URL.createObjectURL(file)}
            className="w-28 h-28 object-cover rounded-full block mx-auto"
          />
        )}
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="w-full"
          outline
          disabled={!eventForm?.image}
        >
          Create Event
        </Button>
      </form>
    </div>
  );
};

export default CreateEventCom;
