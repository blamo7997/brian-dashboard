(function(){
  window.BrianCoSupplierWorkflow={
    protected:true,
    tone:"Brian & Co refined, warm, adaptive, eloquent, never gimmicky",
    noDirectCustomerContact:true,
    countryOfOriginRequired:true,
    materialOriginRequiredWhereAvailableOrRequired:true,
    productionUpdatesRequired:["photos","videos","tracking","delay notices"],
    customWork:"non-refundable once production begins where lawful and clearly disclosed",
    approval:"green-check required before public changes",
    legalReview:"required for policy/return/custom/legal text",
    rewriteToTone:function(text){return {original:String(text||""),status:"queued-for-tone-rewrite-and-approval"};},
    originDisclosure:function(input){return {
      productOrigin:input&&input.productOrigin||"pending supplier verification",
      materialOrigin:input&&input.materialOrigin||"pending supplier/material verification",
      customerFacing:false,
      approvalRequired:true
    };}
  };
})();
