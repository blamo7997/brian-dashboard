export function generateSeo(product){
  return {
    title: `Brian & Co | ${product?.title || "Curated Product"}`,
    description: product?.description || "Carefully curated by Brian & Co.",
    keywords: [
      "luxury ecommerce",
      "AI concierge",
      "accessibility",
      "localized commerce",
      "premium products"
    ]
  };
}
