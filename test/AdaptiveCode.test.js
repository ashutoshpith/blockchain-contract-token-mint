var assert = require('assert');
const { ethers } = require('hardhat');
const { before, beforeEach } = require('mocha');
const { expect } = require('chai');

describe('AdapticeCode', function () {
    before(async function () {
        this.AdapticeCode = await ethers .getContractFactory('AdaptiveCode');
      });
      beforeEach(async function () { 
        this.adapticeCode = await this.AdapticeCode.deploy();
        await this.adapticeCode.deployed();
      });
  
      it('Mint Token Return Bool', async function () {
        // Store a value
        await this.adapticeCode.mintToken(42);
        expect((await this.adapticeCode.balance()).toString()).to.equal('10042');
      });

      it('Burn Token Return Bool', async function () {
        // Store a value
        await this.adapticeCode.burnToken(42);
        expect((await this.adapticeCode.balance()).toString()).to.equal('9958');
      });

      it('Balance Left', async function () {
        // Store a value
        expect((await this.adapticeCode.balance()).toString()).to.equal('10000');
      });

  });