"use client";

import { briancoOSProducts, inspirationCategories } from "../products/briancoOSProducts";

export default function BrianCoOSPage() {
  return (
    <main className="shell" style={{ gridTemplateColumns: "minmax(220px, 280px) 1fr" }}>
      <header className="topbar panel" style={{ gridColumn: "1 / 3" }}>
        <div className="logoWrap">
          <div className="logo">B</div>
          <div>
            <div className="brandName">Brian & Co Intelligence OS™</div>
            <div className="brandSub">Original device-adaptive workspace, productivity, media, and concierge ecosystem</div>
          </div>
        </div>
        <div className="topActions">
          <button className="pill">Free Trial Preview</button>
          <button className="goldBtn">Join Membership</button>
        </div>
      </header>

      <aside className="sidebar panel">
        <div className="sectionTitle">OS Vision</div>
        {[
          "Workspace",
          "Studio",
          "Cloud Vault",
          "Accessibility OS",
          "Localization OS",
          "Enterprise Command Center",
          "Future Installable OS Roadmap"
        ].map((x, i) => (
          <div className={i === 0 ? "navItem active" : "navItem"} key={x}>
            <span>{x}</span><span>›</span>
          </div>
        ))}

        <div className="sectionTitle">Protected Rules</div>
        <div className="entry">
          <strong>Safe Build</strong>
          <p>No bootloader, partition, driver, OS overwrite, token, OAuth, payment, Shopify, or backend changes.</p>
        </div>
      </aside>

      <section className="workspace panel">
        <div className="preview" style={{ minHeight: 420 }}>
          <div className="previewGrid">
            <div>
              <h1 style={{ color: "#ffd66d", fontFamily: "Georgia, serif", fontSize: "clamp(34px, 5vw, 68px)" }}>
                Your Work. Your Media. Your Intelligence.
              </h1>
              <p style={{ maxWidth: 820, margin: "0 auto", color: "#eadcff", fontSize: 18, lineHeight: 1.6 }}>
                Brian & Co Intelligence OS™ is envisioned as a luxury, device-adaptive digital environment that brings together productivity, media creation,
                meetings, social publishing, accessibility, localization, business intelligence, and guided AI assistance in one original Brian & Co experience.
              </p>
              <div style={{ marginTop: 24 }}>
                <button className="goldBtn">Explore the Suite</button>
                <button className="pill" style={{ marginLeft: 12 }}>Show Me How It Works</button>
              </div>
            </div>
          </div>
        </div>

        <section className="panel card">
          <div className="sectionTitle">Brian & Co Product Suite</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {briancoOSProducts.map((p) => (
              <div className="entry" key={p.name}>
                <strong style={{ color: "#ffd66d" }}>{p.name}</strong>
                <p><b>{p.type}</b></p>
                <p>{p.description}</p>
                <p style={{ color: "#d8c7e8" }}>{p.status}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel card">
          <div className="sectionTitle">Original Feature Intelligence Categories</div>
          <p style={{ color: "#e7d9f7", lineHeight: 1.5 }}>
            Brian & Co may study lawful public feature categories from major productivity, operating-system, creative, cloud, and enterprise products,
            then create original Brian & Co implementations that combine the most useful ideas without copying protected code, branding, private systems, or trade dress.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {inspirationCategories.map((x) => (
              <span className="pill" key={x}>{x}</span>
            ))}
          </div>
        </section>

        <section className="panel card">
          <div className="sectionTitle">Premium Brian & Co Promotional Copy</div>
          <div className="message">
            Brian & Co Intelligence OS™ is not another scattered app collection. It is a refined digital environment designed to help people create, organize,
            translate, publish, learn, collaborate, and understand their work with less friction and more clarity. Every product is guided, accessible, localized,
            device-adaptive, and shaped around the user’s preferred way of working.
          </div>
          <div className="message">
            From video editing and meeting intelligence to documents, social publishing, knowledge search, accessibility, localization, and business command tools,
            Brian & Co brings premium digital capability into one elegant membership experience.
          </div>
        </section>
      </section>
    </main>
  );
}
