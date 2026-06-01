/*
============================================================
BRIAN & CO — PRODUCT PROTECTION MASTER
Permanent rule:
Existing Shopify products are protected.
Do not overwrite, delete, archive, rename, reprice, republish,
or mutate existing products unless Brian gives explicit approval.
============================================================
*/

window.BRIANCO_PRODUCT_PROTECTION = {
  existingProductsAreProtected: true,
  destructiveProductActionsAllowed: false,
  allowedDefaultMode: "read-only-existing-products-additive-new-features-only",
  protectedActions: [
    "delete_product",
    "update_product",
    "overwrite_product",
    "archive_product",
    "rename_product",
    "reprice_product",
    "replace_images",
    "remove_variants",
    "change_inventory",
    "remove_from_collection",
    "publish_unapproved_product"
  ],
  safeActions: [
    "read_existing_products",
    "snapshot_existing_products",
    "display_existing_products",
    "recommend_additive_frontend_features",
    "prepare_draft_descriptions",
    "prepare_draft_social_posts",
    "prepare_draft_theme_sections",
    "prepare_founder_approval_queue"
  ],
  approvalLabels: [
    "Approve",
    "Revise",
    "Reject",
    "Hold",
    "Ask Lawyer",
    "Ask Accountant",
    "Estimate Cost First",
    "Test Small"
  ]
};

console.log("Brian & Co product protection loaded: existing products are read-only unless explicitly approved.");
