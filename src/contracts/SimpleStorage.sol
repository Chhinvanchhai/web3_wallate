// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
    }
    
    Transaction[] public transactions;
    mapping(address => uint256) public balances;
    
    event Transfer(address indexed from, address indexed to, uint256 amount);
    
    function transfer(address _to) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(_to != address(0), "Invalid address");
        
        balances[msg.sender] += msg.value;
        balances[_to] += msg.value;
        
        transactions.push(Transaction(
            msg.sender,
            _to,
            msg.value,
            block.timestamp
        ));
        
        emit Transfer(msg.sender, _to, msg.value);
    }
    
    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }
    
    function getTransaction(uint256 _index) public view returns (
        address sender,
        address receiver,
        uint256 amount,
        uint256 timestamp
    ) {
        require(_index < transactions.length, "Transaction does not exist");
        Transaction memory txn = transactions[_index];
        return (txn.sender, txn.receiver, txn.amount, txn.timestamp);
    }
}