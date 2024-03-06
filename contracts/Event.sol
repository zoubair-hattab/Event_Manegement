// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract Event {

    struct EventData {
        uint256 eventID;
        string imageHash;
        address owner;
        string title;
        string description;
        uint256 startDate;
        uint256 endDate;
        uint256 price;
        uint256 totalAmount;
        uint256 totaleTicket;
        uint256 raimainTicket;
    }
    uint256 id;

    mapping(uint256 => EventData) events;
    mapping(address => mapping(uint256 => bool)) public participate;

    function createEvent(
        
        string memory _imageHash,
        string memory _title,
        string memory _description,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _price,
        uint256 _totaleTicket
    ) external {
        require(
            _startDate >= block.timestamp,
            "start event date must be start in future"
        );
        require(
            _endDate >= block.timestamp ,
            "end event date must be in future"
        );
        require(_totaleTicket > 0, " amount of tickets must be more than 0");
        id++;
        EventData memory evt;
        evt.eventID=id;
        evt.imageHash = _imageHash;
        evt.owner = msg.sender;
        evt.title = _title;
        evt.description = _description;
        evt.startDate = _startDate;
        evt.endDate = _endDate;
        evt.price = _price;
        evt.totaleTicket = _totaleTicket;
        events[id] = evt;
    }

    function buyTickets(uint eventId) public payable {
        require(events[eventId].owner != address(0), "Even does not exist");
        require(
            events[eventId].raimainTicket <  events[eventId].totaleTicket ,
            "There are no remaining tickets"
        );
        require(
            msg.value == events[eventId].price,
            "Payment did not match event ticket price"
        );
             require(
            events[eventId].startDate < block.timestamp,
            "This Event not started yet."
        );
        require(
            events[eventId].endDate > block.timestamp,
            "This Event has been finished."
        );
        participate[msg.sender][eventId] = true;
        events[eventId].totalAmount += msg.value;
        events[eventId].raimainTicket += 1;
    }

    function getAllEventBuyParticipant(address _participant)
        external
        view
        returns (EventData[] memory)
    {
        uint256 itemCount = id;
        uint256 numberofEvent = 0;
        for (uint256 i = 1; i <= itemCount; i++) {
            if (participate[_participant][i]) {
                numberofEvent++;
            }
        }

        uint index = 0;
        EventData[] memory items = new EventData[](numberofEvent);
        for (uint256 i = 1; i <= itemCount; i++) {
            if (participate[_participant][i]) {
                EventData storage currentItem = events[i];
                items[index++] = currentItem;
            }
        }
        return items;
    }

    function getAllEvent() external view returns (EventData[] memory) {
        uint256 itemCount = id;
        uint256 currentIndex = 0;
        EventData[] memory items = new EventData[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            EventData storage currentItem = events[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    function withdraw(uint _id) external {
        require(msg.sender == events[_id].owner, "You are not the owner.");
        require(events[_id].totalAmount>0,'You have been withdrawn.');
        uint amount = events[_id].totalAmount;
        events[_id].totalAmount = 0;
        payable(msg.sender).transfer(amount);
    }
}
