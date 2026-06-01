import { theme } from "../../lib/brianco-native/ui";
import BrianCoTextConcierge from "../../components/BrianCoTextConcierge";

export default function TextConciergePage() {
  return (
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:46,color:theme.gold,marginBottom:8}}>Brian & Co Text Concierge</h1>
        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1040}}>
          Every visitor can interact with Brian & Co through text. The experience remains website-native,
          role-aware, accessibility-aware, language-aware, typo-tolerant, and protected.
        </p>

        <BrianCoTextConcierge />

        <section style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",
          gap:16,
          marginTop:24
        }}>
          {[
            ["Website Text", "Visitors can type what they need and be routed inside Brian & Co."],
            ["Chatbot Text", "The chatbot path is prepared to normalize typos and route requests."],
            ["SMS/MMS Future", "Text-message integration can be added with an approved provider such as Twilio or another compliant service."],
            ["Protected Routing", "Products, payments, OAuth, and secrets remain untouched."]
          ].map(([title,note])=>(
            <article key={title} style={theme.card}>
              <h2 style={{color:theme.gold}}>{title}</h2>
              <p style={{lineHeight:1.55}}>{note}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
