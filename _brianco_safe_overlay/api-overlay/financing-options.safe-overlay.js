import { json, now, safeMode } from "./_shared.safe-overlay.js";

export default async function handler(req,res){
  const role = (req.query.role || "customer").toString();
  const amount = Number(req.query.amount || 0);
  const region = (req.query.region || "US").toString();

  const customerAllowed = ["customer","guest","founder-admin"].includes(role);

  json(res,200,{
    ok:true,
    checkedAt:now(),
    safeMode:safeMode(),
    role,
    amount,
    region,
    showFinancing:customerAllowed,
    options:[
      {
        id:"shop_pay_installments",
        label:"Shop Pay Installments",
        nativeFeeling:true,
        providerMustBeEnabledSeparately:true
      },
      {
        id:"paypal_pay_later",
        label:"PayPal Pay Later",
        nativeFeeling:true,
        providerMustBeEnabledSeparately:true
      },
      {
        id:"affirm_klarna_afterpay_optional",
        label:"Additional Pay-Over-Time Options",
        nativeFeeling:true,
        providerMustBeEnabledSeparately:true
      }
    ],
    disclaimer:"Financing availability depends on provider approval, eligibility, location, order value, applicable law, and checkout terms. Brian & Co does not guarantee approval.",
    liveConnectionChange:false,
    requiresFounderGreenCheckBeforeLiveEnablement:true
  });
}
