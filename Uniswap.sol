// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "./String.sol";

contract CustomToken is ERC20 {
    constructor(
        string memory _tokenName,
        string memory _symbolToken
    ) ERC20(_tokenName, _symbolToken) {
        // msg.sender => Uniswap
        _mint(msg.sender, 1000000 * 10 ** 18);
    }

    // IMPORTANTTTTTTTTTTTTTTTTTT ĐẶC BIỆT CHÚ Ý
    function approve_custom(
        address owner,
        address spender,
        uint256 value
    ) public returns (bool) {
        _approve(owner, spender, value);
        return true;
    }
}

contract Uniswap {
    using String for string;
    using Math for uint;
    // VietNamDong => VND , UnitedStatesDollar = > USD,  AustralianDollar => AUD
    string[] public tokenNames = [
        "VietNamDong",
        "UnitedStatesDollar",
        "AustralianDollar"
    ];

    string[] public tokenSymbols = ["VND", "USD", "AUD"];

    mapping(string => uint) public priceOfTokens;

    // Mapping store token : VND => contract VND
    mapping(string => CustomToken) public tokens;

    constructor() {
        for (uint i = 0; i < tokenNames.length; i++) {
            CustomToken token = new CustomToken(tokenNames[i], tokenSymbols[i]); // Uniswap
            tokens[tokenSymbols[i]] = token;
        }

        // initial value mapping
        priceOfTokens["VND"] = 16092156923;
        priceOfTokens["USD"] = 390000000000000;
        priceOfTokens["AUD"] = 263767394156324;
    }

    function getBalance(
        string memory _tokenSymbol,
        address _address
    ) public view returns (uint) {
        return tokens[_tokenSymbol].balanceOf(_address);
    }

    function getName(
        string memory _tokenSymbol
    ) public view returns (string memory) {
        return tokens[_tokenSymbol].name();
    }

    function getAddress(
        string memory _tokenSymbol
    ) public view returns (address) {
        return address(tokens[_tokenSymbol]);
    }

    function swapEthToToken(
        string memory _tokenSymbol
    ) public payable returns (uint) {
        require(msg.value >= 1000000000000000, "Not enough eth");
        bool isSupportedToken = false;
        for (uint i = 0; i < tokenSymbols.length; i++) {
            if (_tokenSymbol.equal(tokenSymbols[i])) {
                isSupportedToken = true;
            }
        }
        require(isSupportedToken, "Not support token");
        uint inputValue = msg.value;
        uint outputValue = (inputValue / priceOfTokens[_tokenSymbol]) *
            10 ** 18;

        tokens[_tokenSymbol].transfer(msg.sender, outputValue);
        return outputValue;
    }

    function swapTokenToEth(
        string memory _tokenSymbol,
        uint _amount
    ) public returns (uint) {
        uint exactToken = _amount / 10 ** 18;
        uint ethToBeTransfered = exactToken * priceOfTokens[_tokenSymbol];
        require(
            address(this).balance >= ethToBeTransfered,
            "Dex is running low on balance"
        );

        payable(msg.sender).transfer(ethToBeTransfered);
        // context this

        // msg.sender; // msg.sender (execute swapTokenToEth)

        // thay thế cái _msgSender (đại diện cho contract cha) = msg.sender (đại diện cho người thực thi hàm)
        //được truyền từ hàm vào

        // quay lên IMPORTANTTTTTTTTTTTTTTTTTT
        // viết lại cái hàm approve theo yêu cầu
        tokens[_tokenSymbol].approve_custom(msg.sender, address(this), _amount);

        tokens[_tokenSymbol].transferFrom(msg.sender, address(this), _amount);

        return tokens[_tokenSymbol].allowance(msg.sender, address(this));
    }

    function swapTokenToToken(
        string memory _srcTokenSymbol,
        string memory _destTokenSymbol,
        uint _amount
    ) public {
        // ti le hoan doi
        // tinh so luong nhan duoc dua tren ti le
    }
}
