const { UserProfile, Investment } = require('../models/mongodb');

// Obter perfil do usuário
const getUserProfileData = async (req, res) => {
  try {
    let userProfile = await UserProfile.findOne();
    
    if (!userProfile) {
      userProfile = new UserProfile({
        riskTolerance: 'moderate',
        investmentGoal: 'growth',
        timeHorizon: 'medium',
        monthlyIncome: 0,
        totalInvested: 0
      });
      await userProfile.save();
    }
    
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil do usuário' });
  }
};

// Atualizar perfil do usuário
const updateUserProfile = async (req, res) => {
  try {
    const { riskTolerance, investmentGoal, timeHorizon, monthlyIncome } = req.body;
    const investments = await Investment.find();
    
    const totalInvested = investments.reduce((sum, i) => sum + i.investedAmount, 0);
    
    let userProfile = await UserProfile.findOne();
    
    if (!userProfile) {
      userProfile = new UserProfile();
    }
    
    userProfile.riskTolerance = riskTolerance || userProfile.riskTolerance;
    userProfile.investmentGoal = investmentGoal || userProfile.investmentGoal;
    userProfile.timeHorizon = timeHorizon || userProfile.timeHorizon;
    userProfile.monthlyIncome = parseFloat(monthlyIncome) || userProfile.monthlyIncome;
    userProfile.totalInvested = totalInvested;
    
    const updatedProfile = await userProfile.save();
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil do usuário' });
  }
};

module.exports = {
  getUserProfileData,
  updateUserProfile
};
