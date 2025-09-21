import { useState, useEffect } from "react";
import axios from "axios";
import "./style/LinkDash.css";

export default function LinkDashboard() {
  const [target, setTarget] = useState("");
  const [slug, setSlug] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

 
  const createLink = async (data) => {
    return await axios.post(`${BASE_URL}/api/links`, data);
  };

  const getLinks = async () => {
    const res = await axios.get(`${BASE_URL}/api/links`);
    return res.data;
  };

 
  const fetchLinks = async () => {
    try {
      const data = await getLinks();
      setLinks(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching links");
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await createLink({ target, slug: slug || undefined });
      setSuccess(`Short link created: ${res.data.slug}`);
      setTarget("");
      setSlug("");
      fetchLinks();
    } catch (err) {
      setError(err.response?.data?.error || "Error creating link");
    } finally {
      setLoading(false);
    }
  };


  const copyLink = (slug) => {
    const shortUrl = `${BASE_URL}/${slug}`;
    navigator.clipboard.writeText(shortUrl);
    alert(`Copied: ${shortUrl}`);
  };

 
  const handleLinkClick = async (slug, target) => {
    try {
      await axios.post(`${BASE_URL}/api/links/${slug}/click`);
      fetchLinks();
      window.open(target, "_blank");
    } catch (err) {
      console.error(err);
      setError("Failed to open link");
    }
  };

  return (
    <div className="container">
      <h1>Mini URL Shortener</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="url"
          placeholder="Enter URL"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Custom slug (optional)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Short Link"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <h2>Links</h2>
      {links.length === 0 ? (
        <p>No links yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Slug</th>
              <th>Target</th>
              <th>Clicks</th>
              <th>Created At</th>
              <th>Copy</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link._id}>
                <td>{link.slug}</td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.slug, link.target);
                    }}
                  >
                    {link.target}
                  </a>
                </td>
                <td>{link.clicks}</td>
                <td>{new Date(link.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => copyLink(link.slug)}>Copy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
