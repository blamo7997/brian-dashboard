export default function UploadPage(){
  return (
    <main style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#050505,#6E5A38,#FFF7E6)",
      color:"#fff",
      padding:"32px",
      fontFamily:"Arial"
    }}>
      <h1>Brian & Co Media Review Upload</h1>
      <p>Submit photos, videos, samples, or portfolio proof for private Brian & Co review.</p>

      <form style={{display:"grid",gap:"14px",maxWidth:"720px"}}>
        <label>Role
          <select name="role">
            <option>Supplier</option>
            <option>Artisan</option>
            <option>Jewelry Maker</option>
            <option>Creator</option>
            <option>Influencer</option>
            <option>Contractor</option>
          </select>
        </label>

        <label>Name <input name="name" /></label>
        <label>Email <input name="email" type="email" /></label>
        <label>Region / Country <input name="region" /></label>
        <label>Portfolio or Website <input name="portfolio" /></label>

        <label>Upload Photos or Videos
          <input name="media" type="file" multiple accept="image/*,video/*" />
        </label>

        <label>
          <input type="checkbox" required />
          I consent to Brian & Co privately reviewing my submitted media for quality, authenticity, brand fit, safety, accessibility, and onboarding eligibility.
        </label>

        <button type="submit">Submit for Review</button>
      </form>
    </main>
  );
}
