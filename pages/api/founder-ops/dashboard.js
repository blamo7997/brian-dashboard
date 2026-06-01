export default function handler(req,res){

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"founder-operations-center",

    cards:[
      {
        title:"Sales Intelligence",
        value:"Prepared",
        icon:"💼",
        trend:[12,18,29,41,58,71,89]
      },
      {
        title:"Membership Intelligence",
        value:"Prepared",
        icon:"👑",
        trend:[15,26,38,51,66,79,93]
      },
      {
        title:"Digital Product Intelligence",
        value:"Prepared",
        icon:"⚡",
        trend:[11,22,34,49,63,78,91]
      },
      {
        title:"Role Intelligence",
        value:"Prepared",
        icon:"🎯",
        trend:[9,19,31,46,59,72,88]
      },
      {
        title:"Accessibility Intelligence",
        value:"Prepared",
        icon:"♿",
        trend:[14,24,39,53,67,82,95]
      },
      {
        title:"Localization Intelligence",
        value:"Prepared",
        icon:"🌎",
        trend:[10,21,35,48,61,74,90]
      },
      {
        title:"Deployment Intelligence",
        value:"Active",
        icon:"🚀",
        trend:[16,28,40,57,70,84,97]
      },
      {
        title:"Chatbot Intelligence",
        value:"Active",
        icon:"🤖",
        trend:[13,25,37,52,68,81,96]
      },
      {
        title:"Approval Intelligence",
        value:"Prepared",
        icon:"✅",
        trend:[8,16,27,39,54,69,87]
      },
      {
        title:"Event Intelligence",
        value:"Prepared",
        icon:"🎪",
        trend:[7,15,25,36,50,66,83]
      }
    ],

    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true
    }
  });

}
