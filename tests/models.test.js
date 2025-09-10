const mongoose = require('mongoose');
const { Transaction, Category, Investment, InvestmentType, UserProfile } = require('../src/models/mongodb');

describe('Models Tests', () => {
  beforeAll(async () => {
    await global.connectDatabase();
  });

  afterAll(async () => {
    await global.disconnectDatabase();
  });

  beforeEach(async () => {
    await global.clearDatabase();
  });

  describe('Transaction Model', () => {
    it('should create a transaction with valid data', async () => {
      const transactionData = {
        description: 'Test transaction',
        amount: 100.50,
        type: 'expense',
        categoryId: '507f1f77bcf86cd799439011'
      };

      const transaction = new Transaction(transactionData);
      const savedTransaction = await transaction.save();

      expect(savedTransaction._id).toBeDefined();
      expect(savedTransaction.description).toBe(transactionData.description);
      expect(savedTransaction.amount).toBe(transactionData.amount);
      expect(savedTransaction.type).toBe(transactionData.type);
    });

    it('should require description field', async () => {
      const transactionData = {
        amount: 100.50,
        type: 'expense',
        categoryId: '507f1f77bcf86cd799439011'
      };

      const transaction = new Transaction(transactionData);
      
      await expect(transaction.save()).rejects.toThrow();
    });
  });

  describe('Category Model', () => {
    it('should create a category with valid data', async () => {
      const categoryData = {
        name: 'Test Category',
        color: '#FF0000',
        budget: 1000
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory._id).toBeDefined();
      expect(savedCategory.name).toBe(categoryData.name);
      expect(savedCategory.color).toBe(categoryData.color);
    });

    it('should require name field', async () => {
      const categoryData = {
        color: '#FF0000',
        budget: 1000
      };

      const category = new Category(categoryData);
      
      await expect(category.save()).rejects.toThrow();
    });
  });

  describe('Investment Model', () => {
    it('should create an investment with valid data', async () => {
      const investmentData = {
        name: 'Test Investment',
        typeId: '507f1f77bcf86cd799439011',
        currentPrice: 100.50,
        investedAmount: 1000,
        quantity: 10,
        purchaseDate: new Date(),
        currentValue: 1005,
        profitLoss: 5,
        profitLossPercentage: 0.5
      };

      const investment = new Investment(investmentData);
      const savedInvestment = await investment.save();

      expect(savedInvestment._id).toBeDefined();
      expect(savedInvestment.name).toBe(investmentData.name);
      expect(savedInvestment.currentPrice).toBe(investmentData.currentPrice);
    });

    it('should require name field', async () => {
      const investmentData = {
        typeId: '507f1f77bcf86cd799439011',
        currentPrice: 100.50,
        investedAmount: 1000
      };

      const investment = new Investment(investmentData);
      
      await expect(investment.save()).rejects.toThrow();
    });
  });

  describe('InvestmentType Model', () => {
    it('should create an investment type with valid data', async () => {
      const typeData = {
        name: 'Test Type',
        description: 'Test description',
        risk: 'Medium',
        return: 'Medium',
        isCustom: false
      };

      const investmentType = new InvestmentType(typeData);
      const savedType = await investmentType.save();

      expect(savedType._id).toBeDefined();
      expect(savedType.name).toBe(typeData.name);
      expect(savedType.description).toBe(typeData.description);
    });

    it('should require name field', async () => {
      const typeData = {
        description: 'Test description',
        risk: 'Medium',
        return: 'Medium'
      };

      const investmentType = new InvestmentType(typeData);
      
      await expect(investmentType.save()).rejects.toThrow();
    });
  });

  describe('UserProfile Model', () => {
    it('should create a user profile with valid data', async () => {
      const profileData = {
        riskTolerance: 'moderate',
        investmentGoal: 'growth',
        timeHorizon: 'medium',
        monthlyIncome: 5000,
        totalInvested: 10000
      };

      const profile = new UserProfile(profileData);
      const savedProfile = await profile.save();

      expect(savedProfile._id).toBeDefined();
      expect(savedProfile.riskTolerance).toBe(profileData.riskTolerance);
      expect(savedProfile.investmentGoal).toBe(profileData.investmentGoal);
    });

    it('should use default values when not provided', async () => {
      const profile = new UserProfile({});
      const savedProfile = await profile.save();

      expect(savedProfile.riskTolerance).toBe('moderate');
      expect(savedProfile.investmentGoal).toBe('growth');
      expect(savedProfile.timeHorizon).toBe('medium');
    });
  });
});
