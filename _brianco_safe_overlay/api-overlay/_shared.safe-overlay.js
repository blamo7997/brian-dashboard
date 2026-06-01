import fs from "fs";
import path from "path";

export function now(){
  return new Date().toISOString();
}

export function json(res,status,body){
  res.statusCode = status;
  res.setHeader("Content-Type","application/json; charset=utf-8");
  res.setHeader("Cache-Control","no-store");
  res.setHeader("X-Content-Type-Options","nosniff");
  res.end(JSON.stringify(body,null,2));
}

export function safeMode(){
  return {
    mode:"overlay_only",
    destructiveActions:false,
    touchesConnections:false,
    modifiesEnvVars:false,
    modifiesTokens:false,
    modifiesOAuth:false,
    modifiesShopifyProducts:false,
    modifiesShopifyCollections:false,
    requiresFounderGreenCheckBeforeLiveChanges:true
  };
}

export function riskScan(input={}){
  const text = JSON.stringify(input).toLowerCase();
  const flags = [];
  const risky = [
    "gift card",
    "password",
    "verification code",
    "seed phrase",
    "wire transfer",
    "crypto only",
    "outside platform",
    "bank login",
    "ssn",
    "social security",
    "guaranteed approval",
    "guaranteed profit",
    "fake review"
  ];

  for(const item of risky){
    if(text.includes(item)) flags.push(item);
  }

  return {
    score: Math.min(100, flags.length * 20),
    flags,
    blocked: flags.length >= 3,
    requiresReview: flags.length > 0
  };
}
