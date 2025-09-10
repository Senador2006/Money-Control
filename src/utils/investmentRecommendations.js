// Função para gerar recomendações baseadas no perfil
function generateInvestmentRecommendations(profile, investmentTypes) {
  const recommendations = [];
  
  // Mapear tipos de investimento por nome para IDs reais
  const typeMap = {};
  investmentTypes.forEach(type => {
    const name = type.name.toLowerCase();
    if (name.includes('renda fixa')) typeMap['renda-fixa'] = type;
    else if (name.includes('ação')) typeMap['acoes'] = type;
    else if (name.includes('fundo')) typeMap['fundos'] = type;
    else if (name.includes('imobiliário') || name.includes('fii')) typeMap['fiis'] = type;
    else if (name.includes('cripto')) typeMap['cripto'] = type;
    else if (name.includes('commodit')) typeMap['commodities'] = type;
  });
  
  // Calcular percentual recomendado para cada tipo baseado no perfil
  let allocation = {};
  
  if (profile.riskTolerance === 'conservative') {
    allocation = {
      'renda-fixa': 60,
      'acoes': 10,
      'fundos': 20,
      'fiis': 10,
      'cripto': 0,
      'commodities': 0
    };
  } else if (profile.riskTolerance === 'moderate') {
    allocation = {
      'renda-fixa': 40,
      'acoes': 25,
      'fundos': 20,
      'fiis': 10,
      'cripto': 3,
      'commodities': 2
    };
  } else { // aggressive
    allocation = {
      'renda-fixa': 20,
      'acoes': 40,
      'fundos': 20,
      'fiis': 10,
      'cripto': 7,
      'commodities': 3
    };
  }
  
  // Ajustar baseado no objetivo
  if (profile.investmentGoal === 'preservation') {
    Object.keys(allocation).forEach(key => {
      if (key === 'renda-fixa') allocation[key] += 20;
      else allocation[key] = Math.max(0, allocation[key] - 5);
    });
  } else if (profile.investmentGoal === 'growth') {
    Object.keys(allocation).forEach(key => {
      if (['acoes', 'fundos', 'fiis'].includes(key)) allocation[key] += 5;
      else if (key === 'renda-fixa') allocation[key] = Math.max(10, allocation[key] - 10);
    });
  }
  
  // Ajustar baseado no horizonte temporal
  if (profile.timeHorizon === 'short') {
    Object.keys(allocation).forEach(key => {
      if (key === 'renda-fixa') allocation[key] += 15;
      else allocation[key] = Math.max(0, allocation[key] - 3);
    });
  } else if (profile.timeHorizon === 'long') {
    Object.keys(allocation).forEach(key => {
      if (['acoes', 'fundos', 'fiis'].includes(key)) allocation[key] += 3;
      else if (key === 'renda-fixa') allocation[key] = Math.max(5, allocation[key] - 5);
    });
  }
  
  // Gerar recomendações
  Object.keys(allocation).forEach(typeKey => {
    const type = typeMap[typeKey];
    const percentage = allocation[typeKey];
    
    if (type && percentage > 0) {
      recommendations.push({
        typeId: type._id,
        typeName: type.name,
        recommendedPercentage: percentage,
        description: type.description,
        risk: type.risk,
        expectedReturn: type.return,
        reasoning: getRecommendationReasoning(typeKey, percentage, profile)
      });
    }
  });
  
  return recommendations.sort((a, b) => b.recommendedPercentage - a.recommendedPercentage);
}

function getRecommendationReasoning(typeKey, percentage, profile) {
  const reasonings = {
    'renda-fixa': 'Renda fixa oferece segurança e previsibilidade, ideal para preservar capital.',
    'acoes': 'Ações têm potencial de alta rentabilidade a longo prazo, mas com maior volatilidade.',
    'fundos': 'Fundos de investimento oferecem diversificação e gestão profissional.',
    'fiis': 'FIIs proporcionam renda passiva através de dividendos e valorização imobiliária.',
    'cripto': 'Criptomoedas são altamente voláteis, mas podem oferecer retornos excepcionais.',
    'commodities': 'Commodities são uma boa proteção contra inflação e diversificação de portfólio.'
  };
  
  return reasonings[typeKey] || 'Investimento diversificado para equilibrar risco e retorno.';
}

module.exports = {
  generateInvestmentRecommendations
};
