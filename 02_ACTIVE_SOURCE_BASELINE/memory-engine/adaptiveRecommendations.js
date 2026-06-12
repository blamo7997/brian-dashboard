export function generateAdaptiveRecommendations(context){

  const role = context?.role || "customer";
  const tier = context?.tier || "standard";

  const output = {
    products: [],
    services: [],
    subscriptions: [],
    theme: {}
  };

  if(role === "investor"){
    output.services.push("Investor Dashboard");
  }

  if(role === "creator"){
    output.services.push("Creator Media Kit");
  }

  if(role === "supplier"){
    output.services.push("Supplier Logistics Portal");
  }

  if(tier === "luxury"){
    output.theme.gradient = "luxury-gold";
    output.products.push("White Glove Concierge");
  }

  if(tier === "elite"){
    output.theme.gradient = "elite-obsidian";
    output.products.push("Private Concierge Access");
  }

  output.subscriptions.push("Brian & Co Membership");

  return output;
}
